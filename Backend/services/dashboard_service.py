from models.review import Review
from database.database import SessionLocal
import json

class DashboardSerivce:
    @staticmethod
    def get_dashboard(user_id):
        session=SessionLocal()
        reviews = session.query(Review).filter_by(user_id=user_id).all()
        total_reports=len(reviews)
        if total_reports==0:
            return{
                "total_reports":0,
                "average_score":0,
                "issues_found":0,
                "critical_issues":0
            }
        scores=[]
        total_issues=0
        critical=0
        for review in reviews:
            if review.score is not None:
                scores.append(review.score)
            if review.review_result:
                try:
                    issues=json.loads(review.review_result)
                    total_issues+=len(issues)
                    for issue in issues:
                        if issue["severity"] == "high":
                            critical+=1
                except:
                    pass
        average= round(sum(scores)/len(scores),1) if scores else 0
        return{
            "total_reports": total_reports,
            "average_score": average,
            "issues_found": total_issues,
            "critical_issues": critical
        }