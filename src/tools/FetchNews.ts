import { tool, Tool } from "@openai/agents";
import { ApifyClient } from "apify-client";
import z from "zod";
import 'dotenv/config.js'


const FetchNEws = tool({
    name: 'Fetch_News',
    description: 'Fetch news from the apify api based on the keywords provided',
    parameters: z.object({
        keyword: z.string().describe("The search keyword to find tweets"),
        MaxResult: z.number().describe("Maximum results of the tweets ").max(20)
    }),
    execute: async function ({keyword , MaxResult}) {

        console.log("KeyWords" , keyword)

    try {
            const client = new ApifyClient({
                token: process.env.APIFY_API_TOKEN
            })
    
            // starts an actor
            const run = await client.actor('kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest').call({
            searchTerms: [keyword],
            maxItems: MaxResult,
            queryType: 'Latest'
            })
    
            // get results from the actors database 
            const {items} = await client.dataset(run.defaultDatasetId).listItems()
    
            console.log(items)
            return items
          
    } catch (error) {
        console.log("Error while getting tweets" , error)
        return error
    }
    }
})

export default FetchNEws