import mongoose, { Schema, Document } from "mongoose";

export interface IAboutSection extends Document {
  label: string;
  title: string;
  content: string;
  order: number;
}

const AboutSectionSchema: Schema = new Schema(
  {
    label: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.AboutSection || mongoose.model<IAboutSection>("AboutSection", AboutSectionSchema);
