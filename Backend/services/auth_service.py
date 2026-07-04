from database.database import SessionLocal #gives database session
from models import User #gives User model
from werkzeug.security import generate_password_hash, check_password_hash #gives password hashing
from flask import current_app
from services.oauth_service import OAuthService
from utils.jwt_handler import create_token

import jwt


class AuthService:
    @staticmethod
    def register(data):
        session= SessionLocal()
        try:
            username= data.get("username")
            email= data.get("email")
            password= data.get("password")
            if not username or not email or not password:  #validation, checking whether user submitted empty data
                return{
                    "error": "Missing required data"
                }

            existing_user= session.query(User).filter(
                User.email == email).first() #fetching the details of existing user
            if existing_user: #duplicate check for the user
                return{
                    "error": "Email already registered"
                }
            
            hashed_password=generate_password_hash(password) #hashing password
            user= User(username=username, email=email, password_hash=hashed_password)
            session.add(user) #adding new user to the database
            session.commit() #commiting to the database
            return{
                "message" : "User Registered Successfully"
            }
        
        except Exception as e:
                session.rollback()
                return {
                    "error": str(e)
                }
        
        finally:
                session.close()
    

    @staticmethod
    def login(data):
        session=SessionLocal()
        try:
            email= data.get("email")
            password= data.get("password") #password and email extraction
            
            if not email or not password:
                return{
                    "message":"Credentials Required"
                }

            user= session.query(User).filter(User.email== email).first()
            
            if user is None:
                return{
                    "error":"Invalid Credentials!"
                }
            #now we verify password
            if user.password_hash is None: #to prevent password logins for Google Accounts
                return {
                "error": "This account uses Google Sign-In."
                }
            
            if check_password_hash(user.password_hash, password) == False:
                return{
                    "error":"Invalid Credentials!"
                }
            if user.password_hash is None:
                return {
                    "error": "This account uses Google Sign-In."
                }

            #now payload creation
            payload= {
                "user_id": user.user_id, 
                "email": user.email
            }
            token= jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
            return{
                "token": token
            }
        finally:
            session.close()


#new changes for google login
    @staticmethod
    def google_login(token):
        session=SessionLocal()
        try:
            google_user=OAuthService.verify_google_token(token)
            if not google_user:
                return{
                    "error":"Invalid Google Token"
                }
            user=session.query(User).filter(User.email==google_user["email"]).first()
            if user is None:
                user = User(
                username=google_user["username"],
                email=google_user["email"],
                password_hash=None,
                provider="google",
                provider_id=google_user["provider_id"]
                )
                session.add(user)
            #if an existing user wants to connect with their Google Account
            else:
                if user.provider_id is None:
                    user.provider = "google"
                    user.provider_id = google_user["provider_id"]
            session.commit()
            jwt= create_token({
                "user_id": user.user_id,
                "email": user.email
            })
            return {
            "message": "Google Login Successful",
            "token": jwt,
            "user": {
                "user_id": user.user_id,
                "username": user.username,
                "email": user.email
            }
            }
        finally:
            session.close()




# validation:
        # existing_user= session.query(User).filter(
        #     User.email == email).first() 
        # similar to: 
        # SELECT * FROM users
        # WHERE email = ?
        # LIMIT 1 
# duplicate check
# password hashing
# create user
# commit

# POST Request
#     ↓
# Route
#     ↓
# AuthService
#     ↓
# SQLAlchemy
#     ↓
# SQLite