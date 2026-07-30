def generate_supply_chain_report(stats, file_path="supply_chain_report.txt"):
    """
    Step 2.3: Generates execution report summary.
    """
    report_content = (
        "===========================================\n"
        "      FARM SUPPLY CHAIN ANALYSIS REPORT    \n"
        "===========================================\n"
        f"Total Processed Entities: {stats.get('total_nodes', 0)}\n"
        f"Entity Breakdown: {stats.get('node_types', {})}\n"
        "Status: Phase 2 Core Pipeline Executed Successfully.\n"
        "===========================================\n"
    )
    
    with open(file_path, "w") as f:
        f.write(report_content)
        
    print(f"✓ [Step 2.3] Report Generator: Saved output report to {file_path}")
    return report_content