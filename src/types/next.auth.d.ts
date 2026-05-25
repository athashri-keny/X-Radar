import NextAuth, { DefaultSession } from "next-auth";


declare module 'next-auth' {
    interface User {
        _id?: string;
        Name?: string,
        Email: string,
        isVerifiedEmail?: boolean,
        plan: string
         createdAt: Date
  updatedAt: Date
    }
    interface Session {
        user: {
            _id?: string,
            name?: string,
            email?: string,
            isVerifiedEmail: boolean,
            plan: string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT{
          _id?: string,
            name?: string,
            email?: string,
            isVerifiedEmail: boolean,
            plan: string
    }
}