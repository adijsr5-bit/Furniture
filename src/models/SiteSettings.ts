import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  brandName: string;
  logoUrl: string;
  primaryColor: string;
  backgroundColor: string;
  seoTitle: string;
  seoDescription: string;
  contactEmail: string;
  whatsappNumber: string;
  storeAddress: string;
  shippingPolicy: string;
  returnPolicy: string;
  instagramUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  livingRoomImage: string;
  bedroomImage: string;
  diningRoomImage: string;
  footerTagline: string;
  footerCopyright: string;
}

const SiteSettingsSchema: Schema = new Schema({
  brandName: { type: String, default: "Luxe Furnishings" },
  logoUrl: { type: String, default: "" },
  primaryColor: { type: String, default: "#C19B76" },
  backgroundColor: { type: String, default: "#F9F7F3" },
  seoTitle: { type: String, default: "Luxe Furnishings | Premium Interior Design Studio" },
  seoDescription: { type: String, default: "Explore our world-class premium furniture collection." },
  contactEmail: { type: String, default: "concierge@luxefurnishings.com" },
  whatsappNumber: { type: String, default: "+1800123LUXE" },
  storeAddress: { type: String, default: "123 Luxury Avenue, Design District, New York, NY 10001" },
  shippingPolicy: { type: String, default: "White Glove Delivery\nWe provide complimentary white glove delivery on all orders over $5,000..." },
  returnPolicy: { type: String, default: "Our Commitment to Excellence\nWe stand behind the unparalleled quality of our craftsmanship..." },
  instagramUrl: { type: String, default: "https://instagram.com/luxefurnishings" },
  facebookUrl: { type: String, default: "https://facebook.com/luxefurnishings" },
  twitterUrl: { type: String, default: "https://twitter.com/luxefurnishings" },
  livingRoomImage: { type: String, default: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop" },
  bedroomImage: { type: String, default: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2022&auto=format&fit=crop" },
  diningRoomImage: { type: String, default: "https://images.unsplash.com/photo-1617806118233-18e1c094ddcb?q=80&w=2128&auto=format&fit=crop" },
  footerTagline: { type: String, default: "Crafted for Premium Lifestyles." },
  footerCopyright: { type: String, default: "Luxe Furnishings. All rights reserved." },
});

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
