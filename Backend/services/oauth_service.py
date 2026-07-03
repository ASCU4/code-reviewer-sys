from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from oauth_config import OAuthConfig

class OAuthService:
    @staticmethod
    def verify_google_token(token):
        try:
            user_info= id_token.verify_oauth2_token(
                token, google_requests.Request(), OAuthConfig.GOOGLE_CLIENT_ID
            ) #verifies the token with Google and return the authenticated user's details
            return {
                "provider_id":user_info["sub"],
                "email": user_info["email"],
                "username": user_info.get("name",""),
                "picture": user_info.get("picture")
            }
        except Exception:
            return None