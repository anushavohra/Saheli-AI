from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
import base64
from app.database import SessionLocal
from app.models.seller_listing import Seller, Listing
from app.services.ai_service import get_shop_review

router = APIRouter()

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/dukan-ki-baat")
async def review_shop(
    photo: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(...),
    shop_bio: str = Form(...),
    session_id: str = Form(...),
    db: Session = Depends(get_db),
):
    title = title.strip()
    description = description.strip()
    session_id = session_id.strip()

    if not title or not description:
        return {"error": "Title aur description dono zaroori hain."}
    if not session_id:
        return {"error": "session_id zaroori hai."}
    if photo.content_type not in ALLOWED_IMAGE_TYPES:
        return {"error": "Sirf JPEG, PNG, ya WEBP photo upload karein."}

    try:
        seller = db.query(Seller).filter(Seller.session_id == session_id).first()
        if seller:
            seller_context = f"Seller's shop: {seller.shop_name}, Category: {seller.category}, Bio: {seller.bio}"
        else:
            seller_context = ""

        photo_bytes = await photo.read()
        if not photo_bytes:
            return {"error": "Photo file khali hai, dobara upload karein."}

        base64_image = base64.b64encode(photo_bytes).decode("utf-8")

        text_prompt = f"""Product title: {title}
Description: {description}
Shop bio: {shop_bio}
Seller context: {seller_context}

Please review this shop following the Dukan Ki Baat structure.

IMPORTANT:
- Keep the review concise.
- Reply in the same language/style as the seller.
- If the seller information is in Roman Urdu, reply in Roman Urdu.
- Give practical advice that a small/home-based seller can actually use.
"""

        cleaned_review = get_shop_review(text_prompt, photo.content_type, base64_image)

        new_listing = Listing(
            session_id=session_id,
            title=title,
            description=description,
            review_result=cleaned_review,
        )
        db.add(new_listing)
        db.commit()

        return {"review": cleaned_review}

    except Exception as e:
        db.rollback()
        return {"error": "Review generate nahi ho saka, dobara try karein.", "detail": str(e)}