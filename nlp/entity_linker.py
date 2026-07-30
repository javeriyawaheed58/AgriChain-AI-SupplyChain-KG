import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

class EntityLinker:
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(model_name)

    def link_entities(self, extracted_entities: list, kg_nodes: list, threshold: float = 0.4):
        if not extracted_entities or not kg_nodes:
            return []

        linked_results = []
        node_embeddings = self.model.encode(kg_nodes)

        for entity in extracted_entities:
            entity_text = entity if isinstance(entity, str) else entity.get("text", "")
            if not entity_text:
                continue

            entity_embedding = self.model.encode([entity_text])
            similarities = cosine_similarity(entity_embedding, node_embeddings)[0]
            
            best_idx = np.argmax(similarities)
            best_score = float(similarities[best_idx])

            if best_score >= threshold:
                linked_results.append({
                    "extracted_text": entity_text,
                    "matched_node": kg_nodes[best_idx],
                    "confidence_score": round(best_score, 4)
                })
            else:
                linked_results.append({
                    "extracted_text": entity_text,
                    "matched_node": None,
                    "confidence_score": round(best_score, 4)
                })

        return linked_results