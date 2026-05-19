import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const body = await request.json();
    await connectDB();
    const product = await Product.findOneAndUpdate({ slug: resolvedParams.slug }, body, { new: true });
    if (!product) return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    await connectDB();
    const product = await Product.findOneAndDelete({ slug: resolvedParams.slug });
    if (!product) return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    await connectDB();
    const product = await Product.findOne({ slug: resolvedParams.slug });
    
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
