import  { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import DBConnect from "@/lib/connectdb";
import { UserModel } from "@/models/user";
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'


interface AutoLoginPayload {
  purpose: string,
  userId: string
}


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          allowDangerousEmailAccountLinking: true // This ensures users who start with credentials can later add Google sign-in, or vice versa
        }),
        TwitterProvider({
            clientId: process.env.TWITER_CLIENT_ID!,
            clientSecret: process.env.TWITER_CLIENT_SECRET!
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Username" , type: "text" , placeholder: "Enter your username"},
                password: {label: "Password" , type: 'password' , placeholder: "Enter your password"},
                AutoLoginToken: {label: "Auto login token" , type: 'text'}
            },
              
            // authorize() is ONLY for Credentials login
           async authorize(credentials: any):Promise<any> {
            await DBConnect()
            //   console.log("1. authorize called", credentials?.email)
            // for normal login
          try {
                if(credentials?.email && credentials.password) {
                      const user = await UserModel.findOne({
                      Email: credentials.email
                  });
                      console.log("2. user found", user)
                  if (!user) {
                    console.log("3. user not found")
                      throw new Error('Email does not exists in our database')
                  }
                   console.log("4. isVerifiedEmail", user.isVerifiedEmail)
                  if (!user.isVerifiedEmail) {
                      throw new Error("email is not verified")
                  }
                  // check password 
                  const Ispassswordcorrect = await bycrpt.compare(credentials.password, user.password)
                  console.log("5. password correct?", Ispassswordcorrect)

                  if (Ispassswordcorrect) {
                    console.log("user = " , user)
                      return user;
                  } else {
                      return new Error("Error password is incorrect!")
                  }
                }
                
          } catch (error) {
            throw new Error("Error")
          }
          
        //  for auto logging the user after sucessfully signup and passsword
        // opening and truting the Envelope

          if (credentials.AutoLoginToken) {

            const decoded = jwt.verify(credentials.AutoLoginToken , process.env.JWT_SECRET!) as AutoLoginPayload

            if (decoded.purpose == 'auto_login_after_verification') {
            
                const user = await UserModel.findById(decoded.userId) 

                if (user && user.isVerifiedEmail) {
                    return user
                }
            } else {
                throw new Error('Error occured while autologin plz try manually')
            }

          }
            },
        })
    ],

    // callbacks are functions that run during auth
    callbacks: {
    // if the user directly clicks on google login in signup then this will run
        async signIn({account , profile}) {

            if (account?.provider === 'google') {
                try {
                    await DBConnect()
                   const existingUser = await UserModel.findOne({Email: profile?.email})
                   
                   if (!existingUser) {
                    const newUser = new UserModel({
                        Email: profile?.email,
                        Name: profile?.name,
                        password: null,
                        verifycode: null,
                        isVerifiedEmail: true
                    })
                    await newUser.save()
                    console.log("New User from google " , newUser)
                   }
                } catch (error) {
                    console.log("Error while sigining with google" , error)
                   
                }
            }
                   return true
        },

// Think like this:
// JWT = locker 🔐 (hidden)
// NextAuth = guard 👮
// session = items given to you
// you dont touch the locker

        // adding custom user data into jwt token (It’s a secure object that stores user info after login) 
        // It lets you inject custom data into jwt token
        async jwt({token , user , account}){
            if (user) {
                
                if (account?.provider === 'credentials') {
                    // creating a token for user , email login users
                    token._id = user.id?.toString(),
                    token.name = user.name,
                    token.isVerifiedEmail = user.isVerfiedEmail || false
                    token.email = user.email

                    // if the login is from google (oauth)
                } else {
                    await DBConnect()

                    const dbuser = await UserModel.findOne({Email: user.email})
                    // creating a token for google oauth users
                    if (dbuser) {
                        token._id = user.id.toString(),
                        token.name = user.name,
                        token.isVerfiedEmail = user.isVerfiedEmail || false,
                        token.email = user.email
                    }
                }        
            }
            return token
        },

//   ✅ JWT is secure token (stored in cookie)
// ❌ useSession does NOT extract it
// ✅ NextAuth extracts it and gives session to useSession

        // exposes data to client(frontend) adding it from token 
        async session({session , token}) {
            if (token) {
                session.user._id = token._id,
                session.user.name = token.name,
                session.user.email = token.email,
                session.user.isVerfiedEmail = token.isVerfiedEmail
            }
            return session
        }
    },
    pages: {
        signIn: '/auth/login'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET

}
