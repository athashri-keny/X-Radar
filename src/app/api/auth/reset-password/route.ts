import { NextResponse, NextRequest } from "next/server";
import DBConnect from "@/lib/connectdb";
import { UserModel } from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    await DBConnect();

    const { verifycode, UserId, NewPassword } = await request.json();

    console.log("VerifyCode" , verifycode , "UserID" ,UserId  , "Password" , NewPassword) 

    // 1. Validate all required fields upfront 
    if (!verifycode || !UserId || !NewPassword) {
      return NextResponse.json(
        { message: "OTP, user ID, and new password are all required." },
        { status: 400 }
      );
    }

    // 2. Find the user by ID
    const user = await UserModel.findOne({_id: UserId});

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    // console.log("Verifycode from request" , verifycode)
    // console.log("Verfiycdcoe from db" , user.verifycode)


    // 6. Verify OTP matches
    if (verifycode !== user.verifycode) {
      return NextResponse.json(
        { message: "Invalid OTP. Please try again." },
        { status: 400 }
      );
    }

    // 7. Hash new password and update user
    const hashedPassword = await bcrypt.hash(NewPassword, 10);

await UserModel.findOneAndUpdate(
  { _id: UserId },           
  { 
    $set: {
      password: hashedPassword,
      verifycode: null,
      verifycodeExpiry: null,
    }
  }
);

    return NextResponse.json(
      { message: "Password reset successful. You can now log in." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error while resetting the password:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}