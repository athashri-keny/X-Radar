import { NextResponse , NextRequest } from "next/server";
import DBConnect from "@/lib/connectdb";
import LeadsModel from "@/models/leads";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import SearchRunModel from '@/models/SearchRun'

 export  async function GET(request: NextRequest) {
    try {
       
        await DBConnect()

        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
         return NextResponse.json({
            message: "Error login required!"
         } , {status: 500})   
        }

        const foundLeads = await LeadsModel.find({userId: session.user._id})
        
        const searchruns = await SearchRunModel.find({UserId: session.user._id})


        if (!foundLeads) {
            return NextResponse.json({
                message: "No recent search leads avaialbe"
            } , {status: 200})
        }
      
        return NextResponse.json({
            message: "Successfully founds leads",
            foundLeads,
            searchruns
        } , {status: 200})


    } catch (error) {
        console.log("Errorw while gettting the recent leads" , error)
        return NextResponse.json({
            message: "Error while getting the recent leads"
        } , {status: 500})
    }
}