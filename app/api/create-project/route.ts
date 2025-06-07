import connect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { projects, users } from "@/models/databaseSchema/db";

export async function POST(request: NextRequest) {
  try {
    // Connect to DB
    const connection = await connect();
    if (!connection) {
      return NextResponse.json(
        { error: "Database error in creation of new project" },
        { status: 400 }
      );
    }

    // Get project name from request body
    const { projectName } = await request.json();

    // Get session
    const session = await getServerSession(authOptions);

    if (!session || !session.userId) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 400 }
      );
    }

    const userId = session.userId;

    // Check if user exists
    const user = await users.findOne({ userId });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Create new project
    const newProject = await projects.create({
      projectName,
      userId,
    });

    return NextResponse.json(
      {
        message: "Project created successfully",
        project: newProject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
