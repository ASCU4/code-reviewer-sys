import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY=os.getenv("SECRET_KEY")
    DATABASE_URL=os.getenv(
        "DATABASE_URL", "postgresql+psycopg2://postgres:Viuv@localhost:5432/code_review_db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS= False
    GEMINI_API_KEY=os.getenv("GEMINI_API_KEY")
