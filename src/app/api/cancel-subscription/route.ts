import DBConnect from "@/lib/connectdb";
import DodoPayments from "dodopayments";
import { getServerSession } from "next-auth";
import { NextRequest , NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { UserModel } from "@/models/user";



// Initialize the Dodo Payments client
const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: 'test_mode', // defaults to 'live_mode'
});



 export  async function POST(_req: NextRequest) {
    try {
        

        await DBConnect()

        
                const session = await getServerSession(authOptions)
        
                 if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }


          const foundUser = await UserModel.findOne({Email: session.user.email})

          const subscriptionId = foundUser?.subscriptionId || ""

          // cannceling the subscription 
          await client.subscriptions.update(subscriptionId , {
            cancel_at_next_billing_date: true,
          })

return NextResponse.json({ message: "Subscription cancelled successfully" }, { status: 200 })


    } catch (error) {
        console.log("Error while canecling the subscription")
        return NextResponse.json({
            messaeg: "Error while canceling the subscriptipn"
        } , {status: 500})
    }
}