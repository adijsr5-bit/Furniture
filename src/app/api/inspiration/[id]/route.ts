import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import InspirationImage from "@/models/InspirationImage";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    
    const deletedImage = await InspirationImage.findByIdAndDelete(resolvedParams.id);
    
    if (!deletedImage) {
      return NextResponse.json({ success: false, error: "Image not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: deletedImage });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
