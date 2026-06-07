
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

    // console.log(typeof embeddings) // ARRAY

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
{text: `🚀 New Job Alert! Lead Java Full Stack Developer at Infosys 📍 Calgary, CA Apply here 👉 ` , label: 'hiring_tweet'} ,
{text: `Hiring a Full-Stack Developer for a fully custom web platform. Need user/admin/employee portals, authentication, dashboards, automations, database, and custom functionality. DM portfolio & experience.` , label: 'hiring_tweet'},
{text: `#Hiring Senior Full Stack Developer – React / Node / AWS | Hybrid Northampton £60,000–£70,000 + Bonus and Benefits ` , label: 'hiring_tweet'},
{text: `WE ARE HIRING 🗣️🗣️  We are looking for an experienced Full Stack Developer  Experience Level: 4-5 Years with banking experience Click Here to apply: ` , label: 'hiring_tweet'},
{text: `Hiring: Specialist System Engineer | Full Stack Developer (Python) | Bangalore 📌 Position: Specialist System Engineer – Full Stack Developer 📍 Location: Bangalore` , label: 'hiring_tweet'},
{text: `Hiring | Full Stack Developer Remote | Full Stack Development & System Design` , label: 'hiring_tweet'},
{text: `Hiring: Headspin - Full Stack Developer Location: Remote - United States` , label: 'hiring_tweet'},
{text: `WebCreek is hiring a Senior Full Stack Developer with strong React & NestJS experience for an on-site role in Houston, TX. Relocation candidates encouraged.` , label: 'hiring_tweet'},
{text: `Booz Allen: Full Stack Developer Booz Allen is hiring for a Full Stack Developer` , label: 'hiring_tweet'},
{text: `We are looking for a Full Stack Developer & Web Designer to work with us` , label: 'hiring_tweet'},
{text: `We’re Hiring: Full Stack Java Developer Location: Pune Experience: 3–7 Years` , label: 'hiring_tweet'},
{text: `We’re looking for a Mid-Level Full Stack Developer with strong SQL skills and a passion for creating reliable, data-driven applications.` , label: 'hiring_tweet'},
{text: `Looking for a full-stack developer to help build the future of intelligent commerce.` , label: 'hiring_tweet'},
{text: `Looking for a Full-Stack Developer Intern! If you’re a fresher who loves building things, ships side projects, and can figure things out independently, I’d love to talk.` , label: 'hiring_tweet'},
{text: `We're looking for an experienced Full Stack Developer to join a short-term project focused on building, optimizing, and maintaining modern web applications.` , label: 'hiring_tweet'},
{text: `looking for a full stack developer for a remote-first startup / agency working closely with global clients (hiring via)` , label: 'hiring_tweet'},
{text: `We are looking for a highly skilled Full Stack SaaS Developer with a strong eye for UI/UX and deep experience with AI-driven development workflows.` , label: 'hiring_tweet'},
{text: `We’re Hiring: Full-Stack Software Developer (Frontend / Backend) with AI (Nigeria). Are you a highly skilled Full-Stack Developer with experience across frontend, backend, and AI/ML integration? This opportunity may be for you ` , label: 'hiring_tweet'},
{text: `Looking for the full stack developer who can work on project basis paid but depends on the project and number of hour if you are interested then comment and dm me ` , label: 'hiring_tweet'},
{text: `We’re hiring 📣Looking for a genuine logo designer Full stack developer ` , label: 'hiring_tweet'},
{text: `We are looking for a serious Full-Stack Developer.  Work includes: web apps, dashboards, APIs,AI integrations Model: profit-sharing (no salary at start) at kozaexchange ` , label: 'hiring_tweet'},
{text: `I got a call from HR regarding a Full Stack Developer opening. They’re specifically looking for someone based in Kolkata since the interview process is inoffice.` , label: 'hiring_tweet'},
{text: `Looking for a full stack developer + designer able to launch a web app / website. DM me with your portfolio and I'll share the info.` , label: 'hiring_tweet'},
{text: `We are looking for a serious Full-Stack Developer.  Work includes: web apps, dashboards, APIs,AI integrations  Model: profit-sharing (no salary at start) You will work on real client projects and real systems, ` , label: 'hiring_tweet'},
{text: `We're hiring a Full Stack Developer at Humanity Founders. We're looking for someone based in the US or Europe with 3 to 5 years of experience, strong ownership, and a solid engineering mindset` , label: 'hiring_tweet'},
{text: `HIRING | Freelance Full-Stack Developer | Remote at Outlier AI` , label: 'hiring_tweet'},









// non hiring twwets
{ text: "available for freelance work I help startups and businesses build Tech Stack: React, Next.js, Node.js, Express, MongoDB Open for freelance projects, remote work, and collaborations. If you need a developer or know someone who does, let's connect DM open #MERN #ReactJS #NodeJS", label: "not_hiring" },
  { text: "Time for a quick re-introduction. I'm Fortune, a frontend developer who builds fast, responsive and user-friendly web apps. I specialize in React and help turn ideas into real, functional products. Need a frontend developer? I'm open to junior roles and freelance work.", label: "not_hiring" },
  { text: "Hiring a React Native developer in 2026? Are they New Architecture (JSI + Turbo Modules) or Expo-only? Different skill set, different comp, different sourcing channel. Worth 10 minutes before the JD goes live", label: "not_hiring" },
  { text: "available for freelance work I help startups and businesses build Tech Stack: React, Next.js, Node.js, Express, MongoDB Open for freelance projects, remote work, and collaborations. If you need a developer or know someone who does, let's connect DM opem", label: "not_hiring" },
  {text: `Don't feel satisfied with my current work, feels like it won't exist in next 5 years. Looking for new opportunities as a Backend Software Engineer in Product based companies.` , label: 'not_hiring'},

  { text: "Open to work. React developer seeking new opportunities. DM me.", label: "not_hiring" },
  { text: "Seeking job change as a Frontend developer. Currently in MNC.", label: "not_hiring" },
  {text: ` I’m a web developer looking to build websites for small businesses and startups. If you need a clean, responsive website, I’m currently taking on projects at a discounted rate to build my portfolio. DM me or reply if interested. I’ll deliver quality work.` , label: 'not_hiring'},
  {text: `'ll build your small business a free website — looking for 2-3 people I'm not a professional web developer but I know how to build clean, functional websites and I enjoy doing it. I want to take on a few small projects to sharpen my skills and actually help someone in the…` , label: "not_hiring"},
     {text: `If anyone is looking for anyone who can build a website for their company/portfolio/ecommerce, dont hesitate to hire me. I'm a freelance web developer with 2 years experience &amp; have degree in IT from ukm. Can dm me for price negotiation and my previous project links🫶🏻 Rt pls💕` , label: "not_hiring"},     
  {text: `Built real products with React, Next.js &amp; Node.js. Self-taught, eager to grow with a solid team that values quality.` , label: 'not_hiring'},
 {text: `I'm a full-stack developer in a company, but I want to leave for something that I own.` , label: 'not_hiring'},
{text: ` I'm a Full Stack Web Developer with 5 years of experience and I'm interested in working with you` , label: 'not_hiring'},
{text: `I’m a fresher passionate about Full Stack Development and Problem Solving.` , label: 'not_hiring'},
{text: `Full Stack Developer for  IT/job opportunities 
Skilled in React.js, Node.js, MongoDB, Laravel, WordPress, Shopify, and scalable web development.Open to remote opportunities, internships, freelance projects, and collaborations ` , label: 'not_hiring'},
{text: ` I am a full stack developer free for Freelance/full time/part time/long term/short term` , label: 'not_hiring'},
{text: `final year grad Searching  for internship or placement opportunities Interested in SDE, Software Developer, Software Engineer, Full Stack Development, Frontend, Backend` , label: 'not_hiring'},
{text: `Full Stack Developer searching for IT/job opportunities Skilled in React.js, Node.js, MongoDB, Laravel, WordPress, Shopify, and scalable web development.` , label: 'not_hiring'},
{text: `My name is Frank. I’m a full-stack developer with a specialization in building user-friendly web applications, websites, and mobile applications for iOS and Android Currently open to collaborating with early-stage startups, creators, and businesses looking to improve their products and services.` , label: 'not_hiring'},
{text: `just finished my 1st year and i'm officially available for freelance & internship work!` , label: 'not_hiring'},
{text: `Hello, I’m a http://B.Tech (AI) student and a Full-Stack Developer. I’m currently searching for a Full-Stack / AI-ML Internship opportunity.` , label: 'not_hiring'},
{text: `I’m a full-stack web developer who builds highly convertible landing pages and web apps for brands and startups looking to scale. I’m open to new projects and gigs.` , label: 'not_hiring'},
{text: `Dear recruiters, If you are looking for someone with : Java, Python, PHP; React, Angular, Next.js; PostgreSQL, Redis, MongoDB; AWS (S3, EC2, ECS, EKS);Unix system administration; Git & CI with TDD; Docker & Kubernetesyou’re not hiring a Full Stack Developer. zou’re hiring an entire IT department.` , label: 'not_hiring'},
{text: `🚀 4+ Years of Software Engineering experience is now on Fiverr! searching for  a reliable Backend or Full Stack Developer? ` , label: 'not_hiring'},
{text: `I am backend and full stack developer with key skills like: Whether looking for a freelancer or a full time role. I am open to both type of opportunities.` , label: 'not_hiring'},
{text: `devs who actually love building If that's you — let's connect 🤝` , label: 'not_hiring'},
{text: `looking for long-term dev work I just want to code and work with serious people` , label: 'not_hiring'},
{text: `Hello everyone 👋 Are you looking for a full-stack developer for just $19/hour with of : If yes, feel free to DM me or reply to this tweet — I’d love to connect!` , label: 'not_hiring'},
{text: `Sir, As a fresher full stack developer who is searching for a internship from non-tech background, what would be your suggestions for him?` , label: 'not_hiring'},

// scam tweets
{text: `Earn 500 !! rupppes from home!! ` , label: 'scam'} 
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