// app/api/send-v2-email/route.ts
import DBConnect from "@/lib/connectdb"
// import { UserModel } from "@/models/user"
import { SendV2AnnouncementEmail } from "@/helpers/SendNotification"
import { NextResponse } from "next/server"
import { UserModel } from "@/models/user"


export async function GET() {
  await DBConnect()
  
  const users = await UserModel.find({ isVerifiedEmail: true })
  
  for (const user of users) {
    await SendV2AnnouncementEmail(user.Email, user.Name)
  }

  return NextResponse.json({ message: `Sent to ${users.length} users` })
}