import connect from "@/lib/dbConnect";
import { projects, users } from "@/models/databaseSchema/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const connection = await connect();
    if (!connection) {
      return NextResponse.json(
        { error: "Database connection failed during project fetching" },
        { status: 500 }
      );
    }

    const  userId  = (await params).userId;

    const user = await users.findOne({ userId });
    if (!user) {
      return NextResponse.json(
        { error: "No such user exists" },
        { status: 404 }
      );
    }

    const userProjects = await projects.find({ userId });

    return NextResponse.json({ projects: userProjects }, { status: 200 });
  } catch (error: any) {
    console.error("Unexpected error during project fetching:", error);
    return NextResponse.json(
      { error: `Unexpected error: ${error.message || error}` },
      { status: 500 }
    );
  }
}
