from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from database.database import Base, engine

class User(Base):
    __tablename__="users"

    username: Mapped[str]= mapped_column(
        String(50),
        unique=True,
        nullable=False
    ) #name stores a string, similarly username stores a string and is managed by SQLAlchemy ORM

    user_id: Mapped[int]= mapped_column(
        primary_key=True,
        unique=True,
        nullable=False
    ) #every user gets a unique ID

    email: Mapped[str]=  mapped_column(
        String(100),
        unique= True,
        nullable=False
    )

    password_hash: Mapped[str]= mapped_column(
        String(255), 
        nullable=False
    )

