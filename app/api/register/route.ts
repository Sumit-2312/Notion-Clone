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
    username: z.string().min(4,"Username is required"),
    password: z.string().min(5,"Password must be at least 6 characters"),
    email: z.string().email("Invalid email address")
})


export async function POST(request:NextRequest){

    const Connection = await connect();
     if(!Connection){
        return NextResponse.json({
        error: "Can't connect with the database"
        }),{status:400}
    }
    
    const body = request.json();

    // check the type safety using zod

    const checked = zodUserSchema.safeParse(body);

    if( !checked.success ){
        return NextResponse.json({
            error: "zod Validation failed",
            details : checked.error.flatten(),
        }),{status: 400}
    }
//@ts-ignore
    const {userName,email,password}:ISignup = checked.data;

    const user = await users.findOne({email});

    if( user ) return NextResponse.json({
        error: "User already exists, please try loggin in!",
        callback: "/login"
    }),{status: 400};

    const newPass = await bcrypt.hash(password,"secret");

    const newUser:IUser = await users.create({
        userName,
        email,
        password: newPass
    })

    return NextResponse.json({
        message: "You have successfully signed up!",
        callback: "/login"
    }),{status:200}

}