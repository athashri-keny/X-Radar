import DBConnect from "@/lib/connectdb";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { abort } from "process";
import { authOptions } from "../auth/[...nextauth]/options";
import { UserModel } from "@/models/user";


 
 export async function GET(NextRequest: NextRequest) {
    try {
        


        await DBConnect()

         const session = await getServerSession(authOptions);
            if (!session?.user) {
              return NextResponse.json({ message: "Please login!" }, { status: 401 });
            }

         const User = await UserModel.findById(session.user._id)

       
         if (!User) {
  return NextResponse.json({ message: "Error while User model" }, { status: 404 })
}   
         
// console.log("Manual search used" , User.manualSearchesUsed)
// console.log("Automated searched used " , User.AutoScanUsed)

return NextResponse.json({
  message: "Successfully fetched",
  manualSearchesUsed: User.manualSearchesUsed,
  autoScansUsed: User.AutoScanUsed,
})


    } catch (error) {
        console.log("Error while getting the status " , error)
        return NextResponse.json({
            message: "Error while getting the status"
        } , {status: 500})
    }
}