from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import chat, seller, dukan_ki_baat

Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(chat.router)
app.include_router(seller.router)
app.include_router(dukan_ki_baat.router)


@app.get("/health")
def health():
    return {"status": "ok"}