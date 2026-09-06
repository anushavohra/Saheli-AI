import chromadb
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]

CHROMA_PATH = BASE_DIR / "chroma_data"


client = chromadb.PersistentClient(
    path=str(CHROMA_PATH)
)


collection = client.get_or_create_collection(
    name="saheli_knowledge"
)