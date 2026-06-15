from database.database import SessionLocal
from models.user import User

session= SessionLocal() #create a local session
users= session.query(User).all() #query all users
print(users)

session.close()  #close session

# this ensures that 
# Engine -> Session -> ORM -> Database is working E2E