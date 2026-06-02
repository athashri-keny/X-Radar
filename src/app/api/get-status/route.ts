import { NextResponse , NextRequest } from "next/server";
import DBConnect from "@/lib/connectdb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import SearchRunModel from "@/models/SearchRun";
import LeadsModel from "@/models/leads";
import axios from "axios";
import { run } from "@openai/agents";

import mongoose from "mongoose";
import { Client } from "@upstash/qstash"
import { AgentBuilder } from "@/agents/TweetClassfierAgent";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
;

const client = new Client({token: process.env.QSTASH_TOKEN})


// tweet type 
// TODO: if the tweets are not relavent then add author details to it let the openai also filter based on profile
interface Tweet{
  type: string,
  id: string,
  twitterUrl: string,
  text: string
}

export async function GET(request: NextRequest) {
    try {
        
         
      // const clientt = new CloudClient({
      //   apiKey: process.env.CHROMA_API_KEY,
      //   tenant: '9fec734b-369a-41a8-8db9-274e6ee5bee8',
      //   database: 'Xradar'
      // });
      

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

        // 
//         if (SearchRun.status === "filtering") {
//   return NextResponse.json({ status: "filtering" }, { status: 200 });
// }

    // 4. Check the current status of the run id 
    const ApifyStatus = await axios.get(`https://api.apify.com/v2/actor-runs/${SearchRun.ApifyRunId}?token=${process.env.APIFY_API_TOKEN}`)

    console.log("Apify Status = " , ApifyStatus.data)

        const runStatus = ApifyStatus.data.data.status;

     // 5. Apify still running — tell frontend to keep polling
    if (runStatus !== "SUCCEEDED") {
      return NextResponse.json({ status: "pending" }, { status: 200 });
  } 

  // THIS BECOMES SUCCEEDDED AND THIS WILL RUN 

     // 6. Apify done! Fetch the results
    const res = await axios.get(
      `https://api.apify.com/v2/actor-runs/${SearchRun.ApifyRunId}/dataset/items?token=${process.env.APIFY_API_TOKEN}`
    );
    
    const tweets: Tweet[] = res.data
 .filter((raw: any) => raw.type === 'tweet' && raw.id !== -1)

    const TotalTweetsScraped = tweets.length;

    await SearchRunModel.findByIdAndUpdate(
      searchRunId,
      {
        TotalTweetsScraped: TotalTweetsScraped,
         status: "filtering"
      }
    )

    // FROM THIS THE SCRAPER HAS DONE IT JOB AND NOW THIS POINT ITS TIME FOR FILTERING!!!
   
    console.log("Tweets returned from the res.data" , tweets)
  

    // All tweets 
   const items = tweets.map((singleTweet: Tweet) => ({
    id: singleTweet.id,
    twitterUrl: singleTweet.twitterUrl,
    text: singleTweet.text.slice(0 , 300)
   }))

       // filtering the tweets giving only the nessccary value 

    //  const items = tweets.filter((tweet: any) => (
    //  tweet.url &&
    //  tweet.text &&
    //  tweet.id &&
    //   tweet.id !== -1 && tweet.type !== 'mock_tweet'
    //  ))

     // TODO: BUGS TO FIX
     // 1. TOKEN LIMIT OPENAI
     // 2. Filtering issue not going thorugh every tweet


           console.log("Query ran successfully!" , items)

           // filtering the tweets giving only the nessccary value 

           const stringifyTweets = JSON.stringify(items)

           console.log("Stringfy tweets types" , typeof items)
      

           // ADD A AGENT TO FILTER OUT THE DUPLICATE TWEET
           
       

//   TODO: Add the fallback logic for the paid users if they search for 24 hours and less than 5 leads came up then search for last 7 days
//   EG: - 
//   if (leads.length < 5) {
//   leads = await searchTweets({ days: 7 })
//   fallbackUsed = true
// }


  // giving cleaned tweet to open ai for filtering and lead scoring 

  //  const result = await run(ScorerAgent , JSON.stringify(items) , )


    const result = await AgentBuilder.invoke({
    messages: [new SystemMessage(`
       You are an expert tweet classifier agent for a lead generation platform.

You will receive a list of tweets WITH their RAG reference examples and labels from A Vector Database.

CATEGORIES:
- HIRING: A company or recruiter is OFFERING a job, role, or position
- SELF_PROMO: Person promoting their own product, service, or work
- SCAM: Suspicious, spam, or get-rich-quick tweets

MAJORITY VOTE RULE:
- Each tweet comes with 3 reference examples from the database
- NEVER EVER SKIP A TWEET GO THROUGH EACH TWEET AND CLASSIFY IT
- Count the labels: [hiring_tweet, hiring_tweet, not_hiring] → HIRING
- Count the labels: [not_hiring, not_hiring, hiring_tweet] → NOT HIRING
- If tie → use your own judgment based on tweet content

SUGGESTED REPLY RULES:
- ONLY generate a suggestedReply for HIRING tweets
- ONLY return tweets classified as HIRING
- Replies should be casual, friendly and show genuine interest
- Never write formal or robotic replies
- SCORE based on Cordorniates came from the Vector Db
        `),
    new HumanMessage(
        `
          Classify these tweets: ${stringifyTweets}
        `
    )
    ],
    });
    

    // console.log("raw output from agent type = " ,  typeof AgentOutPut) // string

//        const jsonMatch = AgentOutPut.match(/\[[\s\S]*\]/) 
       
//        if (!jsonMatch) {
//   throw new Error("Agent didn't return a valid JSON array")
// }

      // loop cause agent will return an array objects of leads

      // changing the string which contains string arrray of objects to real array of object to store in db
      const leads = result.structuredResults // MAIN OUTPUT FROM OPENAI Agent


      console.log("Output from the openai" , leads.structuredResults)
      console.log("Type of ouput from the agent" , typeof leads)

      // const uniqueLeads = [...new Set(leads.TweetId)]


      // getting last run 
   const lastRun = await SearchRunModel.findOne({
    UserId: new mongoose.Types.ObjectId(session.user._id),
    status: 'done'
  }).sort({ createdAt: -1 }).select("seenTweetIds") // most recent first

  console.log("lastrun of user found" , lastRun)

  // filtering the duplicate leads by ids 
     const seenIds: string[] = lastRun?.seenTweetIds || []
    const newLeads: any[] = leads.filter((tweet: any) => !seenIds.includes(tweet.tweetId))
    console.log("newleads = " , newLeads)


    // if there are no new leads and filtering then update the search run model 
    if (newLeads.length === 0) {
        await SearchRunModel.findByIdAndUpdate(searchRunId, {
        status: 'done',
        TotalLeadsFound: 0,
        // save the last seen tweets id for future searches 
           seenTweetIds: leads.map((tweet: any) => tweet?.tweetId) 
    })

    // returning the reponse to frontend 
      return NextResponse.json({
        message: "No currently new leads available in your niche",
        leads: [],
        status: "done"
      } , {status: 200})

    } 
    
    // if there are new leads then loop on new leads and retun it to user
    if (newLeads) {
 const savedLeads: any[] = []

      // running loop
      for(const lead of newLeads) {

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

    // updating the search run model 
      await SearchRunModel.findByIdAndUpdate(
        searchRunId,
        {
          TotalLeadsFound: savedLeads.length,
         seenTweetIds: leads.map((tweet: any) => tweet?.tweetId) 
        }
      )


  await client.publishJSON({
            url: 'https://xradar.in/api/notify-cooldown',
            body: {userId: session.user._id , Email: session.user.email , Name: session.user.name},
            delay: 86400 
        })
        
          return NextResponse.json(
      { status: "done", leads: newLeads },
      { status: 200 }
    );
    }


    // else
   console.log("Else runned")
    // if there are no new leads and last run does not exists for the user 
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

    // updating the search run model 
      await SearchRunModel.findByIdAndUpdate(
        searchRunId,
        {
          TotalLeadsFound: savedLeads.length,
         seenTweetIds: leads.map((tweet: any) => tweet?.tweetId) 
        }
      )


  await client.publishJSON({
            url: 'https://xradar.in/api/notify-cooldown',
            body: {userId: session.user._id , Email: session.user.email , Name: session.user.name},
            delay: 86400 
        })
      
          return NextResponse.json(
      { status: "done", leads: leads },
      { status: 200 }
    );
      // creating an array for saving the leads
     
      // setting up the (Qstash) for Send an email when the cooldown timer ends
       



    } catch (error) {
        console.log("Error while getting the status " , error)
        return NextResponse.json({
            message: "Error while getting the request"
        } , {status: 500})
    }
}