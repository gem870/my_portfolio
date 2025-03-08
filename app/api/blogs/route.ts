import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import fs from "fs";
import path from "path";

// Ensure the uploads folder exists
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Function to set CORS headers
function setCorsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

// **Handle CORS Preflight Requests**
export function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 204 }));
}

// Handle GET request to fetch all blogs
export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({});
    const response = NextResponse.json(blogs, { status: 200 });
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ message: "Error fetching blogs" }, { status: 500 });
  }
}

// Handle POST request to create a new blog with file upload
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title")?.toString().trim() || "";
    const description = formData.get("description")?.toString().trim() || "";
    const mediaType = formData.get("mediaType")?.toString().trim() || "";
    const code = formData.get("code")?.toString().trim() || "";
    const programmingLanguage = formData.get("programmingLanguage")?.toString().trim() || "";
    const file = formData.get("file") as File | null;

    if (!title || !description) {
      return NextResponse.json({ message: "Title and description are required" }, { status: 400 });
    }

    let filePath = "";
    if (file) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      filePath = `/uploads/${fileName}`;
      fs.writeFileSync(path.join(uploadDir, fileName), fileBuffer);
    }

    // Create new blog post
    const newBlog = new Blog({
      title,
      description,
      mediaType,
      code,
      programmingLanguage,
      file: filePath,
    });

    await newBlog.save();

    const response = NextResponse.json(newBlog, { status: 201 });
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ message: "Error creating blog post" }, { status: 500 });
  }
}
