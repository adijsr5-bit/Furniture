import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import InspirationImage from "@/models/InspirationImage";

const defaultImages = [
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop", caption: "Timeless Minimalist Living Lounge" },
  { url: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=2070&auto=format&fit=crop", caption: "Warm Japandi Bedroom Curation" },
  { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop", caption: "Modern Oak Dining Setup" },
  { url: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1974&auto=format&fit=crop", caption: "Sleek Contemporary Kitchen" },
  { url: "https://images.unsplash.com/photo-1601366533287-5ee4c763ae4e?q=80&w=2069&auto=format&fit=crop", caption: "Aesthetic Hallway & Accent Armchair" },
  { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2064&auto=format&fit=crop", caption: "Artisanal Living Room Corner" }
];

export async function GET() {
  try {
    await connectDB();
    let images = await InspirationImage.find({}).sort({ createdAt: -1 });
    
    if (images.length === 0) {
      images = await InspirationImage.create(defaultImages);
    }
    
    return NextResponse.json({ success: true, data: images });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    if (!body.url) {
      return NextResponse.json({ success: false, error: "Image URL is required" }, { status: 400 });
    }
    
    const newImage = await InspirationImage.create({
      url: body.url,
      caption: body.caption || "",
    });
    
    return NextResponse.json({ success: true, data: newImage });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
