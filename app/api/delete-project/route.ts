import connect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { projects, users } from "@/models/databaseSchema/db";

export default async function POST(request:NextRequest){
    try{
        const {projectId} = await request.json();
        const connection = await connect();
        if(!connection){
            return NextResponse.json({
                error: "Database error"
            },{status: 400})
        }

        const session = await getServerSession(authOptions);

            if (!session || !session.userId) {
                return NextResponse.json(
                    { error: "Not logged in" },
                    { status: 400 }
                );
            }

        const user = await users.findOne({userId:session.userId});
        if(!user){
            return NextResponse.json(
                {
                    error: "No such user exists "
                },{status:400}
            )
        }

        const deletedProjecct = await projects.deleteOne({projectId});
        return NextResponse.json({
            message: "Delted successfully"
        },{status:200})

    }
    catch(error){
        return NextResponse.json(
            {
                error: `Internal error ${error}`
            },{status:500}
        )
    }
}