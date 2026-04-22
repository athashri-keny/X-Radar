import { NextResponse , NextRequest } from "next/server";
import DBConnect from "@/lib/connectdb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import SearchRunModel from "@/models/SearchRun";
import LeadsModel from "@/models/leads";
import axios from "axios";
import { run } from "@openai/agents";
import { ScorerAgent } from "@/agents/TweetFetcherAgent";
import mongoose from "mongoose";
import { Client } from "@upstash/qstash"

const client = new Client({token: process.env.QSTASH_TOKEN})


export async function GET(request: NextRequest) {
    try {
        

        await DBConnect()

          const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Please login!" }, { status: 401 });
    }

    // getting the search from the url 
      const searchRunId = request.nextUrl.searchParams.get("searchRunId");
    if (!searchRunId) {
      return NextResponse.json({ message: "searchRunId required" }, { status: 400 });
    }   

        // find the request in Db
        const SearchRun = await SearchRunModel.findById(searchRunId)
        if (!SearchRun) {        
  return NextResponse.json({ message: "Run Id not found" }, { status: 404 });
        }


    // 4. Check the current status of the run id 
    const ApifyStatus = await axios.get(`https://api.apify.com/v2/actor-runs/${SearchRun.ApifyRunId}?token=${process.env.APIFY_API_TOKEN}`)

    // console.log("Apify Status = " , ApifyStatus.data)

    // TODO: might be error in this 
        const runStatus = ApifyStatus.data.data.status;

     // 5. Apify still running — tell frontend to keep polling
    if (runStatus !== "SUCCEEDED") {
      return NextResponse.json({ status: "pending" }, { status: 200 });
    }

     // 6. Apify done! Fetch the results
    const res = await axios.get(
      `https://api.apify.com/v2/actor-runs/${SearchRun.ApifyRunId}/dataset/items?token=${process.env.APIFY_API_TOKEN}`
    );
    
    
     const items = res.data.filter((tweet: any) => {

 return tweet.id !== -1 && tweet.type !== 'mock_tweet'
         })        
           console.log("Query ran successfully!" , items)


           
          //  removing all the other fields
const cleanedTweets = items.map((tweet: any) => ({
    text: tweet.text,
    id: tweet.id,
    username: tweet.author?.userName,
    url: tweet.url,
  }))

//   TODO: Add the fallback logic for the paid users if they search for 24 hours and less than 5 leads came up then search for last 7 days
//   EG: - 
//   if (leads.length < 5) {
//   leads = await searchTweets({ days: 7 })
//   fallbackUsed = true
// }


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
        SearchRunId: SearchRun._id,
        userId: new mongoose.Types.ObjectId(session.user._id),
        Tweeturl: lead.tweetUrl,
        TweetText: lead.tweetText,
        Score: lead.score,             
       suggestedReply: lead.suggestedReply  
       })
       await newLead.save()
        savedLeads.push(newLead)
      }

      SearchRun.status = 'done'
      await SearchRun.save()
    

      // setting up the (Qstash) for Send an email when the cooldown timer ends
         await client.publishJSON({
            url: 'https://xradar.in/api/notify-cooldown',
            body: {userId: session.user._id , Email: session.user.email , Name: session.user.name},
            delay: 86400 
        })


          return NextResponse.json(
      { status: "done", leads: savedLeads },
      { status: 200 }
    );
        

    } catch (error) {
        console.log("Error while getting the status " , error)
        return NextResponse.json({
            message: "Error while getting the request"
        } , {status: 500})
    }
}