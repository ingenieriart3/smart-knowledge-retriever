import {
  PineconeMatch,
  WeaviateMatch,
  NormalizedResult,
} from '../types/vector';

// export function normalizePineconeResults(matches: PineconeMatch[]): NormalizedResult[] {
//   return matches.map((match) => ({
//     source: 'pinecone',
//     id: match.id,
//     score: match.score,
//     metadata: match.metadata,
//     text: match.metadata?.text || match.metadata?.content || 'No preview',
//   }));
// }

// export function normalizeWeaviateResults(results: WeaviateMatch[]): NormalizedResult[] {
//   return results.map((item) => ({
//     source: 'weaviate',
//     id: item.id || undefined,
//     score: item._additional?.certainty || 0,
//     metadata: { ...item },
//     text: item.text || 'No text found',
//   }));
// }

export function normalizePineconeResults(matches: any[]) {
  return matches.map((match) => ({
    text: match.metadata?.text || '',
    title: match.metadata?.title || '',
    certainty: match.score,
    source: match.metadata?.source || '',
    tags: match.metadata?.tags || [],
    created_at: match.metadata?.created_at || '',
  }));
}

export function normalizeWeaviateResults(items: any[]) {
  return items.map((item: any) => ({
    text: item.text || '',
    title: item.title || '',
    certainty: item._additional?.certainty || null,
    source: item.source || '',
    tags: item.tags || [],
    created_at: item.created_at || '',
  }));
}
