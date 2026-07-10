import requests
from oauth_config import OAuthConfig

class GithubOAuthService:
    @staticmethod
    def exchange_code(code):
        response=requests.post(
            "https//github.com/login/oauth/access_token",
            headers={
                "Accept": "application/json"
            },
            data={
                "client_id": OAuthConfig.GITHUB_CLIENT_ID,
                "client_secret": OAuthConfig.GITHUB_CLIENT_SECRET,
                "code": code
            }
        )

        return response.json()
    
    def get_user(access_token):
        response=requests.get(
            "https//api.github.com/user",
            headers={
                "Authorization": f"Bearer{access_token}"
            }
        )

        return response.json()
    
    def get_email(access_token):
        response= requests.get(
            "https://api.github.com/user/emails",
            headers={
                "Authorization": f"Bearer {access_token}"
            }
        )

        emails=response.json()

        for email in emails:
            if email["primary"]:
                return email["email"]
            
        return None