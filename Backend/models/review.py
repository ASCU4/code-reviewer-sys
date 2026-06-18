from sqlalchemy import String, Text, ForeignKey, DateTime
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from database.database import Base, engine
from datetime import datetime, timezone

class Review(Base):
    __tablename__="reviews"

    id: Mapped[int]= mapped_column(
        primary_key= True,
        unique= True,
        nullable= False
    )
    user_id: Mapped[int]= mapped_column(
        ForeignKey("users.user_id"),
        nullable= False #can't be unique, what if a user wants to submit 3 files for review?
    )
    filename: Mapped[str]= mapped_column(
        String(100), #filename can't be unique, what if two users upload same app.py
        nullable= False
    )
    language: Mapped[str]= mapped_column(
        String(50),
        unique= False,
        nullable= False
    )
    code: Mapped[str]= mapped_column(
        Text, #text doesn't need length
        nullable= False
    )
    status: Mapped[str]= mapped_column(
        String(50), #can't be unique
        nullable= False,
        default= "PENDING"
    )
    created_at: Mapped[datetime] = mapped_column(
    default=lambda: datetime.now(timezone.utc)
)
