import { tool } from "@openai/agents";
import z from "zod";
import 'dotenv/config'
// import { ApifyClient } from "apify-client";
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
  'social-media': [
    'looking for a social media manager',
    'need someone to manage my Instagram',
    'hiring social media manager',
    'need help with content creation',
    'looking for SMM freelancer',
    'need someone to grow my Twitter',
    'hiring content creator',
  ],
}

export function generateQueries(niche: string): string[] {

  const key = niche.toLowerCase().trim()

  if (key.includes('video')) return nicheQueries['video-editor']
  if (key.includes('dev') || key.includes('code')) return nicheQueries['developer']
  if (key.includes('social') || key.includes('smm')) return nicheQueries['social-media']

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

            const { ApifyClient } = await import('apify-client')
        console.log("KeyWords" , keywords)

        const since = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString().split('T')[0] // 48 hours
        
        // adding since in the array 
        const searchTermss = generateQueries(keywords).map(
            qurey => `${qurey} since:${since}`
        )

    try {
            const client = new ApifyClient({
                token: process.env.APIFY_API_TOKEN
            })
    

            // starts an actor
            console.log("Searching for this quires" , searchTermss , keywords);
            
            // actor url (which had to run)
            const run = await client.actor('kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest').call({
            searchTerms: [...searchTermss , keywords],
            
            maxItems: MaxResult,
            queryType: 'Latest',
            
         // since lastest tweets
            })
    
            // get results from the actors database 
            const {items} = await client.dataset(run.defaultDatasetId).listItems()
    
            console.log(items)
            
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


