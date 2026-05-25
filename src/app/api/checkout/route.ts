import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options";
import DBConnect from "@/lib/connectdb";
import DodoPayments from 'dodopayments';


// Initialize the Dodo Payments client
const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: 'test_mode', // defaults to 'live_mode'
});


export async function POST(request: NextRequest) {
    try {
        

        await DBConnect()

        const session = await getServerSession(authOptions)

         if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // create a payment
      const payment = await client.checkoutSessions.create({
        product_cart: [
            {
                product_id: 'pdt_0NdNc1lbF1UroSFjMeIhQ',
                quantity: 1,
            }
        ],
        customer: {
            email: session.user.email,
            name: session.user.name,
        },
    //     billing_address: {
    //     street: '123 Main St',
    //     city: 'San Francisco',
    //     state: 'CA',
    //     country: 'US', // Required: ISO 3166-1 alpha-2 country code
    //     zipcode: '94102'
    //   },
      
    // TODO: remove this and add prod 
    return_url: 'http://localhost:3000/dashboard',

    
      // custom data for webhook
      metadata: {
        userId: session.user._id || "",
        plan: 'pro'
      }
      })

      console.log("Payment checckout url recvied = " , payment.checkout_url)

      return NextResponse.json({ checkout_url: payment.checkout_url } , {status: 200})

    } catch (error) {
        console.log("Error while processing the payment" , error)
        return NextResponse.json({
            message: "Eror while prooccing the payment"
        } , {status: 500})
    }
}