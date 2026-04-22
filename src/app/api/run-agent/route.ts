export const runtime = "nodejs";

import DBConnect from "../../../lib/connectdb";
import { NextRequest, NextResponse } from "next/server";
import SearchRunModel from "../../../models/SearchRun";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { generateQueries } from "@/helpers/NicheQuries";
import axios from "axios";



// THIS ROUTE GIVES SEARCHID TO FRONTEND FOR POLLLING

 export async function POST(request: NextRequest) {
    try {


        await DBConnect()

        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return NextResponse.json({
                message: "this is a protected route plz login!"
            } , {status: 404})
        }

        const {keywords , TimePeriod} = await request.json()

        console.log( "keywords" , keywords , "Timeperiod"  , TimePeriod)
        
        if (!keywords || !TimePeriod) {
            return NextResponse.json({
                message: "Error keywords required!"
            } , {status: 404})
        }


        // finding the last run searched by the user.
        const lastRun = await SearchRunModel.findOne({
  UserId: new mongoose.Types.ObjectId(session.user._id),
  status: 'done'
}).sort({ LastRun: -1 }) // most recent first


// // 2. Check cooldown
// if (lastRun) {

//   const hoursSinceLastRun = (Date.now() - new Date(lastRun.LastRun).getTime()) / (1000 * 60 * 60)
  
//   if (hoursSinceLastRun < 24) {
//     const hoursLeft = Math.ceil(24 - hoursSinceLastRun)
//     return NextResponse.json({
//       message: `Cooldown active. Try again in ${hoursLeft} hour(s).`
//     }, { status: 429 }) // 429 = Too Many Requests, more accurate than 404
//   }
// }

     // Creating a new Search Model with status 'pending' for (fire and poll method)
       const NewSearchRunModel = new SearchRunModel({
         UserId: new mongoose.Types.ObjectId(session.user._id),
         keywords: keywords,
         status: 'pending', // PENDING
         LastRun: Date.now()
       })

       await NewSearchRunModel.save()
       
        console.log("KeyWords" , keywords)

      
        // const since = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 6 days
      
        const now = Math.floor(Date.now() / 1000)
const oneDaySeconds = 24 * 60 * 60
  
          const since = now - (7 * oneDaySeconds)
    const until = now - (2 * oneDaySeconds)
 

         const timeFilter = "within_time:7d"; // its return all 7days tweets including 24hrs too (paid plan)

const searchTermss = keywords.map( (singleQurey: any) => {
    if (TimePeriod == '24') {
        return `${singleQurey} ${timeFilter} -filter:retweets lang:en`
    } else {
      return `${singleQurey} since_time:${since} until_time:${until} -filter:retweets lang:en`
    }
})

// console.log("SearchTerms returnd" , searchTermss)
// return NextResponse.json({
//     message: "returned",
//     searchTermss
// } , {status: 200})

    try {
        
 console.log("Searching for this quires" , searchTermss , keywords);

 // fires async dont wait for the result
  const res = await axios.post(`https://api.apify.com/v2/acts/kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest/runs?token=${process.env.APIFY_API_TOKEN}`, {
           searchTerms: [...searchTermss],
           maxItems: 80,
           qureyType: 'Latest'
         })

         console.log("Apify  =" , res.data)
           
         // TODO: check this might be error 
         // for tracking (finiesh or not)
         const apifyRunId = res.data?.data?.id 

         // saving the apifyrun Id 
        NewSearchRunModel.ApifyRunId = apifyRunId
        await NewSearchRunModel.save()

        // giving the search run id to frontend for check the status for this particular run request
         return NextResponse.json(
      { message: "Search started!", searchRunId: NewSearchRunModel._id },
      { status: 200 }
    );

  } catch (error) {
        console.log("Error while running apfiy" , error) 
        NewSearchRunModel.status = 'failed'
        await NewSearchRunModel.save()
     return NextResponse.json({
         message: "Error while running agent",       
      
      } , {status: 500})
       }
}
  catch (error) {        // ← add this outer catch
    console.log("Outer error", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}