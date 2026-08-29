from pydantic import BaseModel
from typing import Optional

class UploadRequest(BaseModel):
    session_id: str
    title: str
    description: str
    bio: Optional[str] = None
    category: str

class UploadResponse(BaseModel):
    review_result: str