import DBConnect from "@/lib/connectdb";
import { NextResponse , NextRequest } from "next/server";
import { UserModel } from "@/models/user";

import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/options";

 export async  function POST(request: NextRequest) {
    try {
        
        await DBConnect()

        const {niche , subniche} = await request.json()
        
        if (!niche || !subniche) {
            return NextResponse.json({
                message: "Error all fields are required!"
            } , {status: 404})
        }


        const session = await getServerSession(authOptions)
        if (!session) {
             return NextResponse.json({
                message: "this is a protected route plz login!"
            } , {status: 404})
        }
      
         const foundUser = await UserModel.findByIdAndUpdate(
  session.user._id,
  { $set: { Niche: niche, subniches: subniche } }, // update both the fields
)
          if (!foundUser) {
            return NextResponse.json({
                message: "Error user not found in your db"
            } , {status: 500})
          }

          await foundUser.save()

          return NextResponse.json({
            message: "successfully saved niche!",
          } , {status: 200})
        
    } catch (error) {
        console.log("Error while setting the niche for a new user" , error)
        return NextResponse.json({
            message: "Error while  setting the niche"
        } , {status: 500})
    }
}