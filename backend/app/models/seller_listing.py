from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class Seller(Base):
    __tablename__ = "sellers"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    shop_name = Column(String, nullable=True)
    category = Column(String)
    bio = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    title = Column(String)
    description = Column(String)
    photo_url = Column(String, nullable=True)
    review_result = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)