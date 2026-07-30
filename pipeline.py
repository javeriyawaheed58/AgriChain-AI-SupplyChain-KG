import pandas as pd

def clean_and_validate_supply_chain_data(raw_data):
    """
    Supply chain entity & relationship data ko validate aur clean karta hai.
    """
    if raw_data is None:
        raise ValueError("Error: Provided supply chain data is empty.")
    
    df = pd.DataFrame(raw_data) if not isinstance(raw_data, pd.DataFrame) else raw_data.copy()
    
    # Missing fields handling
    df.fillna("UNKNOWN", inplace=True)
    
    # String spaces cleanup for Graph Nodes & Relationships
    for col in df.select_dtypes(include=['object']).columns:
        df[col] = df[col].astype(str).str.strip()
        
    print("✓ [Step 2.1] Data Pipeline: Supply Chain Data Cleaned & Validated.")
    return df

if __name__ == "__main__":
    # Test sample execution
    sample_nodes = [
        {"entity_id": "Farm_01 ", "name": " Green Valley ", "type": "Farm"},
        {"entity_id": "Dist_02", "name": None, "type": "Distributor"}
    ]
    cleaned = clean_and_validate_supply_chain_data(sample_nodes)
    print(cleaned)