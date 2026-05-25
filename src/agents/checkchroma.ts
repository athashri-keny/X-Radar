import 'dotenv/config'
import { ChromaClient } from "chromadb";

const client = new ChromaClient({
    host: "chroma-02b5.onrender.com",
    port: 443,
    ssl: true
});

const collection = await client.getCollection({ name: "hiring_tweets" })


const result = await collection.query({
  queryTexts: [`Looking for a Frontend/Full Stack Developer role.
Experience with React, Angular, JavaScript, Node.js, Python, and building AI-powered features & modern web apps.
Open to opportunities & referrals`],
  nResults: 3,
});

console.log(result.documents);    // what examples are being retrieved
console.log(result.metadatas);    // what labels they have
console.log(result.distances);    // how close they are

// const data = await collection.get()
// console.log("Total documents:", data.ids.length)
// console.log("Documents:", data.documents)