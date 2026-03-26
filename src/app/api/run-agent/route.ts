export const runtime = "nodejs";

import DBConnect from "../../../lib/connectdb";
import { NextRequest, NextResponse } from "next/server";
import { ScorerAgent } from "../../../agents/TweetFetcherAgent";
import { run } from "@openai/agents";
import SearchRunModel from "../../../models/SearchRun";
import mongoose from "mongoose";
import LeadsModel from "@/models/leads";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

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

       // running the agent with the keyworrd

   try {
    // agent (not quires)
      const result =  await run(ScorerAgent , keywords)
 
      // array of object
       const rawOutput = result.finalOutput ?? ""

       console.log("raw output from agent type = " ,  typeof rawOutput) // string

       const jsonMatch = rawOutput.match(/\[[\s\S]*\]/) 
       
       if (!jsonMatch) {
  throw new Error("Agent didn't return a valid JSON array")
}

      // loop cause agent will return an array objects of leads

      // changing the string which contains arrray of objects to real array of object to store in db
      const leads = JSON.parse(jsonMatch[0])

      // creating an array for saving the leads
      const savedLeads: any[] = []

      for(const lead of leads) {

       const newLead = new LeadsModel({
        SearchRunId: NewSearchRunModel._id,
        userId: new mongoose.Types.ObjectId(session.user._id),
        Tweeturl: lead.tweetUrl,
        TweetText: lead.tweetText,
        Score: lead.score,             
       suggestReplyAi: lead.suggestedReply  
       })
       await newLead.save()
        savedLeads.push(newLead)
      }

      NewSearchRunModel.status = 'done'
      await NewSearchRunModel.save()
    
     return NextResponse.json({
        message: "your agent run successfully!",
       leads: savedLeads
     } , {status: 200})

   } catch (error) {

     console.log("error while running the agent" , error)
    NewSearchRunModel.status = 'failed'

    await NewSearchRunModel.save()

      return NextResponse.json({
        message: "Error while running agent",       
      
     } , {status: 500})
   }
    
    } catch (error) {
        console.log("Error while running the agent " , error)
        return NextResponse.json({
            message: "Error while runnung the agent"
        } , {status: 500})
    }
}