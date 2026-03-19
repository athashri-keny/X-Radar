import DBConnect from "@/lib/connectdb";
import { UserModel } from "@/models/user";
import { NextRequest , NextResponse } from "next/server";



 export async function POST(request: NextRequest) {
    
    try {
        
        await DBConnect()

        const {verifycode , Email } = await request.json()

        if (!verifycode) {
            return NextResponse.json({
                message: "Error verifiy code required!"
            } , {status: 500})
        }

        const founduser = await UserModel.findOneAndUpdate(
            {
           Email: Email ,
          isVerifiedEmail: false
        } , {
            isVerifiedEmail: true
        } , {new: true})
        

        if (!founduser) {
            return NextResponse.json({
                message: "Error user does not exist in our database!"
            } , {status: 404})
        }

        return NextResponse.json({
            message: "Sucessfully email verified "
        } , {status: 200})

    } catch (error) {
        console.log("Error while verfiying account " , error)
        return NextResponse.json({
            message: "Error while verifying the account!"
        } , {status: 500})
    }
}