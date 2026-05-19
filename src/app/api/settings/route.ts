import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";

export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne({});
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    
    let settings = await SiteSettings.findOne({});
    if (!settings) {
      settings = await SiteSettings.create(body);
    } else {
      settings = await SiteSettings.findOneAndUpdate({}, body, { new: true });
    }
    
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
