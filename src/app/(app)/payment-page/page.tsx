// app/payment-sucess/page.tsx (server)

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import DBConnect from "@/lib/connectdb";
import { UserModel } from "@/models/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
import PaymentSuccessClient from "../payment-status/page";


export default async function Page() {



  const session = await getServerSession(authOptions);

  // console.log("session revied from the sever" , session)

  if (!session) {
    return
  }

  await DBConnect();
  
  const user = await UserModel.findOne({Email: session.user.email});

  // console.log("User" , user)

  // already upgraded — just show success immediately
  if (user?.plan === 'pro') {
    return <PaymentSuccessClient initialStatus="done"/>;
  }

  // webhook hasn't fired yet — let client poll
  return <PaymentSuccessClient initialStatus="checking" />;
}