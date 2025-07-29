import pineconeClient from './pineconeClient';
import weaviateClient from './weaviateClient';

const provider = process.env.VECTOR_PROVIDER || 'weaviate';

const vectorClient = provider === 'pinecone' ? pineconeClient : weaviateClient;

export default vectorClient;
