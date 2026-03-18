import { NextResponse , NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";



export async function proxy(request: NextRequest) {


    const token = await getToken({req: request}) // / gets session token form jwt

    console.log("token " ,  token)
    
    const url = request.nextUrl // gives access to the incoming request of url

    



    return NextResponse.redirect(new URL('/home' , request.url))
}

