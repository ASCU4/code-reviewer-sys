import os
from dotenv import load_dotenv

load_dotenv()
class OAuthConfig:
    GOOGLE_CLIENT_ID=os.getenv("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET= os.getenv("GOOGLE_CLIENT_SECRET")
    GITHUB_CLIENT_ID=os.getenv("GITHUB_CLIENT_ID")
    GITHUB_CLIENT_SECRET=os.getenv("GITHUB_CLIENT_SECRET")
