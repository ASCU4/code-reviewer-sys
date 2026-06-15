from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import sessionmaker
from config import Config

# Create an engine that stores data in the local directory's
# sqlalchemy_example.db file.

class Base(DeclarativeBase):
    pass

engine= create_engine(Config.DATABASE_URL, echo=True)

SessionLocal= sessionmaker(
        bind=engine, 
        autoflush=False,
        autocommit=False
    )

