import { users } from "@/models/databaseSchema/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import bcrypt from "bcrypt";
import { IUser } from "@/types/database";
import connect from "@/lib/dbConnect";


interface ISignup {
    userName: string,
    password : string,
    email : string
}

const zodUserSchema = z.object({
    userName: z.string().min(4,"minimum length of username is 4"),
    password: z.string().min(5,"Password must be at least 6 characters"),
    email: z.string().email("Invalid email address")
})

export async function POST(request: NextRequest) {
  try {
    // Establish database connection
    const Connection = await connect();
    if (!Connection) {
      return NextResponse.json(
        { error: "Can't connect with the database" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate using zod
    const checked = zodUserSchema.safeParse(body);
    if (!checked.success) {
      return NextResponse.json(
        {
          error: "zod Validation failed",
          details: checked.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { userName, email, password }: ISignup = checked.data;

    const user = await users.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "User already exists, please try logging in!",
          callback: "/login",
        },
        { status: 400 }
      );
    }

    const newPass = await bcrypt.hash(password, 10);

    const newUser: IUser = await users.create({
      userName,
      email,
      password: newPass,
    });

    return NextResponse.json(
      {
        message: "You have successfully signed up!",
        callback: "/login",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("💀 Error occurred during signup", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
