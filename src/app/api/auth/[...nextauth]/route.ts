import NextAuth from "next-auth";
import { authOptions } from "./options";

//This route is the entry point for all authentication actions

const handler = NextAuth(authOptions)


export {handler as GET , handler as POST} // 