import { folders, projects, files, blocks } from "@/models/databaseSchema/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // or your auth library import
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: NextRequest,{params}:{params:{projectId:string}}) {
    //@ts-ignore

  const connection = await connect();
  if(!connection){
    return NextResponse.json({
      error: "Can't connect with the database"
    }),{status:400}
  }
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect("/login");
  }

  const projectId = params.projectId;

  if (!projectId) {
    return NextResponse.json({ message: "Project ID is required" }, { status: 400 });
  }

  try {
    // Validate user access if needed here using session.userId

    // Find the project
    const project = await projects.findOne({ projectId: Number(projectId) });
    if (!project) {
      return NextResponse.json({ message: "No such project exists" }, { status: 404 });
    }

    // Find all folders for the project
    const allFolders = await folders.find({ projectId: Number(projectId) });

    // For each folder, find files
    // When you have multiple asynchronous operations (like Files.map or folders.map where each iteration does an await), Promise.all waits for all of them to finish in parallel.
    // With Promise.all, all async tasks in the array run simultaneously, improving speed.
    // Without it, if you await each one in a loop, they run one after another – much slower.

    const folderData = await Promise.all(
      allFolders.map(async (folder) => {
        const folderFiles = await files.find({ folderId: folder.folderId });

        // For each file, find blocks
        const filesWithBlocks = await Promise.all(
          folderFiles.map(async (file) => {
            const fileBlocks = await blocks.find({ fileId: file.fileId });
            return { ...file.toObject(), blocks: fileBlocks };
          })
        );

        return { ...folder.toObject(), files: filesWithBlocks };
      })
    );

    // Return the structured data
    return NextResponse.json({
      project,
      folders: folderData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
