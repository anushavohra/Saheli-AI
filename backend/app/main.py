from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routes import chat, seller, dukan_ki_baat


# Create database tables
Base.metadata.create_all(bind=engine)


# FastAPI app
app = FastAPI()


# Allow React frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://saheli-ai-bay.vercel.app/",  # add your real Vercel URL once deployed
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(chat.router)
app.include_router(seller.router)
app.include_router(dukan_ki_baat.router)


@app.get("/health")
def health():
    return {"status": "ok"}