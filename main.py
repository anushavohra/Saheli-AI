from fastapi import FastAPI
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",           # local Vite dev server
        "https://your-frontend.vercel.app", # replace with your real deployed frontend URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.post("/chat")
def chat(message: str):
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=message
    )
    return {"reply": response.text}