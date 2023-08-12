import { connect } from "@/dbConfig/dbConfig";
import User from "../../../../models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
   
    //check if user exist
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ error: "Email is not registered" });
    }

    //send verification email
    await sendEmail({ email, emailType: "RESET", userId: existingUser._id });

    console.log("reset password link sent to your email");

    return NextResponse.json({
      message: "reset email send successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
