import chromadb

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(name="saheli_knowledge")

query = "how do I price my earrings"

results = collection.query(
    query_texts=[query],
    n_results=2
)

print("Query:", query)
print("\nTop matches:")
for doc_id, doc_text in zip(results["ids"][0], results["documents"][0]):
    print(f"\n--- {doc_id} ---")
    print(doc_text[:200], "...")