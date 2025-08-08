// import axios from 'axios';
// import weaviate from 'weaviate-ts-client';
// import OpenAI from 'openai';

// const client = weaviate.client({
//   scheme: 'http',
//   host: process.env.WEAVIATE_URL || 'weaviate:8080',
// });

// const useManualEmbeddings = process.env.USE_EMBEDDINGS_MANUAL === 'true';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export default {
//   /**
//    * Genera embeddings desde OpenAI si está habilitado el modo manual.
//    */
//   // async embedText(text: string): Promise<number[] | null> {
//     //   if (!useManualEmbeddings) return null;
    
//     //   try {
//       //     const response = await openai.embeddings.create({
//         //       model: 'text-embedding-3-small',
//         //       input: text,
//         //     });
        
//         //     return response.data[0].embedding;
//         //   } catch (error) {
//           //     console.error('[EMBEDDING ERROR]', error);
//           //     throw new Error('Error generating embedding from OpenAI');
//           //   }
//           // },
          
//   // export const embedText = async (text: string): Promise<number[]> => {
//   // async embedText(text: string): Promise<number[] | null> {
//   //   if (process.env.USE_EMBEDDINGS_MANUAL === 'true') {
//   //     try {
//   //       const embedding = await openai.embeddings.create({
//   //         model: 'text-embedding-ada-002',
//   //         input: text,
//   //       });
//   //       return embedding.data[0].embedding;
//   //     } catch (err) {
//   //       console.error('[EMBEDDING ERROR]', err);
//   //       // fallback
//   //       return Array(1536).fill(0.123); // ⚠️ Falso vector con longitud típica de ada-002
//   //     }
//   //   }
//   //   return text as any;
//   // },

//   async embedText(text: string): Promise<number[] | null> {
//     if (!useManualEmbeddings) return null;

//     try {
//       console.log('[EMBEDDING] Using manual embedding service, ', process.env.EMBED_SERVER_URL);
//       const res = await axios.post(
//         process.env.EMBED_SERVER_URL || 'http://localhost:8001/embed',
//         { text }
//       );

//       if (res.status !== 200) throw new Error('Failed to fetch embedding from local service');

//       return res.data.embedding;
//     } catch (error) {
//       console.error('[EMBED ERROR]', error);
//       return null;
//     }
//   },


//   /**
//    * Inserta o actualiza un objeto Note en Weaviate.
//    */
//   async upsert(id: string, text: string | number[], metadata = {}) {
//     try {
//       const creator = client.data.creator()
//         .withClassName('Note')
//         .withId(id)
//         .withProperties({
//           ...(typeof text === 'string' ? { text } : {}),
//           ...metadata,
//         });

//       if (useManualEmbeddings && Array.isArray(text)) {
//         creator.withVector(text);
//       }

//       await creator.do();
//     } catch (error) {
//       console.error('[UPSERT ERROR]', error);
//       throw new Error('Failed to upsert note into Weaviate');
//     }
//   },

//   /**
//    * Realiza una búsqueda de similitud en Weaviate.
//    */
//   async query(vector: number[] | string, topK = 3) {
//     const useManual = process.env.USE_EMBEDDINGS_MANUAL === 'true';
//     console.log('[WEAVIATE] Using manual embeddings?', useManual);

//     const builder = client.graphql
//       .get()
//       .withClassName('Note')
//       .withFields(`
//         text 
//         title
//         source
//         tags
//         created_at
//         _additional {
//           certainty
//         }
//       `)
//       .withLimit(topK);

//     if (useManual && Array.isArray(vector)) {
//       console.log('[WEAVIATE] Using nearVector with embedding');
//       builder.withNearVector({ vector });
//     } else {
//       console.log('[WEAVIATE] Using nearText');
//       builder.withNearText({ concepts: [vector as string] });
//     }

//     const result = await builder.do();
//     return result.data.Get.Note;
//   }

// };

import axios from 'axios';
import weaviate from 'weaviate-ts-client';
import OpenAI from 'openai';

const client = weaviate.client({
  scheme: 'http',
  host: process.env.WEAVIATE_URL || 'weaviate:8080',
});

const useManualEmbeddings = process.env.USE_EMBEDDINGS_MANUAL === 'true';
const EMBED_SERVER_URL = process.env.EMBED_SERVER_URL || 'http://embed:8001/embed';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default {
  /**
   * Genera embeddings usando servicio local (si USE_EMBEDDINGS_MANUAL === true).
   */
  async embedText(text: string): Promise<number[] | null> {
    if (!useManualEmbeddings) return null;

    try {
      console.log('[EMBEDDING] Using manual embedding service at', EMBED_SERVER_URL);
      // const res = await axios.post(EMBED_SERVER_URL, { input: text });
      const res = await axios.post(`${EMBED_SERVER_URL}`, {
        text,
      });
      console.log('[EMBEDDING RESPONSE]', res.data)
      if (res.status !== 200) throw new Error('Failed to fetch embedding from local service');

      return res.data.embedding;
    } catch (error) {
      console.error('[EMBED ERROR]', error);
      return null;
    }
  },

  /**
   * Inserta una nota en Weaviate (con o sin vector).
   */
  async upsert(id: string, text: string | number[], metadata = {}) {
    try {
      const creator = client.data
        .creator()
        .withClassName('Note')
        .withId(id)
        .withProperties({
          ...(typeof text === 'string' ? { text } : {}),
          ...metadata,
        });

      if (useManualEmbeddings && Array.isArray(text)) {
        creator.withVector(text);
      }

      await creator.do();
    } catch (error) {
      // console.error('[UPSERT ERROR]', error?.response?.data || error);
      console.error('[UPSERT ERROR]', (error as any)?.response?.data || error);

      throw new Error('Failed to upsert note into Weaviate');
    }
  },

  /**
   * Realiza consulta de notas similares en Weaviate.
   */
  async query(vectorOrText: number[] | string, topK = 3) {
    try {
      const builder = client.graphql
        .get()
        .withClassName('Note')
        .withFields(`
          text
          _additional {
            certainty
          }
        `)
        .withLimit(topK);

      if (useManualEmbeddings && Array.isArray(vectorOrText)) {
        console.log('[WEAVIATE] Using nearVector with manual embedding');
        builder.withNearVector({ vector: vectorOrText });
      } else if (!useManualEmbeddings && typeof vectorOrText === 'string') {
        console.log('[WEAVIATE] Using nearText');
        builder.withNearText({ concepts: [vectorOrText] });
      } else {
        throw new Error('Invalid query input or config');
      }

      const result = await builder.do();
      return result.data.Get.Note;
    } catch (error) {
      // console.error('[QUERY ERROR]', error?.response?.data || error);
      console.error('[UPSERT ERROR]', (error as any)?.response?.data || error);

      throw new Error('Failed to query Weaviate');
    }
  },
};


// import { AxiosError } from 'axios';

// console.error('[UPSERT ERROR]', (error as AxiosError)?.response?.data || error);

// function isAxiosError(error: any): error is { response: { data: any } } {
//   return error && error.response && error.response.data;
// }

// // ...
// if (isAxiosError(error)) {
//   console.error('[UPSERT ERROR]', error.response.data);
// } else {
//   console.error('[UPSERT ERROR]', error);
// }


