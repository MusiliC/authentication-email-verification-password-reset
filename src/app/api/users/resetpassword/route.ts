import { connect } from "@/dbConfig/dbConfig";
import User from "../../../../models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // console.log(reqBody);

    const { token, newPassword } = reqBody;

    //check if user exist
    const user = await User.findOne({ forgotPasswordToken: token });

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    console.log(user);

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "reset password send successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
