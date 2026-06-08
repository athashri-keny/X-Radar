import { NextResponse , NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


const protectedRoutes = ['/dashboard']

export async function proxy(request: NextRequest) {


    const token = await getToken({req: request}) // / gets session token form jwt

    // console.log("token " ,  token)
    
    const url = request.nextUrl // gives access to the incoming request of url

    // checking all the routes
    const isProtected = protectedRoutes.some(route => url.pathname.startsWith(route))

    // if the user has not token and the he trying to acccess is protected route then redirect him to signup 
    if (!token && isProtected) {
        return NextResponse.redirect(new URL('/auth/signup' , request.url))
    }

    // if the user has token and he tries to access login , signup page then redirect him to dashboard
    if (token && (
    url.pathname.startsWith('/auth/login') ||
    url.pathname.startsWith('/auth/signup') ||
    url.pathname.startsWith('/auth/verify-code') ||
    url.pathname.startsWith('/auth/set-niche')
)) {
        return NextResponse.redirect(new URL('/dashboard' , request.url) )
    }

    // allow the request
      return NextResponse.next()
}

// Routes Proxy will run on this routes 
export const config = {
matcher: [
  '/auth/login',
  '/auth/signup',
  '/',
  '/dashboard:path*',
  '/verify/:path*',
]
}
