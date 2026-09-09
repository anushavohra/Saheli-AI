import chromadb


# Connect to the existing ChromaDB database
chroma_client = chromadb.PersistentClient(path="./chroma_db")

# Get the existing knowledge collection
collection = chroma_client.get_or_create_collection(
    name="saheli_knowledge"
)


def retrieve_relevant_knowledge(query: str, n_results: int = 2) -> str:
    """
    Retrieve relevant knowledge from ChromaDB.

    If ChromaDB/ONNX is unavailable, return a safe fallback
    instead of crashing the /chat endpoint.
    """

    try:
        query_result = collection.query(
            query_texts=[query],
            n_results=n_results
        )

        documents = query_result.get("documents", [[]])[0]

        if not documents:
            return "No specific knowledge base guidance was found."

        return "\n".join(documents)

    except Exception:
        return (
            "Knowledge base temporarily unavailable. "
            "Use your general business guidance."
        )