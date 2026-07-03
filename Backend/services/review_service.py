import os
import shutil
import tempfile
from git import Repo
from database.database import SessionLocal
from models.review import Review
from services.analysis_service import AnalysisService
from flask import g
import json

class ReviewService:
    @staticmethod
    def _parse_review_result(review_result):
        if not review_result:
            return None
        try:
            return json.loads(review_result)
        except json.JSONDecodeError:
            return None

    @staticmethod
    def _serialize_review(review):
        analysis = ReviewService._parse_review_result(review.review_result)
        is_repository = review.language.lower() == "repository"

        result = {
            "id": review.id,
            "filename": review.filename,
            "language": review.language,
            "status": review.status,
            "score": review.score,
            "created_at": review.created_at.isoformat() if review.created_at else None,
            "review_type": "repository" if is_repository else "file",
        }

        if is_repository:
            result["repository"] = {
                "name": review.filename,
                "url": review.code or None,
            }
            result["files_scanned"] = analysis.get("files_scanned") if isinstance(analysis, dict) else None
            result["issues_count"] = len(analysis.get("issues", [])) if isinstance(analysis, dict) else 0
            result["analysis"] = analysis

        return result

    
    @staticmethod
    def upload_review(data, user_id):
        session= SessionLocal()

        try:
            filename=data.get("filename")
            language= data.get("language")
            code= data.get("code")

            if not filename or not language or not code:
                return{
                    "error":"Missing required fields"
                }
            
            review=Review(
                user_id=user_id,
                filename=filename,
                language=language,
                code=code,
                status= "PENDING"
            )

            session.add(review)
            session.commit()

            return{
                "message":"Review Upload Successfully",
                "review_id":review.id
            }

        except Exception as e:
            session.rollback()
            return {
                "error": str(e)
            }

        finally:
            session.close()

    @staticmethod
    def get_review(user_id):
        session= SessionLocal()
        try:
            reviews = (
                session.query(Review)
                .filter(Review.user_id == user_id)
                .order_by(Review.created_at.desc())
                .all()
            )
            return [ReviewService._serialize_review(review) for review in reviews]
        
        except Exception as e:
            return{
                "error":str(e)
            }
        
        finally:
            session.close()

    @staticmethod
    def analyze_files(files):
        total_score=0
        total_files=len(files)
        all_issues=[]
        files_results=[]
        for file in files:
            analysis=AnalysisService.analyze_code(file["code"])
            total_score+=analysis["score"]
            files_results.append(
                {"filename": file["filename"],
                "language": file["language"],
                "score": analysis["score"],
                "issues": analysis["issues"]}
            )

            for issue in analysis["issues"]:
                issue["file"]= file["filename"]
                all_issues.append(issue)
        average_score=(round(total_score/total_files, 1)
                    if total_files > 0 else 0)
        return{
            "score": average_score,
            "files_scanned": total_files,
            "files": files_results,
            "issues": all_issues
        }

    
    @staticmethod
    def analyze_file(review_id):
        session= SessionLocal()
        review=session.query(Review).filter(Review.id==review_id, Review.user_id == g.user["user_id"]).first() #to avoid anyone analyzing someone else's files or check their records
        analysis = AnalysisService.analyze_code(review.code)
        review.score = analysis["score"]
        review.review_result = json.dumps(analysis)
        review.status = "COMPLETED"
        session.commit()
        return{
            "score": review.score,
            "issues": analysis["issues"]
        }

    @staticmethod
    def upload_repository(repo_url, user_id):
        temp_dir = None
        session = SessionLocal()
        try:
            if not repo_url:
                return {
                    "error": "Repository URL is required."
                }

            # Create temporary folder
            temp_dir = tempfile.mkdtemp()
            # Clone repository
            Repo.clone_from(repo_url, temp_dir)
            supported_extensions = {
                ".py",
                # ".java",
                # ".js",
                # ".ts",
                # ".cpp",
                # ".c",
                # ".cs",
                # ".go"
            }
            files = []
            for root, _, filenames in os.walk(temp_dir):
                # Ignore git folder
                if ".git" in root:
                    continue
                for filename in filenames:
                    extension = os.path.splitext(filename)[1]
                    if extension not in supported_extensions:
                        continue
                    filepath = os.path.join(root, filename)
                    try:
                        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                            code = f.read()
                        files.append({
                            "filename": os.path.relpath(filepath, temp_dir),
                            "language": extension[1:],
                            "code": code
                        })
                    except Exception:
                        continue
            if len(files) == 0:
                return {
                    "error": "No supported source files found."
                }
            analysis = ReviewService.analyze_files(files)
            repository_name = os.path.basename(repo_url.rstrip("/"))
            if repository_name.endswith(".git"):
                repository_name = repository_name[:-4]

            review = Review(
                user_id=user_id,
                filename=repository_name,
                language="Repository",
                code=repo_url,
                status="COMPLETED",
                score=analysis["score"],
                review_result=json.dumps(analysis)
            )
            session.add(review)
            session.commit()
            return {
                "message": "Repository analyzed successfully",
                "review_id": review.id,
                "files_scanned": len(files),
                "score": analysis["score"]
            }
        except Exception as e:
            session.rollback()
            return {
                "error": str(e)
            }
        finally:
            if temp_dir:
                shutil.rmtree(temp_dir, ignore_errors=True)
            session.close()
