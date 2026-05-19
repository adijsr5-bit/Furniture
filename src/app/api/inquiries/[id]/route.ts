import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Inquiry from "@/models/Inquiry";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  try {
    const { status } = await request.json();
    await connectDB();
    const inquiry = await Inquiry.findByIdAndUpdate(resolvedParams.id, { status }, { new: true });
    if (!inquiry) return NextResponse.json({ success: false, message: "Inquiry not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: inquiry });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  try {
    await connectDB();
    const inquiry = await Inquiry.findByIdAndDelete(resolvedParams.id);
    if (!inquiry) return NextResponse.json({ success: false, message: "Inquiry not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
