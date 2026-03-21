import DBConnect from "@/lib/connectdb";
import { NextRequest , NextResponse } from "next/server";
import { WaitListModel } from "@/models/waitlist";
import { SendEmailAboutEarlyaccess } from "@/helpers/SendEmailAboutEarly-Access";


 export async function POST(request: NextRequest) {
    try {
        

        await DBConnect()

        const {email , niche } = await request.json()

        if (!email || !niche) {
            return NextResponse.json({
                message: "Error email and niche is required! "
            } , {status: 500})
        }

        const existing = await WaitListModel.findOne({Email: email})

          if (existing) {
            return NextResponse.json(
                { message: "You're already on the waitlist!" },
                { status: 409 }  // 409 = Conflict
            )
        }


        const NewWaitList = new WaitListModel({
            Email: email,
            niche: niche
        })
        await NewWaitList.save()


        const count = await WaitListModel.countDocuments()

        await SendEmailAboutEarlyaccess(email , niche)


        return NextResponse.json({
            message: "Successfully registared for MVP thanks!!",
            count
        } , {status: 200} )


    } catch (error) {
        console.log("Error while loggin in early-access" , error)
        return NextResponse.json({
            message: "Error while loggin in ",
            error
        } , {status: 500})
    }
}



export async function GET(request: NextRequest) {
    try {
        await DBConnect()

        const count = await WaitListModel.countDocuments()
        return NextResponse.json({
            count
        } , {status: 200})
    } catch (error) {
        console.log("Error while getting the counts" , error)
    }
}