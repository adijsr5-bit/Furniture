import connectDB from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { unstable_cache } from "next/cache";

export const getSiteSettings = unstable_cache(async () => {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne({});
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return JSON.parse(JSON.stringify(settings)); // Convert Mongoose Document to plain object
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {
      brandName: "Luxe Furnishings",
      logoUrl: "",
      primaryColor: "#C19B76",
      backgroundColor: "#F9F7F3",
      seoTitle: "Luxe Furnishings | Premium Interior Design Studio",
      seoDescription: "Explore our world-class premium furniture collection.",
      contactEmail: "concierge@luxefurnishings.com",
      whatsappNumber: "+1800123LUXE",
      storeAddress: "123 Luxury Avenue, Design District, New York, NY 10001",
      shippingPolicy: "White Glove Delivery...",
      returnPolicy: "Our Commitment to Excellence...",
      instagramUrl: "https://instagram.com/luxefurnishings",
      facebookUrl: "https://facebook.com/luxefurnishings",
      twitterUrl: "https://twitter.com/luxefurnishings",
      livingRoomImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
      bedroomImage: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2022&auto=format&fit=crop",
      diningRoomImage: "https://images.unsplash.com/photo-1617806118233-18e1c094ddcb?q=80&w=2128&auto=format&fit=crop",
      footerTagline: "Crafted for Premium Lifestyles.",
      footerCopyright: "Luxe Furnishings. All rights reserved.",
    };
  }
}, ["site-settings"], { revalidate: 60 });
