import DBConnect from "@/lib/connectdb";
import { UserModel } from "@/models/user";
import { NextRequest , NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import SearchRunModel from "@/models/SearchRun";
import DodoPayments from "dodopayments";


// Initialize the Dodo Payments client
const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: 'live_mode', // defaults to 'live_mode'
});



export async function GET(request: NextRequest) {
   try {
    
    await DBConnect()

    // Validate session and email exist
     const session = await getServerSession(authOptions)
    //  console.log("session = " , session)

        if (!session || !session.user) {
         return NextResponse.json({
            message: "Error login required!"
         } , {status: 500})   
        }

    
    const user = await UserModel.findOne({Email: session.user.email}).select("-password -verifycode -__v -updatedAt  -dodoCustomerId")

    // console.log(user)


    const newStats = await SearchRunModel.aggregate([
         {
    $match: {
      UserId: user?._id
    }
  },
        {
         $group: {
            _id: null,
             totalRuns:  { $sum: 1 },
            TotalTweetsScraped: {$sum: "$TotalTweetsScraped"},
            TotalLeadsFound: {$sum: "$TotalLeadsFound"}
         }
        }
    ])

    if (!user) {
        return NextResponse.json({
            message: "Error user not exists in our database"
        } , {status: 400})
    }


    let next_billing_date = null
    if (user.subscriptionId && user.plan == 'pro') {
        const subDetails  = await client.subscriptions.retrieve(user?.subscriptionId || "")
        next_billing_date = subDetails.next_billing_date
    }

    const userObj = user.toObject()
    delete userObj.subscriptionId
        

    return NextResponse.json({
        message: "Successfully",
        user: userObj,
        newStats,
        next_billing_date
    } , {status: 200})

    
   } catch (error) {
    console.log("Error while  getting userinfo " , error)
    return NextResponse.json({
        message: "Error while getting the userinfo"
    } , {status: 500})
   }    
}