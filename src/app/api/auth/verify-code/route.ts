import DBConnect from "@/lib/connectdb";
import { UserModel } from "@/models/user";
import { NextRequest , NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


 export async function POST(request: NextRequest) {
    
    try {
        
        await DBConnect()

        const {verifycode , userId } = await request.json()

        // console.log(verifycode , userId)

        if (!verifycode || !userId) {
            return NextResponse.json({
                message: "Error verifiy code required!"
            } , {status: 500})
        }

        const founderUser = await UserModel.findById(userId)

                if (!founderUser) {
            return NextResponse.json({
                message: "Error user does not exist in our database!"
            } , {status: 404})
        }

        const ISCodeVaild = founderUser?.verifycode === verifycode
        const isCodeExpired = founderUser?.verifyCodeExpiry ? new Date(founderUser.verifyCodeExpiry) > new Date() : false

        if (!ISCodeVaild || !isCodeExpired) {
             return NextResponse.json({
            message: "Error oucced your code is vaild or expired"
        } , {status: 404})
        }


 if (isCodeExpired && ISCodeVaild) {
        founderUser.isVerifiedEmail = true
      }
      founderUser.save()


      // autologin
      // packing the envelope 
      const AutoLoginToken = jwt.sign(
        {
            userId: founderUser._id,
            Email: founderUser.Email,
            purpose: 'auto_login_after_verification'
        },
       process.env.JWT_SECRET as string,
       {expiresIn: '5m'}
      )

      // It outputs a token string that looks like this:
// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMjMifQ.abc123xyz


        return NextResponse.json({
            message: "Sucessfully email verified ",
            AutoLoginToken
        } , {status: 200})

    } catch (error) {
        console.log("Error while verfiying account " , error)
        return NextResponse.json({
            message: "Error while verifying the account!"
        } , {status: 500})
    }
}