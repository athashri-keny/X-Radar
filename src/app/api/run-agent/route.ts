import DBConnect from "../../../lib/connectdb";
import { NextRequest, NextResponse } from "next/server";
import { ScorerAgent } from "../../../agents/TweetFetcherAgent";
import { run } from "@openai/agents";
import SearchRunModel from "../../../models/SearchRun";
import mongoose from "mongoose";



 export async function POST(request: NextRequest) {
    try {


        await DBConnect()

        // const session = await getServerSession(authOptions)
        // if (!session || !session.user) {
        //     return NextResponse.json({
        //         message: "this is a protected route plz login!"
        //     } , {status: 404})
        // }

        const {keywords} = await request.json()
        
        if (!keywords) {
            return NextResponse.json({
                message: "Error keywords required!"
            } , {status: 404})
        }

       const NewSearchRunModel = new SearchRunModel({
         UserId: new mongoose.Types.ObjectId("69bad90f6a937ff303866bcf"),
         keywords: keywords,
         status: 'pending'
       })

       await NewSearchRunModel.save()

       // running the agent with the keyworrd

   try {
    // agent (not quires)
      const result =  await run(ScorerAgent , keywords)
 
      const finalOutputt =  result.finalOutput
      console.log(result.finalOutput)

      NewSearchRunModel.status = 'done'
      await NewSearchRunModel.save()
    
     return NextResponse.json({
        message: "your agent run successfully!",
       finalOutputt
     } , {status: 200})

   } catch (error) {
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