import 'dotenv/config'


import { Pinecone } from '@pinecone-database/pinecone';
import { getEmgbedding } from '@/lib/EmbeddingFunction';


const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });


// const collection = await client.getCollection({ name: "hiring_tweets" })

const res = await getEmgbedding([`Hiring React Native Developer (Android + iOS)
Building a property marketplace MVP and looking for a React Native developer to handle:
• Authentication
• Property listings
• Search & filters
• Property details
• Favorites
• User profiles
• Notifications
• API integration
`])


  // step 2 — query pinecone
  const index = pc.index("tweets-ref")
  
    const results = await index.namespace("tweets").query({
     vector: res[0], // ← grab first (only) embedding
    topK: 3,                   // ← return top 5 most similar tweets
    includeMetadata: true      // ← include text and label in results
  })

  // console.log(results.matches)

// console.log(result.documents);    // what examples are being retrieved
// console.log(result.metadatas);    // what labels they have
// console.log(result.distances);    // how close they are

// const data = await collection.get()
// console.log("Total documents:", data.ids.length)
// console.log("Documents:", data.documents)