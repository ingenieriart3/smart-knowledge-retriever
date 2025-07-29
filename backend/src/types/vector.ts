export interface PineconeMatch {
  id: string;
  score: number;
  metadata: {
    [key: string]: any;
    text?: string;
    content?: string;
  };
}

export interface WeaviateMatch {
  id?: string;
  text: string;
  _additional?: {
    certainty: number;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface NormalizedResult {
  source: 'pinecone' | 'weaviate';
  id?: string;
  score: number;
  text: string;
  metadata: Record<string, any>;
}
