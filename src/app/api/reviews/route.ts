import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Review from "@/models/Review";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const isPublic = searchParams.get("public") === "true";
    
    const query = isPublic ? { status: "Published" } : {};
    const reviews = await Review.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: reviews });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    if (!body.name || !body.email || !body.rating || !body.text) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    
    const formattedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
    
    const newReview = await Review.create({
      name: body.name,
      email: body.email,
      rating: Number(body.rating),
      product: body.product || "General / Service",
      text: body.text,
      status: "Pending", // Needs admin approval
      date: formattedDate,
    });
    
    return NextResponse.json({ success: true, data: newReview });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
