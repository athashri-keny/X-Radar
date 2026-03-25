import DBConnect from "@/lib/connectdb";
import { UserModel } from "@/models/user";
import { NextRequest , NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import EmailAboutNewSignup from "@/helpers/SendOtpTouser";


export async function POST(request: NextRequest) {

    try {
        await DBConnect()

        const {Name , email , Password} = await request.json()

        if (!Name || !email || !Password) {
            return NextResponse.json({
                message: "Error all fields are required!"
            } , {status: 500})
        }

        const foundUser = await UserModel.findOne({Email: email})

        if (foundUser) {
            return NextResponse.json({
                message: "Error user already exist in our database"
            }, {status: 400})
        }

           const verifycode = Math.floor(100000 + Math.random() * 900000).toString() // 6 digit verfiy code

           const hashpassword = await bcrypt.hash(Password , 10)

              const verifycodeExpiry = new Date();

        verifycodeExpiry.setHours(verifycodeExpiry.getHours() + 1) // 1 hour

        const newUser = new UserModel({
            Name: Name,
             Email: email,
            password: hashpassword,
            verifycode: verifycode,
            verifyCodeExpiry: verifycodeExpiry,
            isVerifiedEmail: false
        })
        await newUser.save()

        await EmailAboutNewSignup(email , verifycode , Name)

          return NextResponse.json({
            message: "User registered successfully. Check your email for the OTP.",
            userId: newUser._id
        }, { status: 201 })


    } catch (error) {
        console.log("Error while signing up" , error)
        return NextResponse.json({
            message: "Error while signing up"
        }, {status: 500})
    }
}