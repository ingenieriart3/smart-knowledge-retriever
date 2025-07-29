import {
  PineconeMatch,
  WeaviateMatch,
  NormalizedResult,
} from '../types/vector';

export function normalizePineconeResults(matches: PineconeMatch[]): NormalizedResult[] {
  return matches.map((match) => ({
    source: 'pinecone',
    id: match.id,
    score: match.score,
    metadata: match.metadata,
    text: match.metadata?.text || match.metadata?.content || 'No preview',
  }));
}

export function normalizeWeaviateResults(results: WeaviateMatch[]): NormalizedResult[] {
  return results.map((item) => ({
    source: 'weaviate',
    id: item.id || undefined,
    score: item._additional?.certainty || 0,
    metadata: { ...item },
    text: item.text || 'No text found',
  }));
}
