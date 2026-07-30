from core_logic import process_supply_chain_nodes
from report_generator import generate_supply_chain_report

def run_phase_2():
    print("--- Starting Phase 2 Execution ---")
    
    # Phase 1 Schema Aligned 4 Entities Data Input
    input_data = [
        {"entity_id": "F_101", "name": " Punjab Wheat Farm ", "type": "Farm"},
        {"entity_id": "P_102", "name": " Agri Processing Hub ", "type": "Processing Unit"},
        {"entity_id": "D_201", "name": " Central Hub ", "type": "Distributor"},
        {"entity_id": "R_301", "name": " City Mart ", "type": "Retailer"}
    ]
    
    # 1 & 2. Run Cleaning & Core Logic
    nodes, stats = process_supply_chain_nodes(input_data)
    
    # 3. Run Report Generation
    report = generate_supply_chain_report(stats)
    
    print("\n--- Final Report Preview ---")
    print(report)

if __name__ == "__main__":
    run_phase_2()