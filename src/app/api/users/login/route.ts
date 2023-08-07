import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    //check if user exist
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json("User does not exist", { status: 400 });
    }

    //password correct
    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return NextResponse.json("Invalid password", { status: 400 });
    }

    //create token data
    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1hr",
    });

    //set to user cookie
    const response = NextResponse.json({
      message: "Login successful",
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
