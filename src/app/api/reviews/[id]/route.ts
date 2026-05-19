import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Review from "@/models/Review";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const body = await req.json();
    
    const updatedReview = await Review.findByIdAndUpdate(
      resolvedParams.id,
      { status: body.status },
      { new: true, runValidators: true }
    );
    
    if (!updatedReview) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: updatedReview });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    
    const deletedReview = await Review.findByIdAndDelete(resolvedParams.id);
    
    if (!deletedReview) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: deletedReview });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
