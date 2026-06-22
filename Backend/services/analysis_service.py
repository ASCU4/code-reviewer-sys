class AnalysisService:
    
    @staticmethod
    def analyze_code(code):
        issues=[]
        score=100
        if "print(" in code:
            issues.append(
                "Debug print statement found"
            )
            score-=10

        if len(code.splitlines()) > 100:
            issues.append("Large files detected")
            score-=5

        return{
            "score":score,
            "issues":issues
        }