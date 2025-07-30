// backend/src/utils/normalizeResults.test.ts
import { describe, it, expect } from 'vitest';
import {
  normalizePineconeResults,
  normalizeWeaviateResults
} from '../src/utils/normalizeResults';

describe('normalizePineconeResults', () => {
  it('should map pinecone results correctly', () => {
    const input = [
      {
        id: '123',
        score: 0.95,
        metadata: {
          text: 'hello world',
          extra: 'info'
        }
      }
    ];

    const output = normalizePineconeResults(input);
    expect(output[0].id).toBe('123');
    expect(output[0].text).toBe('hello world');
    expect(output[0].source).toBe('pinecone');
  });
});

describe('normalizeWeaviateResults', () => {
  it('should map weaviate results correctly', () => {
    const input = [
      {
        text: 'hola',
        _additional: { certainty: 0.88 },
        extra: 'metadata'
      }
    ];

    const output = normalizeWeaviateResults(input);
    expect(output[0].text).toBe('hola');
    expect(output[0].score).toBeCloseTo(0.88);
    expect(output[0].source).toBe('weaviate');
  });
});
