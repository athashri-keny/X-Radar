import { NextResponse } from "next/server";
import DBConnect from "@/lib/connectdb";
import SearchRun from "@/models/SearchRun"; // your SearchRun model

export async function GET() {
  await DBConnect();
 
      const returningUsers = await SearchRun.aggregate([
    {
      $group: {
        _id: "$UserId",
        totalSearches: { $sum: 1 },
        firstSearch: { $min: "$createdAt" },
        lastSearch: { $max: "$createdAt" }
      }
    },
    {
      $match: {
        totalSearches: { $gt: 1 }
      }
    }
  ]);

  return NextResponse.json(returningUsers);
}