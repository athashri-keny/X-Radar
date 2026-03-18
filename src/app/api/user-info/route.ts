import DBConnect from "@/lib/connectdb";
import { UserModel } from "@/models/user";
import { NextRequest , NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import NextAuth from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function GET(request: NextRequest) {
   try {
    
    await DBConnect()

    const session = await getServerSession(authOptions)
    
    const user = await UserModel.findOne({Email: session?.user.email})

    if (!user) {
        return NextResponse.json({
            message: "Error user not exists in our database"
        } , {status: 500})
    }

    return NextResponse.json({
        message: "Sucessfully",
        user
    } , {status: 200})

    
   } catch (error) {
    console.log("Error while  getting userinfo " , error)
    return NextResponse.json({
        message: "Error while getting the userinfo"
    } , {status: 500})
   }    
}