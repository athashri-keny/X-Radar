export const runtime = "nodejs";

import DBConnect from "../../../lib/connectdb";
import { NextRequest, NextResponse } from "next/server";
import { ScorerAgent } from "../../../agents/TweetFetcherAgent";
import { run } from "@openai/agents";
import SearchRunModel from "../../../models/SearchRun";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { generateQueries } from "@/helpers/NicheQuries";
import axios from "axios";
import LeadsModel from "@/models/leads";
import { Client } from "@upstash/qstash"


const client = new Client({token: process.env.QSTASH_TOKEN})



 export async function POST(request: NextRequest) {
    try {
        // Validate required environment variables
        if (!process.env.APIFY_API_TOKEN) {
            console.error("Missing APIFY_API_TOKEN environment variable")
            return NextResponse.json({
                message: "Server configuration error: Missing APIFY_API_TOKEN"
            }, {status: 500})
        }

        if (!process.env.OPENAI_API_KEY) {
            console.error("Missing OPENAI_API_KEY environment variable")
            return NextResponse.json({
                message: "Server configuration error: Missing OPENAI_API_KEY"
            }, {status: 500})
        }

        await DBConnect()

        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return NextResponse.json({
                message: "this is a protected route plz login!"
            } , {status: 404})
        }

        const {keywords} = await request.json()

        console.log( "keywords" , keywords)
        
        if (!keywords) {
            return NextResponse.json({
                message: "Error keywords required!"
            } , {status: 404})
        }

       const NewSearchRunModel = new SearchRunModel({
         UserId: new mongoose.Types.ObjectId(session.user._id),
         keywords: keywords,
         status: 'pending',
         LastRun: Date.now()
       })

       await NewSearchRunModel.save()
       
        console.log("KeyWords" , keywords)


        const since = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 4 days

         // adding since (time) in the array
          const searchTermss = generateQueries(keywords).map(
                     qurey => `${qurey} since:${since}`
                 )
             
    try {
        
 console.log("Searching for this quires" , searchTermss , keywords);

  const res = await axios.post(`https://api.apify.com/v2/acts/kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest/run-sync-get-dataset-items?token=${process.env.APIFY_API_TOKEN}`, {
           searchTerms: [...searchTermss],
           maxItems: 80,
           qureyType: 'Latest'
         })

    
         const items = res.data.filter((tweet: any) => {
        
  tweet.id !== -1 && tweet.type !== 'mock_tweet'

           return (
    (tweet.likeCount ?? 0) < 20 &&          // not already viral
    (tweet.replyCount ?? 0) < 15 &&           // low replies = less competition
    (tweet.viewCount ?? 0) < 2000 &&          // fresh/unseen tweet
    tweet.isReply !== true &&                 // skip reply tweets
    (tweet.lang === 'en' || !tweet.lang)      // english only
  )
         })

        

           console.log("Query ran successfully!" , items)


          //  removing all the other fields
const cleanedTweets = items.map((tweet: any) => ({
    text: tweet.text,
    id: tweet.id,
    username: tweet.author?.userName,
    url: tweet.url,
  }))


//   // giving cleaned tweet to open ai for filtering and lead scoring 
console.log("Calling ScorerAgent with", cleanedTweets.length, "tweets")

   try {
     const result = await run(ScorerAgent , JSON.stringify(cleanedTweets))
     const AgentOutPut = result.finalOutput ?? ""

     console.log("raw output from agent type = " ,  typeof AgentOutPut) // string
     console.log("Agent raw output:", AgentOutPut)

     const jsonMatch = AgentOutPut.match(/\[[\s\S]*\]/) 
     
     if (!jsonMatch) {
       throw new Error("Agent didn't return a valid JSON array. Raw output: " + AgentOutPut)
     }

      // loop cause agent will return an array objects of leads

      // changing the string which contains arrray of objects to real array of object to store in db
      const leads = JSON.parse(jsonMatch[0])

      // creating an array for saving the leads
      const savedLeads: any[] = []

      // running loop
      for(const lead of leads) {

       const newLead = new LeadsModel({
        SearchRunId: NewSearchRunModel._id,
        userId: new mongoose.Types.ObjectId(session.user._id),
        Tweeturl: lead.tweetUrl,
        TweetText: lead.tweetText,
        Score: lead.score,             
       suggestedReply: lead.suggestedReply  
       })
       await newLead.save()
        savedLeads.push(newLead)
      }

      NewSearchRunModel.status = 'done'
      await NewSearchRunModel.save()
    

      // setting up the (Qstash) for Send an email when the cooldown timer ends
         await client.publishJSON({
            url: 'https://xradar.in/api/notify-cooldown',
            body: {userId: session.user._id , Email: session.user.email , Name: session.user.name},
            delay: 86400 
        })
        

   return NextResponse.json({
    message: "Agent ran successfully" , 
    leads: savedLeads
   } , {status: 200})

   } catch (agentError) {
      console.error("Error while running agent:", agentError instanceof Error ? agentError.message : String(agentError))
      console.error("Full error:", agentError)
      NewSearchRunModel.status = 'failed'
      await NewSearchRunModel.save()
      return NextResponse.json({
         message: "Error while running agent: " + (agentError instanceof Error ? agentError.message : String(agentError)),
         error: process.env.NODE_ENV === 'development' ? agentError : undefined
      } , {status: 500})
   }

       } catch (apifyError) {
        console.error("Error while running Apify:", apifyError instanceof Error ? apifyError.message : String(apifyError))
        console.error("Full Apify error:", apifyError)
        NewSearchRunModel.status = 'failed'
        await NewSearchRunModel.save()
     return NextResponse.json({
         message: "Error while running Apify: " + (apifyError instanceof Error ? apifyError.message : String(apifyError)),
         error: process.env.NODE_ENV === 'development' ? apifyError : undefined
      } , {status: 500})
       }

       // running the agent with the keyworrd

//    try {
//     // agent (not quires)
//       const result =  await run(ScorerAgent , keywords)
 
//       // array of object
//        const rawOutput = result.finalOutput ?? ""

//        console.log("raw output from agent type = " ,  typeof rawOutput) // string

//        const jsonMatch = rawOutput.match(/\[[\s\S]*\]/) 
       
//        if (!jsonMatch) {
//   throw new Error("Agent didn't return a valid JSON array")
// }

//       // loop cause agent will return an array objects of leads

//       // changing the string which contains arrray of objects to real array of object to store in db
//       const leads = JSON.parse(jsonMatch[0])

//       // creating an array for saving the leads
//       const savedLeads: any[] = []

//       for(const lead of leads) {

//        const newLead = new LeadsModel({
//         SearchRunId: NewSearchRunModel._id,
//         userId: new mongoose.Types.ObjectId(session.user._id),
//         Tweeturl: lead.tweetUrl,
//         TweetText: lead.tweetText,
//         Score: lead.score,             
//        suggestReplyAi: lead.suggestedReply  
//        })
//        await newLead.save()
//         savedLeads.push(newLead)
//       }

//       NewSearchRunModel.status = 'done'
//       await NewSearchRunModel.save()
    
//      return NextResponse.json({
//         message: "your agent run successfully!",
//        leads: savedLeads
//      } , {status: 200})

//    } catch (error) {

//      console.log("error while running the agent" , error)
//     NewSearchRunModel.status = 'failed'

//     await NewSearchRunModel.save()

//       return NextResponse.json({
//         message: "Error while running agent",       
      
//      } , {status: 500})
     // }
    
    } catch (error) {
        console.error("Error in main route handler:", error instanceof Error ? error.message : String(error))
        console.error("Full error:", error)
        
        return NextResponse.json({
            message: "Error while running the agent: " + (error instanceof Error ? error.message : String(error)),
            error: process.env.NODE_ENV === 'development' ? error : undefined
        } , {status: 500})
    }
}