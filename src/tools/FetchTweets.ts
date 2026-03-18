import { tool, Tool } from "@openai/agents";
import { ApifyClient } from "apify-client";
import z from "zod";
import 'dotenv/config.js'
import { queries } from "@/agents/TweetFetcherAgent";




const FetchNEws = tool({
    name: 'Fetch_Tweets',
    description: 'Fetch Tweets from the apify api based on the keywords provided',
    parameters: z.object({
        keywords: z.string().describe("Use the EXACT user input keyword without modification"),
        MaxResult: z.number().describe("Maximum results of the tweets ").max(20)
    }),
    execute: async function ({keywords , MaxResult}) {
        console.log("KeyWords" , keywords)


    try {
            const client = new ApifyClient({
                token: process.env.APIFY_API_TOKEN
            })
    

            // starts an actor
            console.log("Searching for this quires" , queries , keywords);
            
            const run = await client.actor('kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest').call({
            searchTerms: [...queries , keywords],
            maxItems: MaxResult,
            queryType: 'Latest',
        
             since: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString().split('T')[0] // last 48 hours
            })
    
            // get results from the actors database 
            const {items} = await client.dataset(run.defaultDatasetId).listItems()
    
            console.log(items)
            

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
    }
    }
})

export default FetchNEws 


