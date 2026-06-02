import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});


 export async function getEmgbedding(texts: any[]) {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts,
    });

    //  // Extract the raw embedding array from every item in OpenAI's response
//   return res.data.map(item => item.embedding); 
    return (res.data.map(item => item.embedding))
  }