import sys
from pathlib import Path

# Project root directory add kar rahe hain
sys.path.append(str(Path(__file__).resolve().parent.parent))

from nlp.entity_linker import EntityLinker

try:
    from nlp.entity_extractor import EntityExtractor
except ImportError:
    from nlp.entity_extractor import entity_extractor as EntityExtractor


def validate_nlp_pipeline():
    extractor = EntityExtractor()
    linker = EntityLinker()

    # Knowledge Graph ke Mock Nodes (Sample Database)
    kg_nodes = [
        "Green Acres Farm Ltd.",
        "Metro Retail Store HQ",
        "Rotterdam Central Depot",
        "Batch-9081",
        "Fresh Harvest Co."
    ]

    # Test Benchmark Cases (User Query -> Expected Linked Node)
    test_cases = [
        {
            "query": "Show shipment movement from Green Acres Farm to Metro Retail Store",
            "expected_links": ["Green Acres Farm Ltd.", "Metro Retail Store HQ"]
        },
        {
            "query": "What is the status of Batch 9081?",
            "expected_links": ["Batch-9081"]
        },
        {
            "query": "Trace origin for Fresh Harvest",
            "expected_links": ["Fresh Harvest Co."]
        }
    ]

    total_tests = len(test_cases)
    passed_tests = 0

    print("\n==========================================")
    print("   STARTING STEP 4.4: NLP VALIDATION")
    print("==========================================\n")

    for idx, test in enumerate(test_cases, 1):
        query = test["query"]
        expected = test["expected_links"]

        # 1. Extract Entities
        extraction_result = extractor.extract_entities(query)
        extracted_entities = extraction_result.get("entities", [])
        
        extracted_texts = [
            e["text"] if isinstance(e, dict) else e 
            for e in extracted_entities
        ]

        # 2. Link Entities
        linked_results = linker.link_entities(
            extracted_entities=extracted_texts,
            kg_nodes=kg_nodes,
            threshold=0.4
        )

        matched_nodes = [
            item["matched_node"] 
            for item in linked_results 
            if item["matched_node"] is not None
        ]

        # 3. Verify Accuracy
        is_correct = set(expected).issubset(set(matched_nodes))
        if is_correct:
            passed_tests += 1
            status = "PASSED"
        else:
            status = "FAILED"

        print(f"Test #{idx}: [{status}]")
        print(f"  Query: '{query}'")
        print(f"  Extracted: {extracted_texts}")
        print(f"  Matched:   {matched_nodes}")
        print(f"  Expected:  {expected}\n")

    accuracy = (passed_tests / total_tests) * 100
    print("------------------------------------------")
    print(f"Validation Summary: {passed_tests}/{total_tests} Passed")
    print(f"NLP Pipeline Accuracy: {accuracy:.2f}%")
    print("==========================================\n")


if __name__ == "__main__":
    validate_nlp_pipeline()