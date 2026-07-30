import sys
from pathlib import Path

# Set root project path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from nlp.entity_extractor import EntityExtractor
from nlp.entity_linker import EntityLinker

def run_nlp_pipeline(user_query: str):
    # Step 4.2: Entity Extraction
    extractor = EntityExtractor()
    extracted_data = extractor.extract_entities(user_query)
    
    print("\n--- Step 4.2: Entity Extraction Output ---")
    print("Query:", user_query)
    print("Entities:", extracted_data["entities"])
    
    # Mock Graph Nodes for Step 4.3 Testing
    mock_kg_nodes = [
        "Green Acres Farm Ltd.",
        "Metro Retail Store HQ",
        "Rotterdam Central Depot",
        "Batch-9081"
    ]

    # Step 4.3: Entity Linking
    linker = EntityLinker()
    extracted_texts = [e["text"] for e in extracted_data["entities"]]
    
    linked_entities = linker.link_entities(
        extracted_entities=extracted_texts,
        kg_nodes=mock_kg_nodes
    )

    print("\n--- Step 4.3: Entity Linking Output ---")
    for item in linked_entities:
        print(f"Extracted: '{item['extracted_text']}' -> Matched Node: '{item['matched_node']}' (Score: {item['confidence_score']})")

if __name__ == "__main__":
    test_query = "Show shipment movement from Green Acres Farm to Metro Retail Store"
    run_nlp_pipeline(test_query)