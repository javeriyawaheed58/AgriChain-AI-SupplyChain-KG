import sys
from pathlib import Path

# Project root path setup
sys.path.append(str(Path(__file__).resolve().parent.parent))

from backend.cypher_chain import TextToCypherChain

def validate_text_to_cypher():
    chain = TextToCypherChain()

    # Benchmark test cases
    test_suite = [
        {
            "category": "Farm Traceability",
            "question": "Which batches were produced by Green Acres Farm Ltd.?",
            "context": "Farm: Green Acres Farm Ltd."
        },
        {
            "category": "Shipment Tracking",
            "question": "Find all shipments for Batch-9081",
            "context": "Batch: Batch-9081"
        },
        {
            "category": "Quality Control",
            "question": "Show all quality reports associated with Metro Retail Store HQ shipments",
            "context": "Shipment destination: Metro Retail Store HQ"
        },
        {
            "category": "Multi-hop Traceability",
            "question": "Trace origin farm for quality report with High severity",
            "context": "QualityReport severity: High"
        }
    ]

    print("\n==================================================")
    print("   STARTING STEP 5.5: CYPHER GENERATION VALIDATION")
    print("==================================================\n")

    for idx, test in enumerate(test_suite, 1):
        print(f"Test #{idx} [{test['category']}]")
        print(f"User Question : {test['question']}")
        print(f"Entity Context: {test['context']}")
        
        try:
            cypher = chain.generate_cypher(test['question'], test['context'])
            print(f"Generated Cypher:\n  {cypher}\n")
        except Exception as e:
            print(f"ERROR Generating Cypher: {str(e)}\n")
        
        print("-" * 50)

    print("\n[SUCCESS] Validation test suite execution completed!")

if __name__ == "__main__":
    validate_text_to_cypher()