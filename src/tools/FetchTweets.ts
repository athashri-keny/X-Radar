import { tool } from "@openai/agents";
import z from "zod";
import 'dotenv/config'
import axios from "axios";




const nicheQueries: Record<string, string[]> = {
  'video-editor': [
    'looking for a video editor',
    'need video editing help',
    'hiring video editor',
    'need someone to edit my videos',
    'looking for YouTube video editor',
    'need reels editor',
    'short form video editor needed',
  ],
  'developer': [
    'looking for a developer',
    'need a freelance dev',
    'hiring a React developer',
    'need someone to build my website',
    'looking for Next.js developer',
    'need a full stack developer',
    'hiring frontend developer',
  ],
  // 'social-media': [
  //   'looking for a social media manager',
  //   'need someone to manage my Instagram',
  //   'hiring social media manager',
  //   'need help with content creation',
  //   'looking for SMM freelancer',
  //   'need someone to grow my Twitter',
  //   'hiring content creator',
  // ],
  'copywriter': [
  'looking for a copywriter',
  'need someone to write copy',
  'hiring copywriter',
  'need email copywriter',
  'looking for landing page copywriter',
  'need sales page writer',
  'hiring UX writer',
],
'designer': [
  'looking for a UI designer',
  'need a UX designer',
  'hiring product designer',
  'need someone to design my app',
  'looking for Figma designer',
  'need landing page design',
  'hiring graphic designer',
],
'ghostwriter': [
  'looking for a ghostwriter',
  'need someone to write my tweets',
  'hiring ghostwriter',
  'need LinkedIn ghostwriter',
  'looking for content ghostwriter',
  'need someone to write my newsletter',
  'hiring Twitter ghostwriter',
]
}

export function generateQueries(niche: string): string[] {

const key = niche.toLowerCase().trim()

if (key.includes('video') || key.includes('reel') || key === 'video editor' || key.includes('youtube editor'))
  return nicheQueries['video-editor']

if (key.includes('dev') || key.includes('code') || key.includes('react') || 
    key.includes('next.js') || key.includes('frontend') || key.includes('backend') || 
    key.includes('fullstack'))
  return nicheQueries['developer']

// Social Media
if (key.includes('social') || key.includes('smm') || key.includes('instagram') || 
    key.includes('content'))
  return nicheQueries['social-media']

// Copywriter - replaced bare 'email' with 'email copy'
if (key.includes('copy') || key.includes('copywriter') || key.includes('landing page') || 
    key.includes('email copy'))
  return nicheQueries['copywriter']

// Designer - replaced bare 'ui' with 'ui design'
if (key.includes('design') || key.includes('ui design') || key.includes('ux') || 
    key.includes('figma'))
  return nicheQueries['designer']

// Ghostwriter
if (key.includes('ghost') || key.includes('tweet') || key.includes('newsletter') || 
    key.includes('linkedin'))
  return nicheQueries['ghostwriter']

console.log("Genenrating qureis " , niche)

  // fall back for unknown niches
  return [
    `looking for a freelance ${niche}`,
    `need a ${niche}`,
    `hiring a ${niche}`,
    `looking for ${niche} help`,
  ]
}

const FetchNEws = tool({
    name: 'Fetch_Tweets',
    description: 'Fetch Tweets from the apify api based on the keywords provided',
    parameters: z.object({
    keywords: z.string().describe("Pass the EXACT string the user provided. Do not rephrase, translate, or infer. If user said 'Video-Editor', pass 'Video-Editor'."),
        MaxResult: z.number().describe("Maximum results of the tweets ").max(20)
    }),
    execute: async function ({keywords , MaxResult}) {

       // Dynamic import at runtime — forces Node.js to resolve it properly
    const { ApifyClient } = await import('apify-client')
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

  return cleanedTweets

    } catch (error) {
        console.log("Error while getting tweets" , error)
        return error
        }    }
})

export default FetchNEws 


