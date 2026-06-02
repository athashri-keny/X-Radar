import { Webhooks } from "@dodopayments/nextjs";
import { UserModel } from "@/models/user";



export const POST = Webhooks({

    
    webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,
    onSubscriptionActive: async (payload) => {

      // console.log("payload data = " , payload.data)

        const email = payload.data.customer.email
        // console.log("Email "  , email)

        await UserModel.findOneAndUpdate(
            {Email: email},
            {
                plan: 'pro',
                planActivatedAt: payload.data.created_at,
                planExpiresAt: payload.data.expires_at,
                dodoCustomerId: payload.data.customer.customer_id,
                subscriptionId: payload.data.subscription_id
            }
        )
    },


  // 4. This runs if payment fails or user cancels
  onSubscriptionFailed: async (payload) => {
    await UserModel.findOneAndUpdate(
      { email: payload.data.customer.email },
      { plan: "free" }
    );
  },




  // 5 if the user Cancell the subscriptions this web hook handler will run 

  onSubscriptionCancelled: async (payload) => {
    await UserModel.findOneAndUpdate(
      {Email: payload.data.customer.email},
      {
            plan: 'free',
            subscriptionId: null,
            planExpiresAt: null,
        }
      
    )
  }

})