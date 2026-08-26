from fastapi import FastAPI
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.post("/chat")
def chat(message: str):
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=message
    )
    return {"reply": response.text}