import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  phone: string;
  city: string;
  productName?: string;
  preferredDate?: Date;
  customRequirement?: string;
  status: "New" | "Contacted" | "Confirmed" | "Visited" | "Closed";
  createdAt: Date;
}

const InquirySchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  productName: { type: String },
  preferredDate: { type: Date },
  customRequirement: { type: String },
  status: { 
    type: String, 
    enum: ["New", "Contacted", "Confirmed", "Visited", "Closed"], 
    default: "New" 
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
