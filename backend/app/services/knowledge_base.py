import chromadb

chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection(name="saheli_knowledge")


def retrieve_relevant_knowledge(query: str, n_results: int = 2) -> str:
    query_result = collection.query(query_texts=[query], n_results=n_results)
    return "\n".join(query_result["documents"][0])