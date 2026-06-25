import DBConnect from "@/lib/connectdb";
import { UserModel } from "@/models/user";
import { NextRequest , NextResponse } from "next/server";
import { SendForgotPasswordOTP } from "@/helpers/SendForgotPasswordOtp";



export async function POST(req: NextRequest) {
    try {

        await DBConnect()


        const { Email} = await req.json()


        if (!Email) {
            return NextResponse.json({
                message: "Error password andd userID required!"
            } , {status: 400})
        }


        const user: any = await UserModel.findOne({Email})
        const Namee = user.Name
        const UserId = user._id

        if (!user && user?.Email !== Email) {
            return NextResponse.json({
                message: "Error no user found"
            } , {status: 200})
        }

         const verifycode = Math.floor(100000 + Math.random() * 900000).toString() // 6 digit verfiy code


         await UserModel.findOneAndUpdate(
  { Email: Email },         
  { $set: { verifycode: verifycode } }  
);

         SendForgotPasswordOTP(Email , Namee , verifycode )
       

        return NextResponse.json({
            message: "Success Check your Email for otp",
            verifycode,
            UserId
        } , {status: 200})
           
        

    } catch (error) {
        console.log("Error while setting the password" , error)
        return NextResponse.json({
            message: "Error forging the password"
        })
    }
}