import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import BlogPost from "@/models/BlogPost";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const body = await req.json();
    
    const words = body.content ? body.content.split(/\s+/).length : 0;
    const readTimeMin = Math.max(1, Math.ceil(words / 200));

    const updatedData: any = {
      title: body.title,
      category: body.category,
      excerpt: body.excerpt,
      content: body.content,
      image: body.image,
    };

    if (body.content) {
      updatedData.readTime = `${readTimeMin} min read`;
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      resolvedParams.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedPost });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const deletedPost = await BlogPost.findByIdAndDelete(resolvedParams.id);
    
    if (!deletedPost) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: deletedPost });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
