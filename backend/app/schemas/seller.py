from pydantic import BaseModel
from typing import Optional


class SellerRequest(BaseModel):
    session_id: str
    shop_name: str
    category: str
    bio: Optional[str] = None


class UploadRequest(BaseModel):
    session_id: str
    title: str
    description: str
    bio: Optional[str] = None
    category: str