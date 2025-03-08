import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import fs from "fs";
import path from "path";

const isServerless = process.env.NODE_ENV === "production";

// Ensure the uploads folder exists (only for local development)
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!isServerless && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Function to set CORS headers
function setCorsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

// **GET: Fetch all projects**
export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({});
    const response = NextResponse.json({ projects }, { status: 200 });
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ message: "Error fetching projects" }, { status: 500 });
  }
}

// **POST: Create a new project with file upload**
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const mediaType = formData.get("mediaType") as string;
    const url = formData.get("url") as string;
    const file = formData.get("file") as File | null;

    if (!title || !description || !url) {
      return NextResponse.json({ message: "Title, description, and URL are required" }, { status: 400 });
    }

    let filePath = "";
    if (file && !isServerless) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      filePath = `/uploads/${fileName}`;
      fs.writeFileSync(path.join(uploadDir, fileName), fileBuffer);
    }

    const newProject = new Project({ title, description, mediaType, url, file: filePath });
    await newProject.save();

    const response = NextResponse.json(newProject, { status: 201 });
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ message: "Error creating project" }, { status: 500 });
  }
}

// **OPTIONS: Handle CORS preflight requests**
export function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response);
}
