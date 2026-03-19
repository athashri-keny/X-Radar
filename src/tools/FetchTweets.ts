import { tool } from "@openai/agents";
import z from "zod";
import 'dotenv/config'
import { ApifyClient } from "apify-client";


export function generateQueries(niche: string) {
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
        keywords: z.string().describe("Use the EXACT user input keyword without modification"),
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


