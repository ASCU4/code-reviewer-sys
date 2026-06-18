from database.database import Base, engine

#importing models
from models.user import User
from models.review import Review

Base.metadata.create_all(bind=engine) #create all tables in the engine
print("Table successfully created")
#create_all() is equivalent to CREATE TABLE users (
#     id INTEGER PRIMARY KEY,
#     username VARCHAR(50),
#     email VARCHAR(100),
#     password_hash VARCHAR(255),
#     created_at TIMESTAMP
# );