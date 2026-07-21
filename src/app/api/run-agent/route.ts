export const runtime = "nodejs";

import DBConnect from "../../../lib/connectdb";
import { NextRequest, NextResponse } from "next/server";
import SearchRunModel from "../../../models/SearchRun";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { generateQueries } from "@/helpers/NicheQuries";
import axios from "axios";
import { UserModel } from "@/models/user";



// THIS ROUTE GI  VES SEARCHID TO FRONTEND FOR POLLLING

export async function POST(request: NextRequest) {
  try {
    await DBConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        {
          message: "this is a protected route plz login!",
        },
        { status: 404 },
      );
    }

    const { keywords } = await request.json();

    // console.log( "keywords" , keywords , "Timeperiod"  , TimePeriod)

    if (!keywords) {
      return NextResponse.json(
        {
          message: "Error keywords required!",
        },
        { status: 500 },
      );
    }

    // finding the last run searched by the user.
    const lastRun = await SearchRunModel.findOne({
      UserId: session.user._id,
      status: "done",
    }).sort({ createdAt: -1 });

    const userr = await UserModel.findById(session.user._id)

    if (!userr) {
      return NextResponse.json({
        message: "User not foubd"
      } , {status: 404})
    }


    // getting the total runs done by users
    const totalRuns = await SearchRunModel.countDocuments({
      UserId: new mongoose.Types.ObjectId(session.user._id),
      status: "done",
    });

    // FOR Epesscially one user giving the pro features for free
    if (session.user.plan === "pro" && session.user.SearchLimit) {
      if (totalRuns >= session.user.SearchLimit) {
        return NextResponse.json(
          {
            message: `Your ${session.user.SearchLimit} trial searches are used up. Upgrade to keep using X-Radar!`,
          },
          { status: 403 },
        );
      }
    }
    // for Free user hitting the paywall after first run

      // console.log("Session " , session.user)

      // In manual search route
if (session.user.plan === 'free' && userr?.manualSearchesUsed >= 3) {
  return NextResponse.json({
    message: "You have exhausted your free searches. Upgrade to Pro to continue."
  }, { status: 403 })
}

    // for paid user hiting the cooldown timer
    // getting the last run of the user and converting it to normal time

    // if (lastRun?.LastRun) {
    //   const hoursSinceLastRun =
    //     (Date.now() - new Date(lastRun.LastRun).getTime()) / (1000 * 60 * 60);

    //   // Pro user — 6 hour cooldown
    //   if (hoursSinceLastRun < 6 && session.user.plan === "pro") {
    //     const hoursLeft = Math.ceil(6 - hoursSinceLastRun);
    //     return NextResponse.json(
    //       {
    //         message: `Error! Cooldown Active. T  ry Again in ${hoursLeft} hours`,
    //       },
    //       { status: 429 },
    //     );
    //   }

    //   // Free user — 24 hour cooldown
    //   if (hoursSinceLastRun < 12 && session.user.plan === "free") {
    //     const hoursLeft = Math.ceil(12 - hoursSinceLastRun);
    //     return NextResponse.json(
    //       {
    //         message: `Error! Cooldown Active. Try Again in ${hoursLeft} hours`,
    //       },
    //       { status: 429 },
    //     );
    //   }
    // }

    // Creating a new Search Model with status 'pending' for (fire and poll method)
    const NewSearchRunModel = new SearchRunModel({
      UserId: new mongoose.Types.ObjectId(session.user._id),
      keywords: keywords,
      status: "pending", // PENDING
      LastRun: Date.now(),
      TotalTweetsScraped: 0,
      TotalLeadsFound: 0,
    });

    await NewSearchRunModel.save();

    await UserModel.findByIdAndUpdate(session.user._id, {
      LastRun: new Date(),
    });

    // console.log(user , "Updated successfully")

    console.log("KeyWords", keywords);

    const searchTermss = generateQueries(keywords)
      .map((singleQurey: any) => {
          return `${singleQurey} within_time:24h -filter:retweets lang:en -filter:replies`;
      })
      .slice(0, session.user.plan === "free" ? 4 : 5);

    // console.log("SearchTerms returnd" , searchTermss)
    // return NextResponse.json({
    //     message: "returned",
    //     searchTermss
    // } , {status: 200})

    try {
      console.log("Searching for this quires", searchTermss, keywords);

      // fires async dont wait for the result
      const res = await axios.post(
        `https://api.apify.com/v2/acts/kaitoeasyapi~twitter-x-data-tweet-scraper-pay-per-result-cheapest/runs?token=${process.env.APIFY_API_TOKEN}`,
        {
          searchTerms: [...searchTermss],
          maxItems: 15,
          queryType: "Latest",
        },
      );

      // testing commit 




      //  console.log("Apify  =" , res.data)

      // for tracking (finiesh or not)
      const apifyRunId = res.data?.data?.id;

      // saving the apifyrun Id
      NewSearchRunModel.ApifyRunId = apifyRunId;
      await NewSearchRunModel.save();

      // giving the search run id to frontend for check the status for this particular run request
      return NextResponse.json(
        { message: "Search started!", searchRunId: NewSearchRunModel._id },
        { status: 200 },
      );
    } catch (error) {
      console.log("Error while running apfiy", error);
      NewSearchRunModel.status = "failed";
      await NewSearchRunModel.save();
      return NextResponse.json(
        {
          message: "Error while running agent",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    // ← add this outer catch
    console.log("Outer error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
