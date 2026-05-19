import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AboutSection from "@/models/AboutSection";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const body = await req.json();
    
    const updatedSection = await AboutSection.findByIdAndUpdate(
      resolvedParams.id,
      {
        label: body.label,
        title: body.title,
        content: body.content,
        order: body.order ? Number(body.order) : 0,
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedSection) {
      return NextResponse.json({ success: false, error: "About Section not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedSection });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    
    const deletedSection = await AboutSection.findByIdAndDelete(resolvedParams.id);
    
    if (!deletedSection) {
      return NextResponse.json({ success: false, error: "About Section not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: deletedSection });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
