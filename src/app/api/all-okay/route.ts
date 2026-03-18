import DBConnect from "@/lib/connectdb";
import { NextRequest , NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    
    try {
        
        await DBConnect()

        return NextResponse.json({
            message: "All Okay and working fine!!"
        } , {status: 200})

    } catch (error) {
        console.log("Error while checking the health " , error)
        return NextResponse.json({
            message: "Error while checking the heath"
        } , {status: 500}) 
    }
}