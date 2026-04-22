import DBConnect from "@/lib/connectdb";
import { NextRequest , NextResponse } from "next/server";
import SearchRun from "@/models/SearchRun"; // your SearchRun model
import { UserModel } from "@/models/user";


export async function POST(req: NextResponse) {
    
try {
    

    await DBConnect()

    // find the most recent search per user
const recentRuns = await SearchRun.aggregate([
  {
    $group: {
      _id: "$UserId",
      lastRunAt: { $max: "$LastRun" }  // get thier last search run max operator picks the lastest 
    }
  },
  {
    $match: {
      lastRunAt: { $lt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }
    }
  }
])


// const userIds = recentRuns.map(r => r._id)
// const users = await UserModel.find({ _id: { $in: userIds } })

// return NextResponse.json({
//     message: "Sucess",
// users
// } , {status: 200})


// 


} catch (error) {
    console.log("Error while automated search" , error)
    return NextResponse.json({
        message: "Error while automated  search"
    } , {status: 500})
}

}