import { NextResponse , NextRequest } from "next/server";

import DBConnect from "@/lib/connectdb";
import { UserModel } from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(_request: NextRequest) {
    try {
        

        await DBConnect()

         const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });


  const dbUser = await UserModel.findById(session.user._id)


  if (!dbUser) {
    return NextResponse.json({
        message: "Error no user found!",
    } , {status: 404})
  }


  console.log("db user" , dbUser)

  if (dbUser.plan === 'pro') {
        return NextResponse.json({
            message: "Upraded True",
            upgraded: true,
            plan: dbUser?.plan,
        })
  } else {
    return NextResponse.json({
        message: "Error user has not updated to pro yet",
            upgraded: false,
            plan: dbUser?.plan,
    } , {status: 403})
  }


    } catch (error) {
        console.log("Error while getting the payment status")
        return NextResponse.json({
            message: "Error while gettign the payment status"
        } , {status: 500})
    }
}