import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

// Function to set CORS headers
function setCorsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

// **GET: Fetch a blog by ID**
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const response = NextResponse.json(blog, { status: 200 });
    return setCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json({ message: "Error fetching blog post" }, { status: 500 });
  }
}

// **OPTIONS: Handle CORS preflight requests**
export function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response);
}
