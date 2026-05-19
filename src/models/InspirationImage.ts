import mongoose, { Schema, Document } from "mongoose";

export interface IInspirationImage extends Document {
  url: string;
  caption: string;
  createdAt: Date;
}

const InspirationImageSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.InspirationImage || mongoose.model<IInspirationImage>("InspirationImage", InspirationImageSchema);
