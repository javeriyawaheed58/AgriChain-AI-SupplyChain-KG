import pytest

# Example helper function test
def clean_query_text(query: str) -> str:
    return query.strip().lower()

def test_clean_query_text():
    raw_query = "   What is Crop Rotation?  "
    processed = clean_query_text(raw_query)
    
    assert processed == "what is crop rotation?"
    assert isinstance(processed, str)

def test_empty_query():
    raw_query = ""
    processed = clean_query_text(raw_query)
    
    assert processed == ""