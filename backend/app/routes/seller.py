from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.seller import SellerRequest
from app.models.seller_listing import Seller

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/seller/create")
def create_seller(request: SellerRequest, db: Session = Depends(get_db)):
    session_id = request.session_id.strip()
    shop_name = request.shop_name.strip()
    category = request.category.strip()

    if not session_id or not shop_name or not category:
        return {"error": "session_id, shop_name aur category zaroori hain."}

    try:
        new_seller = Seller(
            session_id=session_id,
            shop_name=shop_name,
            category=category,
            bio=request.bio,
        )
        db.add(new_seller)
        db.commit()
        return {"message": "Seller profile created successfully"}
    except Exception as e:
        db.rollback()
        return {"error": "Seller profile save nahi ho saka.", "detail": str(e)}