import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AboutSection from "@/models/AboutSection";

const defaultSections = [
  {
    label: "Our Heritage",
    title: "A Legacy of Design",
    content: "Luxe Furnishings was founded on a simple principle: that the spaces we inhabit should elevate our daily lives. For over a decade, we have traveled the globe to source the finest materials, partnering with master artisans who share our uncompromising commitment to quality.",
    order: 1
  },
  {
    label: "The Vision",
    title: "Elevating Lifestyles",
    content: "Every piece in our collection represents a dialogue between timeless tradition and contemporary aesthetics, designed not just to occupy space, but to transform it.",
    order: 2
  }
];

export async function GET() {
  try {
    await connectDB();
    let sections = await AboutSection.find({}).sort({ order: 1 });
    
    if (sections.length === 0) {
      sections = await AboutSection.create(defaultSections);
    }
    
    return NextResponse.json({ success: true, data: sections });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    if (!body.label || !body.title || !body.content) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    
    const newSection = await AboutSection.create({
      label: body.label,
      title: body.title,
      content: body.content,
      order: body.order ? Number(body.order) : 0,
    });
    
    return NextResponse.json({ success: true, data: newSection });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
