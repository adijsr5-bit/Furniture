import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Inquiry from "@/models/Inquiry";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const inquiry = await Inquiry.create(body);
    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
