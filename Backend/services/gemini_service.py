from google import genai
from google.genai import types
from flask import current_app
from pydantic import BaseModel

# 1. Define your exact schema using Pydantic
class CodeReviewSchema(BaseModel):
    summary: str
    score: int
    strengths: list[str]
    suggestions: list[str]
    security: list[str]

class GeminiService:
    @staticmethod
    def review_code(code: str) -> dict:
        # Initialize the client
        client = genai.Client(
            api_key=current_app.config["GEMINI_API_KEY"]
        )

        # 2. Simplify your prompt (no need to explain the JSON structure here)
        prompt = f"""You are an expert Python code reviewer.
        Analyze the following Python code based on quality, readability, performance, security, and maintainability.

        Code:
        {code}
        """

        # 3. Pass the schema and MIME type to the configuration
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=CodeReviewSchema,
                temperature=0.2  # Lower temperature for more analytical/consistent code reviews
            )
        )
        
        # 4. Access the automatically parsed object and convert back to a dictionary
        return response.parsed.model_dump()