import os
import shutil
import tempfile
from git import Repo
from sqlalchemy import func
from database.database import SessionLocal
from models.review import Review
from services.analysis_service import AnalysisService
import json

class ReviewService:
    SKIPPED_DIRECTORIES = {
        ".git",
        ".venv",
        "__pycache__",
        "build",
        "dist",
        "node_modules",
        "venv",
    }

    SUPPORTED_EXTENSIONS = {
        ".py": "python",
        ".js": "javascript",
        ".jsx": "javascript",
        ".ts": "typescript",
        ".tsx": "typescript",
        ".java": "java",
        ".cpp": "cpp",
        ".c": "c",
        ".cs": "csharp",
        ".go": "go",
        ".rb": "ruby",
        ".php": "php",
    }

    MAX_FILE_SIZE_BYTES = 500 * 1024

    @staticmethod
    def _parse_review_result(review_result):
        if not review_result:
            return None
        try:
            return json.loads(review_result)
        except json.JSONDecodeError:
            return None

    @staticmethod
    def _next_user_review_number(session, user_id):
        """
        Returns the next sequential review number for this user
        (1 for their first review, 2 for their second, etc).

        NOTE: under concurrent uploads from the same user this has a
        small race window (two requests could read the same max at once).
        If that matters for your use case, wrap this + the insert in a
        transaction with SELECT ... FOR UPDATE, or enforce a unique
        constraint on (user_id, user_review_number) and retry on conflict.
        """
        max_number = (
            session.query(func.max(Review.user_review_number))
            .filter(Review.user_id == user_id)
            .scalar()
        )
        return (max_number or 0) + 1

    @staticmethod
    def _serialize_review(review):
        analysis = ReviewService._parse_review_result(review.review_result)
        is_repository = review.language.lower() == "repository"

        result = {
            "id": review.user_review_number,
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
            result["files_scanned"] = analysis.get("files_scanned") if isinstance(analysis, dict) else 0
            result["issues_count"] = (
                analysis.get("total_issues", len(analysis.get("issues", [])))
                if isinstance(analysis, dict) else 0
            )
            result["summary"] = analysis.get("summary") if isinstance(analysis, dict) else None
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

            user_review_number = ReviewService._next_user_review_number(session, user_id)

            review=Review(
                user_id=user_id,
                filename=filename,
                language=language,
                code=code,
                status= "PENDING",
                user_review_number=user_review_number,
            )

            session.add(review)
            session.commit()

            return{
                "message":"Review Upload Successfully",
                "review_id":review.user_review_number
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
    def analyze_files(files, repository=None, scan_summary=None):
        total_score = 0
        total_files = len(files)
        all_issues = []
        files_results = []
        severity_counts = {
            "high": 0,
            "medium": 0,
            "low": 0,
        }

        for file in files:
            analysis = AnalysisService.analyze_code(file["code"])
            total_score += analysis["score"]

            file_issues = []
            for issue in analysis["issues"]:
                issue_with_file = {
                    **issue,
                    "file": file["filename"],
                    "language": file["language"],
                }
                file_issues.append(issue_with_file)
                all_issues.append(issue_with_file)

                severity = issue.get("severity")
                if severity in severity_counts:
                    severity_counts[severity] += 1

            files_results.append(
                {
                "filename": file["filename"],
                "language": file["language"],
                "lines": file["lines"],
                "size_bytes": file["size_bytes"],
                "score": analysis["score"],
                "issues_count": len(file_issues),
                "issues": file_issues,
                }
            )

        average_score = (
            round(total_score / total_files, 1)
            if total_files > 0 else 0
        )
        files_results.sort(key=lambda item: (item["score"], -item["issues_count"], item["filename"]))
        all_issues.sort(
            key=lambda issue: (
                {"high": 0, "medium": 1, "low": 2}.get(issue.get("severity"), 3),
                issue.get("file") or "",
                issue.get("line") or 0,
            )
        )

        highest_risk_files = [
            {
                "filename": file["filename"],
                "language": file["language"],
                "score": file["score"],
                "issues_count": file["issues_count"],
                "lines": file["lines"],
            }
            for file in files_results[:5]
        ]

        summary = {
            "total_issues": len(all_issues),
            "severity_counts": severity_counts,
            "clean_files": sum(1 for file in files_results if file["issues_count"] == 0),
            "flagged_files": sum(1 for file in files_results if file["issues_count"] > 0),
            "highest_risk_files": highest_risk_files,
            "top_issues": all_issues[:20],
        }

        return {
            "repository": repository,
            "score": average_score,
            "files_scanned": total_files,
            "total_issues": len(all_issues),
            "summary": summary,
            "scan": scan_summary or {},
            "files": files_results,
            "issues": all_issues,
        }

    
    @staticmethod
    def analyze_file(review_id, user_id):
        session= SessionLocal()
        try:
            review=session.query(Review).filter(
                Review.user_review_number == review_id,
                Review.user_id == user_id,
            ).first() #to avoid anyone analyzing someone else's files or check their records
            if review is None:
                return {
                    "error": "Review not found"
                }

            analysis = AnalysisService.analyze_code(review.code)
            review.score = analysis["score"]
            review.review_result = json.dumps(analysis)
            review.status = "COMPLETED"
            session.commit()
            return{
                "score": review.score,
                "issues": analysis["issues"]
            }
        finally:
            session.close()

    @staticmethod
    def upload_repository(repo_url, user_id):
        temp_dir = None
        session = SessionLocal()
        try:
            if not repo_url:
                return {
                    "error": "Repository URL is required."
                }

            temp_dir = tempfile.mkdtemp()
            Repo.clone_from(repo_url, temp_dir)

            repository_name = os.path.basename(repo_url.rstrip("/"))
            if repository_name.endswith(".git"):
                repository_name = repository_name[:-4]

            scan_summary = {
                "supported_extensions": sorted(ReviewService.SUPPORTED_EXTENSIONS.keys()),
                "skipped_directories": sorted(ReviewService.SKIPPED_DIRECTORIES),
                "skipped_files": {
                    "unsupported_extension": 0,
                    "too_large": 0,
                    "read_error": 0,
                },
            }
            files = []
            for root, dirnames, filenames in os.walk(temp_dir):
                dirnames[:] = [
                    dirname
                    for dirname in dirnames
                    if dirname not in ReviewService.SKIPPED_DIRECTORIES
                ]

                for filename in filenames:
                    extension = os.path.splitext(filename)[1].lower()
                    if extension not in ReviewService.SUPPORTED_EXTENSIONS:
                        scan_summary["skipped_files"]["unsupported_extension"] += 1
                        continue

                    filepath = os.path.join(root, filename)
                    try:
                        size_bytes = os.path.getsize(filepath)
                        if size_bytes > ReviewService.MAX_FILE_SIZE_BYTES:
                            scan_summary["skipped_files"]["too_large"] += 1
                            continue

                        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                            code = f.read()
                        files.append({
                            "filename": os.path.relpath(filepath, temp_dir),
                            "language": ReviewService.SUPPORTED_EXTENSIONS[extension],
                            "code": code,
                            "lines": len(code.splitlines()),
                            "size_bytes": size_bytes,
                        })
                    except Exception:
                        scan_summary["skipped_files"]["read_error"] += 1
                        continue

            if len(files) == 0:
                return {
                    "error": "No supported source files found."
                }

            repository = {
                "name": repository_name,
                "url": repo_url,
                "source_files_found": len(files),
            }
            analysis = ReviewService.analyze_files(
                files,
                repository=repository,
                scan_summary=scan_summary,
            )

            user_review_number = ReviewService._next_user_review_number(session, user_id)

            review = Review(
                user_id=user_id,
                filename=repository_name,
                language="Repository",
                code=repo_url,
                status="COMPLETED",
                score=analysis["score"],
                review_result=json.dumps(analysis),
                user_review_number=user_review_number,
            )
            session.add(review)
            session.commit()
            return {
                "message": "Repository analyzed successfully",
                "review_id": review.user_review_number,
                "repository": repository,
                "files_scanned": analysis["files_scanned"],
                "total_issues": analysis["total_issues"],
                "summary": analysis["summary"],
                "score": analysis["score"],
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