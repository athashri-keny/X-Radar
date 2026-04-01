import { tool } from "@openai/agents";
import z from "zod";
import 'dotenv/config'
import axios from "axios";




 export const nicheQueries: Record<string, string[]> = {
  // ── React ──
  "React freelance leads": [
    "looking for a React developer",
    "need a freelance React dev",
    "hiring React developer",
    "need someone to build in React",
    "need React freelancer",
  ],
  "React jobs": [
    "hiring React developer",
    "React developer job opening",
    "looking for React engineer",
    "React developer remote job",
    "React dev position open",
  ],

  // ── Next.js ──
  "Next.js freelance leads": [
    "looking for a Next.js developer",
    "need a freelance Next.js dev",
    "hiring Next.js developer",
    "need someone to build in Next.js",
    "need Next.js freelancer",
  ],
  "Next.js jobs": [
    "hiring Next.js developer",
    "Next.js developer job opening",
    "looking for Next.js engineer",
    "Next.js developer remote job",
  ],

  // ── Vue ──
  "Vue freelance leads": [
    "looking for a Vue developer",
    "need a Vue.js developer",
    "hiring Vue developer",
    "need Vue.js freelancer",
  ],
  "Vue jobs": [
    "hiring Vue developer",
    "Vue developer job opening",
    "looking for Vue.js engineer",
    "Vue developer remote job",
  ],

  // ── Angular ──
  "Angular freelance leads": [
    "looking for an Angular developer",
    "need a freelance Angular dev",
    "hiring Angular developer",
    "need Angular freelancer",
  ],
  "Angular jobs": [
    "hiring Angular developer",
    "Angular developer job opening",
    "looking for Angular engineer",
    "Angular developer remote job",
  ],

  // ── Node.js ──
  "Node.js freelance leads": [
    "looking for a Node.js developer",
    "need a freelance Node.js dev",
    "hiring Node.js developer",
    "need backend Node.js freelancer",
  ],
  "Node.js jobs": [
    "hiring Node.js developer",
    "Node.js developer job opening",
    "looking for Node.js engineer",
    "Node.js backend developer remote",
  ],

  // ── Python ──
  "Python freelance leads": [
    "looking for a Python developer",
    "need a freelance Python dev",
    "hiring Python developer",
    "need Python freelancer",
    "need someone to build Python script",
  ],
  "Python jobs": [
    "hiring Python developer",
    "Python developer job opening",
    "looking for Python engineer",
    "Python developer remote job",
  ],

  // ── Django ──
  "Django freelance leads": [
    "looking for a Django developer",
    "need a freelance Django dev",
    "hiring Django developer",
    "need Django freelancer",
  ],
  "Django jobs": [
    "hiring Django developer",
    "Django developer job opening",
    "looking for Django engineer",
    "Django developer remote job",
  ],

  // ── Laravel ──
  "Laravel freelance leads": [
    "looking for a Laravel developer",
    "need a freelance Laravel dev",
    "hiring Laravel developer",
    "need Laravel PHP freelancer",
  ],
  "Laravel jobs": [
    "hiring Laravel developer",
    "Laravel developer job opening",
    "looking for Laravel engineer",
    "Laravel developer remote job",
  ],

  // ── Flutter ──
  "Flutter freelance leads": [
    "looking for a Flutter developer",
    "need a freelance Flutter dev",
    "hiring Flutter developer",
    "need Flutter app developer",
  ],
  "Flutter jobs": [
    "hiring Flutter developer",
    "Flutter developer job opening",
    "looking for Flutter engineer",
    "Flutter mobile developer remote",
  ],

  // ── React Native ──
  "React Native freelance leads": [
    "looking for a React Native developer",
    "need a freelance React Native dev",
    "hiring React Native developer",
    "need React Native app developer",
  ],
  "React Native jobs": [
    "hiring React Native developer",
    "React Native developer job opening",
    "looking for React Native engineer",
    "React Native developer remote job",
  ],

  // ── Full Stack ──
  "Full Stack freelance leads": [
    "looking for a full stack developer",
    "need a freelance full stack dev",
    "hiring full stack developer",
    "need someone to build my web app",
    "need full stack freelancer",
  ],
  "Full Stack jobs": [
    "hiring full stack developer",
    "full stack developer job opening",
    "looking for full stack engineer",
    "full stack developer remote job",
  ],

  // ── Frontend ──
  "Frontend freelance leads": [
    "looking for a frontend developer",
    "need a freelance frontend dev",
    "hiring frontend developer",
    "need someone to build my UI",
    "need frontend freelancer",
  ],
  "Frontend jobs": [
    "hiring frontend developer",
    "frontend developer job opening",
    "looking for frontend engineer",
    "frontend developer remote job",
  ],

  // ── Backend ──
  "Backend freelance leads": [
    "looking for a backend developer",
    "need a freelance backend dev",
    "hiring backend developer",
    "need someone to build my API",
    "need backend freelancer",
  ],
  "Backend jobs": [
    "hiring backend developer",
    "backend developer job opening",
    "looking for backend engineer",
    "backend developer remote job",
  ], 

  // video editor
   "YouTube freelance leads": [
    "looking for a YouTube video editor",
    "need someone to edit my YouTube videos",
    "hiring YouTube editor",
    "need a freelance YouTube editor",
    "need video editor for my YouTube channel",
  ],
  "YouTube jobs": [
    "hiring YouTube video editor",
    "YouTube editor job opening",
    "looking for YouTube video editor",
    "YouTube editor remote job",
    "video editor needed for YouTube channel",
  ],
 
  "Reels freelance leads": [
    "looking for a Reels editor",
    "need someone to edit my Instagram Reels",
    "hiring Reels video editor",
    "need a freelance Reels editor",
    "need editor for my Reels content",
  ],
  "Reels jobs": [
    "hiring Reels editor",
    "Reels editor job opening",
    "looking for Instagram Reels editor",
    "Reels video editor remote job",
    "social media editor needed for Reels",
  ],
 
  "Shorts freelance leads": [
    "looking for a Shorts editor",
    "need someone to edit my YouTube Shorts",
    "hiring Shorts video editor",
    "need a freelance Shorts editor",
    "need editor for short form content",
  ],
  "Shorts jobs": [
    "hiring Shorts editor",
    "Shorts editor job opening",
    "looking for YouTube Shorts editor",
    "Shorts video editor remote job",
    "short form video editor needed",
  ],
 
  "Podcast freelance leads": [
    "looking for a podcast editor",
    "need someone to edit my podcast",
    "hiring podcast video editor",
    "need a freelance podcast editor",
    "need editor for podcast episodes",
  ],
  "Podcast jobs": [
    "hiring podcast editor",
    "podcast editor job opening",
    "looking for podcast video editor",
    "podcast editor remote job",
    "audio video editor needed for podcast",
  ],
 
  "Motion Graphics freelance leads": [
    "looking for a motion graphics designer",
    "need someone to create motion graphics",
    "hiring motion graphics editor",
    "need a freelance motion graphics artist",
    "need motion graphics for my videos",
    "looking for animator for my content",
  ],
  "Motion Graphics jobs": [
    "hiring motion graphics designer",
    "motion graphics job opening",
    "looking for motion graphics artist",
    "motion graphics designer remote job",
    "motion designer needed for video content",
  ],
}

export function generateQueries(niche: string): string[] {
  const queries = nicheQueries[niche]

  if (!queries) {
    console.warn("No queries found for:", niche)
    return []
  }

  console.log("Generating queries", queries)
  return queries  
}

const FetchNEws = tool({
    name: 'Fetch_Tweets',
    description: 'Fetch Tweets from the apify api based on the keywords provided',
    parameters: z.object({
    keywords: z.string().describe("Pass the EXACT all the keyword user provided. Do not rephrase, translate, or infer. If user said 'Video-Editor', pass 'Video-Editor' also if leads keyword provided pass as it as do not change or delete."),
        MaxResult: z.number().describe("Maximum results of the tweets ").max(20)
    }),


    execute: async function ({keywords , MaxResult}) {

        console.log("KeyWords" , keywords)

        const since = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString().split('T')[0] // 48 hours
        
        // adding since in the array 
        const searchTermss = generateQueries(keywords).map(
            qurey => `${qurey} since:${since}`
        )

    try {

      // THis is an SDK apporach (it is not working in prod (vercel) due to bundling promblems)
            // const client = new ApifyClient({
            //     token: process.env.APIFY_API_TOKEN
            // })
    

        //     // starts an actor

            
        //     // actor url (which had to run)
        //     const run = await client.actor('kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest').call({
        //     searchTerms: [...searchTermss , keywords],
            
        //     maxItems: MaxResult,
        //     queryType: 'Latest',
            
        //  // since lastest tweets
        //     })
    
        //     // get results from the actors database 
        //     const {items} = await client.dataset(run.defaultDatasetId).listItems()
    
        //     console.log(items)


        // Request the APi
       console.log("Searching for this quires" , searchTermss , keywords);


        const res = await axios.post(`https://api.apify.com/v2/acts/kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest/run-sync-get-dataset-items?token=${process.env.APIFY_API_TOKEN}`, {
          searchTerms: [...searchTermss , keywords],
          maxItems: MaxResult,
          qureyType: 'Latest'
        })
        
const items = res.data.filter((tweet: any) => tweet.type !== 'mock_tweet')


        if (items.length === 0) {
  console.log("No real tweets found");
  return [];
}
        console.log("Query ran successfully!" , items)

// removing all the other fields
const cleanedTweets = items.map((tweet: any) => ({
    text: tweet.text,
    id: tweet.id,
    username: tweet.author?.userName,
    url: tweet.url,
  }))

  return cleanedTweets // sending it to open ai 

    } catch (error) {
        console.log("Error while getting tweets" , error)
        return error
        }    }
})

export default FetchNEws 


