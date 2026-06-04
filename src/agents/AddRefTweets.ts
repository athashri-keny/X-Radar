
import 'dotenv/config'
import { OpenAIEmbeddingFunction } from "@chroma-core/openai";
import { nanoid } from "nanoid";


import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai';


const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});



const indexName = "tweets-ref";

// 
// // creating a db (which is called index herer)


// await pc.createIndex({
//   name: indexName,
//   dimension: 1536,
//   metric: "cosine",
//   spec: {
//     serverless: {
//       cloud: "aws",
//       region: "us-east-1",
//     },
//   },
// });

// console.log("Index created");



// creating the embedding function of the openai to store the tweets (each tweet) 
 export async function getEmbedding(texts: any[]) {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts,
    });

    //  // Extract the raw embedding array from every item in OpenAI's response
//   return res.data.map(item => item.embedding); 
    return (res.data.map(item => item.embedding))
  }


  

  // perparing records to each tweet 
  async function PrepareRecords(tweets: any[]) {

    // extracting texts from each tweet for to make embeddings 
    const texts = tweets.map(t => t.tweet_text)

    // console.log(texts)

    // embeddings created for each tweet
    const embeddings = await getEmbedding(texts)

    // console.log(typeof embeddings)

    // console.log("Embedding tweets texts " , embeddings)

    // returned the tweets with embeddings to store it in the index (database)
    return tweets.map((tweet, i) => ({
      id: nanoid(),
      values: embeddings[i],
      metadata: {
        text: tweet.tweet_text,
        label: tweet.label,
      },
    }))
    
  }


const AllTweets = [

// hiring tweets 

{text: 'Hey Everyone Im looking for a react native developer. DM me if you know anyone' , label: 'hiring_tweet'},
{text: `NEW BACKEND JOB ALERT! Trezor is hiring a React Native Developer Click on the link below to view more information. https://t.co/MsOlhPnWxF` , label: 'hiring_tweet'},
{text: `Now Hiring: Jr. Web Developer 💻 
Remotely (PH-based) build and maintain websites, apps, and CRM systems using PHP, Laravel, and React. Great for those who love coding and problem-solving.` , label: 'hiring_tweet'}
,
{text: `🔥Hiring 🔥 🚀 Company: Elegant Themes 🪛 Position: WordPress &amp; React Developer 🌎 Location: Remote Apply: https://t.co/etLLEuWsP9` , label: 'hiring_tweet'},
{text: `✨ We're #Hiring! 📍 Available for Latam 🇦🇷 🇨🇱 🇨🇴 🇵🇪 🇵🇷 🇧🇷 🇨🇷 🇸🇻 🇵🇾 • DevOps Engineer - SR. • Software Architect - (Azure DevOps, .NET) • FullStack Developer: (Java + React) - SSR./SR. • AI Engineer - SR. • Data Engineer - SR. • QA Automation - SR -SSR Adv. 👇🏽 more https://t.co/4Rv4SPT241` , label: 'hiring_tweet'},
{text: `https://t.co/NTuICmsmMf Remote Frontend React Developer - B2C Website Job at Dailymotion https://t.co/4OWLpdjPlQ` , label: 'hiring_tweet'},

{text: `[Hiring] New #remote jobs ✨ 💼 - Senior UI Developer 🏬 - Trumid 💰 - $150k-$200k 🌎 - Remote 🔗 - https://t.co/kv4hqkRbx6  #remotework #remotejob #typescript #react` , label: 'hiring_tweet'},
{text: `💥 New job alert! 💥 💼 Software Developer (Casper Team) 📍 Remote (Toronto, Vancouver, Canada) 💰 $145k - $155k 🛠️ Artificial Intelligence, Analytics, JavaScript, React, TypeScript, AWS, MongoDB, Claude, Copilot 🏢 👥 101 - 250 https://t.co/dzzvehjCxU #TechJobs` , label: 'hiring_tweet'},

{text: `Looking for a strong website developer / agency to build Tradeye’s site. Need: Dark, premium tech-forward design (think Scale AI, Tesla, xAI — clean, modern, authoritative). Dark theme, minimal, high-tech feel. Key pages: Home, About, Datasets, Pricing, Contact. Must include: Working hero video from real POV footage, functional lead form, Hugging Face integration, mobile responsive` , label: 'hiring_tweet'},
{text: `Budget: $4,520–$6,300 I’m looking for an experienced web developer to build a professional website for my Tech Tools business. The site should be modern, fast, and SEO-friendly.` , label: 'hiring_tweet'},
{text: `I'm looking for an experienced website developer for my online pharmacy shop. The developer I hired to build it did a mess. Only experienced developers, please. Please share your previous work in the comment section. I will be there to selec` , label: 'hiring_tweet'},
{text: `Guys, I am looking for a website developer to design my fitness coaching website. If you are interested, please share your work with me (Indians folks only). Also check out the website rivyl for the kind of design i am looking to build for myself. And if you know someone pls tag them or RT🙏🏼` , label: 'hiring_tweet'},
{text: `Looking for a web developer to help my build a custom $MSTR stock data and analytics website for my Youtube audience. Send me an e-mail if you want to partner up. Already have several customers demanding this product. Potential for $1m ARR by Q4 2026.` , label: 'hiring_tweet'},
{text: `I am looking for a blockchain developer who can build a website for me on $SUI blockchain. Please tag or refer to your blockchain dev if you know any. Please send your previous work in my dm or send it to my email. Email: ibblake190@gmail.com` , label: 'hiring_tweet'},
{text: `We are hiring a Web3 Full-Stack Developer at https://t.co/THTgAnO3TB! We’re looking for a specialist with expertise in API integrations, blockchain technologies, and UI/UX design. Please send your resume to info@srd.exchange to apply. Only 🇮🇳 ~ Freelancer always welcome! https://t.co/WLbswUTiWV` , label: 'hiring_tweet'},
{text: `Freelance Senior Frontend Web Developer (React / Next.js / Vue)
Remote | Freelance / Contract We’re looking for a highly skilled frontend web developer to completely redesign and modernize an existing client website:
https://revexuptime.com 
` , label: 'hiring_tweet'},
{text: `🚀 WE ARE HIRING – INTERMEDIATE REACT DEVELOPER Location: Lekki, Lagos  ,  Work Mode: Hybrid  Required Skills & Experience • 2–4 years of professional software development experience
• Strong proficiency in React.js, JavaScript (ES6+), and TypeScript` , 
 label: 'hiring_tweet'},
 {text: `Hiring on Sunday! Sr React Native Developer
Bengaluru · ₹15L–₹20L PA
` , label: 'hiring_tweet'},




// non hiring twwets
{ text: "available for freelance work I help startups and businesses build Tech Stack: React, Next.js, Node.js, Express, MongoDB Open for freelance projects, remote work, and collaborations. If you need a developer or know someone who does, let's connect DM open #MERN #ReactJS #NodeJS", label: "not_hiring" },
  { text: "Time for a quick re-introduction. I'm Fortune, a frontend developer who builds fast, responsive and user-friendly web apps. I specialize in React and help turn ideas into real, functional products. Need a frontend developer? I'm open to junior roles and freelance work.", label: "not_hiring" },
  { text: "Hiring a React Native developer in 2026? Are they New Architecture (JSI + Turbo Modules) or Expo-only? Different skill set, different comp, different sourcing channel. Worth 10 minutes before the JD goes live", label: "not_hiring" },
  { text: "available for freelance work I help startups and businesses build Tech Stack: React, Next.js, Node.js, Express, MongoDB Open for freelance projects, remote work, and collaborations. If you need a developer or know someone who does, let's connect DM opem", label: "not_hiring" },
  {text: `Don't feel satisfied with my current work, feels like it won't exist in next 5 years. Looking for new opportunities as a Backend Software Engineer in Product based companies.` , label: 'not_hiring'},
  // job seeker tweets (not hiring)

  { text: "Open to work. React developer seeking new opportunities. DM me.", label: "not_hiring" },
  { text: "Seeking job change as a Frontend developer. Currently in MNC.", label: "not_hiring" },
  {text: ` I’m a web developer looking to build websites for small businesses and startups. If you need a clean, responsive website, I’m currently taking on projects at a discounted rate to build my portfolio. DM me or reply if interested. I’ll deliver quality work.` , label: 'not_hiring'},
  {text: `'ll build your small business a free website — looking for 2-3 people I'm not a professional web developer but I know how to build clean, functional websites and I enjoy doing it. I want to take on a few small projects to sharpen my skills and actually help someone in the…` , label: "not_hiring"},
     {text: `If anyone is looking for anyone who can build a website for their company/portfolio/ecommerce, dont hesitate to hire me. I'm a freelance web developer with 2 years experience &amp; have degree in IT from ukm. Can dm me for price negotiation and my previous project links🫶🏻 Rt pls💕` , label: "not_hiring"},     
  {text: `Built real products with React, Next.js &amp; Node.js. Self-taught, eager to grow with a solid team that values quality.` , label: 'not_hiring'},

// scam tweets
{ text: "Make $500/day working from home DM me NOW 🔥🔥", label: "scam" },

]

try {

const index = pc.index(indexName).namespace("tweets");

const records = AllTweets.map((tweet) => ({
  tweet_text: tweet.text,  
  label: tweet.label,
}));

// console.log("Tweets" , records)

// 2. Prepare the records using your function
const res = await PrepareRecords(records) // passing the array of tweets in to the prepare records funcion


// Pinecone upsert expects an object with a 'records' (or 'vectors') property
// 3. Upsert them into Pinecone
await index.upsert({
  records: res
});

console.log("SUcccessfully saved to db")


} catch (error) {
    console.log("Error while saving to db" , error)
}