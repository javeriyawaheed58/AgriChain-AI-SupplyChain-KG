import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

# Load environment variables
load_dotenv()

def get_llama_llm(model_name: str = "llama-3.1-8b-instant", temperature: float = 0.0):
    """
    Llama 3 Model Instance initialize karta hai via Groq API.
    Updated model name: 'llama-3.1-8b-instant'
    """
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY environment variable mein set nahi hai!")

    llm = ChatGroq(
        groq_api_key=api_key,
        model_name=model_name,
        temperature=temperature
    )
    return llm

if __name__ == "__main__":
    try:
        llm = get_llama_llm()
        response = llm.invoke("Hello Llama 3, are you ready to generate Cypher queries?")
        print("\n--- Step 5.1: Llama 3 Configuration Output ---")
        print("Model Response:", response.content)
        print("\n[SUCCESS] LangChain & Llama 3 configuration successful!")
    except Exception as e:
        print("\n[ERROR] Configuration failed:", str(e))