import DBConnect from "@/lib/connectdb";
import SearchRunModel from "@/models/SearchRun";
import { UserModel } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { generateQueries } from "@/helpers/NicheQuries";
import axios from "axios";
import { AgentBuilder } from "@/agents/TweetClassfierAgent";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import LeadsModel from "@/models/leads";
import { SendEmailAboutNewLeads } from "@/helpers/SendEmailAboutNewLeads";
import { Client } from "@upstash/qstash";

// this where the qstash cron job will hit
// find the user first
// then find theier llast search
// then run a automated qurie with 2/3 keywords
// run the filtering agent
// filter out the seen tweets by the user
// send the email
// done


interface Tweet {
  type: string;
  id: string;
  twitterUrl: string;
  text: string;
}

export async function POST(req: NextRequest) {
  try {

    await DBConnect();

    const client = new Client({ token: process.env.QSTASH_TOKEN });
    

    const { userId } = await req.json();

    // console.log("UserId" , userId)

    if (!userId) {
       return NextResponse.json(
        {
          message: "Error while userId andd Email required!",
        },
        { status: 400 },
      );
    }

    const LastRUnOfTheUser = await SearchRunModel.findOne({UserId: userId}).sort({ createdAt: -1 }) // getting the last run done by the user

    const user = await UserModel.findById(userId)
    
    const Name = user?.Name
 

    const keywords = LastRUnOfTheUser.keywords
    console.log("Keywords for the next automated search" , keywords)

    // console.log(LastRUnOfTheUser)

    // return NextResponse.json({
    //   message: "Success",
    //   LastRUnOfTheUser
    // } , {status: 200})


    // Creating a new Search Model with status 'pending' for (fire and poll method)
        const NewSearchRunModel = new SearchRunModel({
          UserId: userId,
          keywords: keywords,
          status: "pending", // PENDING
          LastRun: Date.now(),
          TotalTweetsScraped: 0,
          TotalLeadsFound: 0,
        });
    
        await NewSearchRunModel.save();

    // generating quries 
    const searchTermss = generateQueries(keywords).map((singleQurey: any) => {
   return `${singleQurey} within_time:24h -filter:retweets lang:en -filter:replies`;
    }).slice(0 , 3)
   

    // running the apify with the genereated quries 
    
    try {
      
      console.log("Searching for this quires", searchTermss, keywords);

       // fires async dont wait for the result
          const res = await axios.post(
            `https://api.apify.com/v2/acts/kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest/run-sync-get-dataset-items?token=${process.env.APIFY_API_TOKEN}`,
  {
          searchTerms: [...searchTermss],
          maxItems: 15,
          queryType: "Latest",
        },
);

// filtering out the garbage tweet
const tweets: Tweet[] = res.data.filter(
      (raw: any) => raw.type === "tweet" && raw.id !== -1,
    );

  //  console.log("Tweets" , tweets)


    // All tweets
    const items = tweets.map((singleTweet: Tweet) => ({
      id: singleTweet.id,
      twitterUrl: singleTweet.twitterUrl,
      text: singleTweet.text.slice(0, 300),
    }));
   
      // — after map, before stringify 
      // removing the duplicate tweets from the same author
    function deduplicateTweets(tweets: any[]) {
      const seen = new Set();

      return tweets.filter((tweet) => {
        const author = tweet.twitterUrl.split("/")[3];

        // console.log("Author Name "  , author)

        if (seen.has(author)) return false;
        seen.add(author);

        // console.log("Set at last" , seen)

        return true;
      });
    }

    const cleanedItems = deduplicateTweets(items);

       // filtering the tweets giving only the nessccary value

    const stringifyTweets = JSON.stringify(cleanedItems);


    
        const result = await AgentBuilder.invoke({
          messages: [
            new SystemMessage(
              `
           You are an expert tweet classifier agent for X-Radar, a lead generation platform for freelancers and job seekers .
    
    ═══════════════════════════════════════
    STEP 1 — CLASSIFY EVERY TWEET
    ═══════════════════════════════════════
    You will receive a JSON array of tweets.
    You MUST classify EVERY SINGLE tweet. No exceptions. No skipping.
    
    For EACH tweet:
    1. Look at the 2 reference examples returned by Classify_Tweets tool
    2. Count the labels using MAJORITY VOTE:
       - [hiring_tweet, hiring_tweet] → HIRING ✅
       - [not_hiring, not_hiring]   → NOT HIRING ❌
       - [ hiring_tweet, not_hiring]         → TIE → use your own judgment
    3. Assign final label: HIRING  
    
    ═══════════════════════════════════════
    STEP 2 — CALL THE RIGHT TOOL
    ═══════════════════════════════════════
    After classifying ALL tweets, call Hiring Tweet tool:
    - HIRING_TWEETS   → send all hiring tweets
    
    DO NOT call Classify_Tweets more than once.
    
    ═══════════════════════════════════════
    STEP 3 — SCORE HIRING TWEETS ONLY
    ═══════════════════════════════════════
    Score each HIRING tweet from 1-10:
    
    Score 9-10:
    - Real person, specific tech stack mentioned
    - Personal tone, describes actual project
    - Asks you to DM them directly
    
    Score 7-8:
    - Clear hiring intent
    - Somewhat vague but genuine
    
    Score 4-6:
    - Ambiguous, unclear intent
    - Job board bot, template style
    
    Score 1-3:
    - Unrealistic pay claims
    
    ═══════════════════════════════════════
    STEP 4 — SUGGESTED REPLY RULES
    ═══════════════════════════════════════
    Write a reply for HIRING tweets (score 7+) that:
    - Sounds like a FREELANCER pitching to a CLIENT
    - Is under 2 sentences
    - References something specific (tech stack, project type)
    - Matches the casual tone of the tweet
    - Never starts with "Hi", "Hello", "Hey"
    - Never says "assist", "leverage", "utilize", "opportunity"
    
    ✅ Right: "Next.js + Node.js is my daily stack — what's the scope of the project?"
    ✅ Right: "Built a few SaaS products with React + TypeScript, happy to show what I've shipped"
    ❌ Wrong: "This sounds like a great opportunity! I would love to apply!"
    ❌ Wrong: "Hey there! Can you share more details about the role?"
    
    ═══════════════════════════════════════
    FINAL RULES
    ═══════════════════════════════════════
    STRICT RULE: Call only ONE tool at a time. Wait for the result before calling the next tool.
    - IMPORTANT: When returning the scored leads array, always sort them in DESCENDING order by score — highest scored lead first, lowest last. Never return leads in the order they were input.
    - Process ALL tweets before calling any tool
    - DO NOT INCLUDE SCAM , OR SELF_PROMO TWEETS IN THE OUTPUT ONLY MENTION THOSE WHO ARE CLASSIFIED AS HIRING_TWEETS
    
          `,
            ),
            new HumanMessage(
              `
              Classify these tweets: ${stringifyTweets}
            `,
            ),
          ],
        });

  

        // changing the string which contains string arrray of objects to real array of object to store in db
    const leads = result.structuredResults; // MAIN OUTPUT FROM OPENAI Agent


    // getting last run and only the seentweetIds from the last run
        const lastRun = await SearchRunModel.findOne({
          UserId: userId,
          status: "done",
        })
          .sort({ createdAt: -1 })
          .select("seenTweetIds"); // most recent first
    

      const seenIds: string[] = lastRun?.seenTweetIds || [];
    const newLeads: any[] = leads.filter((tweet: any) => !seenIds.includes(tweet.tweetId))

       if (newLeads.length === 0) {
          await SearchRunModel.findByIdAndUpdate(NewSearchRunModel._id, {
            status: "done",
            TotalLeadsFound: 0,
            // save the last seen tweets id for future searches
            seenTweetIds: leads.map((tweet: any) => tweet?.tweetId),
          });
    
          // returning the reponse to frontend
          return NextResponse.json(
            {
              message: "No currently new leads available in your niche",
              leads: [],
              status: "done",
            },
            { status: 200 },
          );
        }

          // if there are new leads then loop on new leads and retun it to user
    if (newLeads) {
      const savedLeads: any[] = [];

      // running loop
      for (const lead of newLeads) {
        const newLead = new LeadsModel({
          SearchRunId: NewSearchRunModel._id,
          userId: userId,
          Tweeturl: lead.tweetUrl,
          TweetText: lead.tweetText,
          Score: lead.score,
          suggestedReply: lead.suggestedReply,
        });
        await newLead.save();
        savedLeads.push(newLead);
      }

      NewSearchRunModel.status = "done";
      await NewSearchRunModel.save();

      // updating the search run model
      await SearchRunModel.findByIdAndUpdate(NewSearchRunModel._id, {
        TotalLeadsFound: savedLeads.length,
        seenTweetIds: leads.map((tweet: any) => tweet?.tweetId),
      });
    }

    // console.log("New leads " , newLeads)

    // sending the nwe leads via email
  await SendEmailAboutNewLeads(newLeads , user?.Email || "" , Name || "")
  
  // triggering the timer again
   await client.publishJSON({
     url: "https://xradar.in/api/automated-search-for-users",
      body: {
        userId: user?._id,
      },
      delay: 21600
    });

     return NextResponse.json(
            { status: "done" , message: "Successfully runned the automated Search and send the leads to the user sucesfully"},
            { status: 200 },
          );


    } catch (error) {
      console.log("Error while running the apify ", error);
      return NextResponse.json(
        {
          message: "Error while running the apify",
        },
        { status: 500 },
      );
    }


} catch (error) {
    console.log("Error while automated search", error);
    return NextResponse.json(
      {
        message: "Error while searching",
      },
      { status: 500 },
    );
  }
}
