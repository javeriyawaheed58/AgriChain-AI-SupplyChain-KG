import spacy

class EntityExtractor:
    def __init__(self, model_name: str = "en_core_web_sm"):
        self.nlp = spacy.load(model_name)

    def extract_entities(self, text: str):
        doc = self.nlp(text)
        
        extracted_phrases = set()
        
        # 1. Named Entities
        for ent in doc.ents:
            extracted_phrases.add(ent.text)
            
        # 2. Noun Chunks (Aisi entities ke liye jo default NER se miss ho jayein)
        for chunk in doc.noun_chunks:
            # Common query filler words skip karne ke liye filtering
            clean_chunk = chunk.text.strip()
            if clean_chunk.lower() not in ["show shipment movement", "status", "origin", "what"]:
                extracted_phrases.add(clean_chunk)
        
        # Output list format mein convert karein
        entities = [{"text": phrase, "label": "EXTRACTED"} for phrase in extracted_phrases]
        
        return {
            "entities": entities
        }