from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from oauth_config import OAuthConfig
import requests

class OAuthService:
    @staticmethod
    def verify_google_token(access_token):
        response=requests.get("https://www.googleapis.com/oauth2/v3/userinfo", headers={"Authorization": f"Bearer {access_token}"})
        if response.status_code!=200:
            return None
        user=response.json()
        return{
            "provider_id": user["sub"],
            "email": user["email"],
            "username": user.get("name", user["email"].split("@"[0]))
        }
        
        # try:
        #     user_info= id_token.verify_oauth2_token(
        #         token, google_requests.Request(), OAuthConfig.GOOGLE_CLIENT_ID
        #     ) #verifies the token with Google and return the authenticated user's details
        #     return {
        #         "provider_id":user_info["sub"],
        #         "email": user_info["email"],
        #         "username": user_info.get("name",""),
        #         "picture": user_info.get("picture")
        #     }
        # except Exception:
        #     return None