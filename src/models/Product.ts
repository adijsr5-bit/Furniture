import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: string;
  price: string;
  description: string;
  material: string;
  dimensions: string;
  finishOptions: string[];
  images: string[];
  isAvailable: boolean;
  isTrending: boolean;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  material: { type: String, required: true },
  dimensions: { type: String, required: true },
  finishOptions: [{ type: String }],
  images: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  isTrending: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
