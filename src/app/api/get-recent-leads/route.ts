import { NextResponse , NextRequest } from "next/server";
import DBConnect from "@/lib/connectdb";
import LeadsModel from "@/models/leads";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import SearchRunModel from '@/models/SearchRun'
import { UserModel } from "@/models/user";

 export  async function GET(request: NextRequest) {
    try {
       
        await DBConnect()

        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
         return NextResponse.json({
            message: "Error login required!"
         } , {status: 500})   
        }

        console.log("Session" , session)

        const foundLeads = await LeadsModel.find({userId: session.user._id})

        console.log("Found leads" , foundLeads)
        
        const searchruns = await SearchRunModel.find({UserId: session.user._id})

        const user = await UserModel.findById(session.user._id)


        if (!foundLeads) {
            return NextResponse.json({
                message: "No recent search leads avaialbe"
            } , {status: 200})
        }
      
        return NextResponse.json({
            message: "Successfully founds leads",
            foundLeads,
            searchruns,
            lastSearchAt: user?.LastRun // ← add this
        } , {status: 200})


    } catch (error) {
        console.log("Errorw while gettting the recent leads" , error)
        return NextResponse.json({
            message: "Error while getting the recent leads"
        } , {status: 500})
    }
}