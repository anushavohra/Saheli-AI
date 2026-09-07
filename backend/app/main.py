import os
import re
import base64
import time

from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq

from app.database import engine, Base, SessionLocal
from app.models.seller_listing import Seller, Listing
from app.models.conversation import Conversation

import chromadb


# Load environment variables
load_dotenv()


# Create database tables
Base.metadata.create_all(bind=engine)


# FastAPI app
app = FastAPI()


# Allow React frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Groq client
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ChromaDB
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection(
    name="saheli_knowledge"
)


# Saheli's personality and behavior
SAHELI_SYSTEM_PROMPT = """
You are Saheli, a warm, grounded AI mentor for Pakistani women running small,
home-based businesses such as jewelry, crochet, embroidery, baked goods,
candles, clothing, and other handmade or home-based work.

Your job is NOT to give generic motivational advice. Listen carefully to what
the seller is actually saying and help with the most useful next step.

Use the seller's actual business information, products, prices, costs,
customers, experience, and concerns whenever available.

If the seller is worried or discouraged:
- Acknowledge the specific concern.
- Be honest rather than promising success.
- Do not give empty motivational statements.
- Help identify the actual business problem.
- Give one useful next step when enough information is available.

If important information is missing, ask ONE focused question.

When the seller provides numbers, calculate the result yourself and explain
what it means simply.

Use the knowledge base when relevant.

Respond in the same language or style the seller uses:
- English → simple natural English
- Urdu → Urdu
- Roman Urdu → Roman Urdu
- Mixed English/Roman Urdu → natural mixed language

Be concise and practical.

Do not promise sales, profit, growth, or success.

For Dukan Ki Baat reviews:
1. Give ONE genuine, specific strength based on the actual product/photo/listing.
2. Give ONE OR TWO specific improvements and include ready-to-use wording.
3. Give ONE small weekly goal directly related to the improvement.

Before reviewing a product photo, check whether the photo actually matches
the title and description. If it does not match, politely ask the seller to
upload a photo of the actual product instead.

Never give generic praise such as "Your product is beautiful."
Never give unrelated advice just to make the response longer.

Saheli should feel like someone who is actually listening.
"""


def clean_response(text):
    """Remove hidden reasoning tags from model responses."""
    return re.sub(r"<think>.*?</think>", "", text, flags=re.DOTALL).strip()


# ---------------------------------------------------------
# CHAT
# ---------------------------------------------------------

@app.post("/chat")
def chat(
    message: str,
    session_id: str
):
    db = SessionLocal()

    try:
        # Get seller profile
        seller = (
            db.query(Seller)
            .filter(Seller.session_id == session_id)
            .first()
        )

        if seller:
            seller_context = (
                f"Seller's shop: {seller.shop_name}, "
                f"Category: {seller.category}, "
                f"Bio: {seller.bio}"
            )
        else:
            seller_context = "No seller profile has been created yet."

        # Save user message
        user_message = Conversation(
            session_id=session_id,
            sender="user",
            message=message
        )

        db.add(user_message)
        db.commit()

        # Retrieve conversation history
        past_messages = (
            db.query(Conversation)
            .filter(Conversation.session_id == session_id)
            .order_by(Conversation.timestamp)
            .all()
        )

        conversation_history = "\n".join(
            f"{m.sender}: {m.message}"
            for m in past_messages
        )

        # Retrieve relevant knowledge from ChromaDB
        try:
            query_result = collection.query(
                query_texts=[message],
                n_results=2
            )

            documents = query_result.get("documents", [[]])

            if documents and documents[0]:
                retrieved_knowledge = "\n".join(documents[0])
            else:
                retrieved_knowledge = "No relevant knowledge-base information found."

        except Exception as e:
            print("ChromaDB query failed:", e)
            retrieved_knowledge = "Knowledge base temporarily unavailable."

        # Build prompt
        full_prompt = f"""
Seller's business context:
{seller_context}

Relevant knowledge base guidance:
{retrieved_knowledge}

Conversation so far:
{conversation_history}

Current seller message:
{message}
"""

        # Ask Groq
        start_time = time.time()

        response = groq_client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": SAHELI_SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": full_prompt
                }
            ]
        )

        print("Groq call took:", time.time() - start_time)

        reply = clean_response(
            response.choices[0].message.content
        )

        # Save assistant response
        assistant_message = Conversation(
            session_id=session_id,
            sender="assistant",
            message=reply
        )

        db.add(assistant_message)
        db.commit()

        return {"reply": reply}

    finally:
        db.close()


# ---------------------------------------------------------
# SELLER PROFILE
# ---------------------------------------------------------

@app.post("/seller/create")
def create_seller(
    seller_data: dict,
):
    db = SessionLocal()

    try:
        new_seller = Seller(
            session_id=seller_data.get("session_id"),
            shop_name=seller_data.get("name"),
            category=seller_data.get("category"),
            bio=seller_data.get("bio")
        )

        db.add(new_seller)
        db.commit()

        return {
            "message": "Seller profile created successfully"
        }

    finally:
        db.close()


# ---------------------------------------------------------
# DUKAN KI BAAT
# ---------------------------------------------------------

@app.post("/dukan-ki-baat")
async def review_shop(
    photo: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(...),
    bio: str = Form(""),
    session_id: str = Form("")
):
    db = SessionLocal()

    try:
        # Find seller
        seller = (
            db.query(Seller)
            .filter(Seller.session_id == session_id)
            .first()
        )

        if seller:
            seller_context = (
                f"Seller's shop: {seller.shop_name}, "
                f"Category: {seller.category}, "
                f"Bio: {seller.bio}"
            )
        else:
            seller_context = ""

        # Read image
        photo_bytes = await photo.read()

        base64_image = base64.b64encode(
            photo_bytes
        ).decode("utf-8")

        # Send image + listing information to Groq
        response = groq_client.chat.completions.create(
            model="qwen/qwen3.6-27b",
            messages=[
                {
                    "role": "system",
                    "content": SAHELI_SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": f"""
Product title: {title}

Description:
{description}

Shop bio:
{bio}

Seller context:
{seller_context}

Please review this listing following the Dukan Ki Baat structure.
"""
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": (
                                    f"data:{photo.content_type};base64,"
                                    f"{base64_image}"
                                )
                            }
                        }
                    ]
                }
            ],
            reasoning_format="hidden",
            max_completion_tokens=4000
        )

        review = clean_response(
            response.choices[0].message.content
        )

        # Save listing
        new_listing = Listing(
            session_id=session_id,
            title=title,
            description=description,
            review_result=review
        )

        db.add(new_listing)
        db.commit()

        return {
            "review": review
        }

    finally:
        db.close()