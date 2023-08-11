import { connect } from "@/dbConfig/dbConfig";
import User from "../../../../models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(email);

    //check if email exist

    // const user = await User.findOne({
    //   email: email,
    // });
  } catch (error) {}
}
