import { NextRequest , NextResponse } from "next/server";
import DBConnect from "@/lib/connectdb";
import { Client } from "@upstash/qstash"
import SearchRunModel from "@/models/SearchRun";
import { sendCooldownEmail } from "@/helpers/SendNotiAAboutCooldownReady";



export async function POST(req: NextRequest) {
    try {
        

        await DBConnect()

        const {userId , Email , Name} = await req.json()

        if (!userId || !Email || !Name) {
            return NextResponse.json({
                message: "Error while userId andd Email required!"
            } , {status: 400})
        }


        // guard 
        const searchRecord = await SearchRunModel.findOne({UserId: userId}).sort({ createdAt: -1 }) 

        console.log("Search Record Found = " , searchRecord)

        const cooldownEndsAt = searchRecord.LastRun.getTime() + (10 * 1000) // adding 24 hours to it
        const isCooldownOver = Date.now() > cooldownEndsAt

      if (isCooldownOver) {            
        await sendCooldownEmail(Email , Name)

        return NextResponse.json({
            message: "Email send Sucessfully",
        } , {status: 200})

        } else {
          return NextResponse.json({
            message: 'Error user has not passed 24 hours yeet'
          } , {status: 200})
        }

    } catch (error) {
        console.log("Error while notifying the user" , error)
        return NextResponse.json({
            message: "Error while notifiying the user"
        } , {status: 500})
    }
}