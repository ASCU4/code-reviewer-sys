from database.database import SessionLocal #gives database session
from models import User #gives User model
from werkzeug.security import generate_password_hash #gives password hashing


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