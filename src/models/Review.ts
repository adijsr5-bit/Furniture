import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  name: string;
  email: string;
  rating: number;
  product: string;
  text: string;
  status: "Pending" | "Published";
  date: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    product: { type: String, default: "General / Service" },
    text: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Published"], default: "Pending" },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
