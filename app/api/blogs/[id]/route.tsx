import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

// Handle GET request to fetch a blog by ID
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    
    // Await the params object
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json({ message: "Error fetching blog post" }, { status: 500 });
  }
}
