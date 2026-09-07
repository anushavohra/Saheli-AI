import chromadb
import os

client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(name="saheli_knowledge")

kb_folder = "app/knowledge_base"

for filename in os.listdir(kb_folder):
    if filename.endswith(".txt"):
        filepath = os.path.join(kb_folder, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        collection.add(
            documents=[content],
            ids=[filename]
        )

print("Knowledge base loaded successfully.")