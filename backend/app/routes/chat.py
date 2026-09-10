from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.chat import ChatRequest
from app.models.conversation import Conversation
from app.models.seller_listing import Seller
from app.services.ai_service import get_chat_reply
from app.services.knowledge_base import retrieve_relevant_knowledge

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/chat")
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    message = request.message.strip()
    session_id = request.session_id.strip()

    if not message:
        return {"error": "Message khali nahi ho sakta."}
    if not session_id:
        return {"error": "session_id zaroori hai."}

    try:
        seller = db.query(Seller).filter(Seller.session_id == session_id).first()
        if seller:
            seller_context = f"Seller's shop: {seller.shop_name}, Category: {seller.category}, Bio: {seller.bio}"
        else:
            seller_context = ""

        user_message = Conversation(session_id=session_id, sender="user", message=message)
        db.add(user_message)
        db.commit()

        past_messages = (
            db.query(Conversation)
            .filter(Conversation.session_id == session_id)
            .order_by(Conversation.timestamp)
            .all()
        )
        conversation_history = "\n".join([f"{m.sender}: {m.message}" for m in past_messages])

        retrieved_knowledge = retrieve_relevant_knowledge(message)

        full_prompt = f"""Seller's business context:
{seller_context}

Relevant knowledge base guidance:
{retrieved_knowledge}

Conversation so far:
{conversation_history}
"""

        reply_text = get_chat_reply(full_prompt)

        assistant_message = Conversation(session_id=session_id, sender="assistant", message=reply_text)
        db.add(assistant_message)
        db.commit()

        return {"reply": reply_text}

    except Exception as e:
        db.rollback()
        return {"error": "Kuch masla hua, dobara try karein.", "detail": str(e)}