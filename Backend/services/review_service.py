from database.database import SessionLocal
from models.review import Review
from services.analysis_service import AnalysisService

class ReviewService:
    
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
            reviews= session.query(Review).filter(Review.user_id==user_id).all()
            result=[]
            for review in reviews:
                result.append({
                    "id": review.id,
                    "filename":  review.filename,
                    "language": review.language,
                    "status": review.status,
                })
            return result
        
        except Exception as e:
            return{
                "error":str(e)
            }
        
        finally:
            session.close()

    @staticmethod
    def analyze_file(review_id):
        session= SessionLocal()
        review=session.query(Review).filter(Review.id==review_id).first()
        analysis=AnalysisService.analyze_code(review.code)
        review.status="COMPLETED"
        review.score=analysis["score"]
        review.review_result="\n".join(analysis["issues"])
        session.commit()
        return{
            "score": review.score,
            "issues": analysis["issues"]
        }