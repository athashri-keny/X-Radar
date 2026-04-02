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




 export async function POST(request: NextRequest) {
    try {


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
         status: 'pending'
       })

       await NewSearchRunModel.save()
       
        console.log("KeyWords" , keywords)

         const since = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString().split('T')[0] // 48 hours        

         // adding since (time) in the array
          const searchTermss = generateQueries(keywords).map(
                     qurey => `${qurey} since:${since}`
                 )
             
       try {
        
 console.log("Searching for this quires" , searchTermss , keywords);

  const res = await axios.post(`https://api.apify.com/v2/acts/kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest/run-sync-get-dataset-items?token=${process.env.APIFY_API_TOKEN}`, {
           searchTerms: [...searchTermss , keywords],
           maxItems: 80,
           qureyType: 'Latest'
         })

         const items = res.data.filter((tweet: any) => {

           return (
    (tweet.likeCount ?? 0) < 100 &&          // not already viral
    (tweet.replyCount ?? 0) < 10 &&           // low replies = less competition
    (tweet.viewCount ?? 0) < 1000 &&          // fresh/unseen tweet
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


  // giving cleaned tweet to open ai for filtering and lead scoring 
   const result = await run(ScorerAgent , JSON.stringify(cleanedTweets))

   const AgentOutPut = result.finalOutput ?? ""


    console.log("raw output from agent type = " ,  typeof AgentOutPut) // string

       const jsonMatch = AgentOutPut.match(/\[[\s\S]*\]/) 
       
       if (!jsonMatch) {
  throw new Error("Agent didn't return a valid JSON array")
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
    

   return NextResponse.json({
    message: "Agent ran successfully" , 
    leads: savedLeads
   } , {status: 200})

       } catch (error) {
        
        console.log("Error while running apfiy" , error) 
        NewSearchRunModel.status = 'failed'
        await NewSearchRunModel.save()

     return NextResponse.json({
         message: "Error while running agent",       
      
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
        console.log("Error while running the agent " , error)
        return NextResponse.json({
            message: "Error while runnung the agent"
        } , {status: 500})
    }
}