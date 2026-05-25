export const runtime = "nodejs";

import DBConnect from "../../../lib/connectdb";
import { NextRequest, NextResponse } from "next/server";
import SearchRunModel from "../../../models/SearchRun";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { generateQueries } from "@/helpers/NicheQuries";
import axios from "axios";



// THIS ROUTE GI  VES SEARCHID TO FRONTEND FOR POLLLING

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


        // console.log( "keywords" , keywords , "Timeperiod"  , TimePeriod)
        
        if (!keywords || !TimePeriod) {
            return NextResponse.json({
                message: "Error keywords required!"
            } , {status: 404})
        }


        // TODO: uncommit this when depolying to prod

        // finding the last run searched by the user.
        const lastRun = await SearchRunModel.findOne({
  UserId: new mongoose.Types.ObjectId(session.user._id),
  status: 'done'
}).sort({ LastRun: -1 }) // most recent first




// for Free user hitting the paywall after first run 
if (lastRun && session.user.plan === 'free') {
return NextResponse.json({
  message: "Error! YOu have reached Maximun of your limit Uprade to Pro to keep using Xradar"
} , {status: 403})
}


// for paid user hiting the cooldown timer 

const hoursSinceLastRun = (Date.now() - new Date(lastRun.LastRun).getTime()) / (1000 * 60 * 60)
if (hoursSinceLastRun < Math.ceil(6) && session.user.plan == 'pro') {

   const hoursLeft = Math.ceil(6 - hoursSinceLastRun)

  return NextResponse.json({
    messsage: ` Error! Cooldown Active Try Again in ${hoursLeft} hours`
  } , {status: 429})
}
    

     // Creating a new Search Model with status 'pending' for (fire and poll method)
       const NewSearchRunModel = new SearchRunModel({
         UserId: new mongoose.Types.ObjectId(session.user._id),
         keywords: keywords,
         status: 'pending', // PENDING
         LastRun: Date.now(),
         TotalTweetsScraped: 0,
         TotalLeadsFound: 0,
       })

       await NewSearchRunModel.save()
       

        console.log("KeyWords" , keywords)

      
        const now = Math.floor(Date.now() / 1000)


        
const searchTermss = generateQueries(keywords).map((singleQurey: any) => {


    if (TimePeriod === '24') {
  return `${singleQurey} within_time:24h -filter:retweets lang:en`

} else if (TimePeriod === '6') {
  return `${singleQurey} within_time:6d -filter:retweets lang:en`

} else {
  // free: 8 days window
 const since = new Date(now * 1000 - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 10 days
const until = new Date(now * 1000 - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 7 days 

return `${singleQurey} since:${since} until:${until} -filter:retweets lang:en`
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
           maxItems: 15,
          queryType: 'Latest',
         })

        //  console.log("Apify  =" , res.data)
           
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