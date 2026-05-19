import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

const sampleProducts = [
  {
    name: "The Oslo Sofa", slug: "oslo-sofa", category: "Living Room", price: "$3,200", isTrending: true,
    description: "The Oslo Sofa brings timeless Scandinavian elegance to your living space. Handcrafted with precision, its minimalist silhouette hides an incredibly supportive structure, perfect for both formal entertaining and relaxed lounging.",
    material: "Italian Top-Grain Leather, Solid Ash Wood Frame, High-Resiliency Foam",
    dimensions: "W: 88\" x D: 36\" x H: 32\"", finishOptions: ["Cognac Leather", "Matte Black Leather", "Oatmeal Linen"],
    images: ["https://images.unsplash.com/photo-1540574163026-643ea20d25b5?q=80&w=2070&auto=format&fit=crop", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop"]
  },
  {
    name: "Aero Lounge Chair", slug: "aero-lounge", category: "Accent Seating", price: "$1,850", isTrending: true,
    description: "Defying gravity with its floating design, the Aero Lounge Chair is a masterclass in modern physics and design. The seamless integration of premium materials offers a seating experience that is as visually striking as it is comfortable.",
    material: "Brushed Steel, Walnut Veneer, Premium Wool Blend",
    dimensions: "W: 30\" x D: 32\" x H: 34\"", finishOptions: ["Charcoal Wool", "Forest Green Velvet"],
    images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1974&auto=format&fit=crop"]
  },
  {
    name: "Monolith Dining Table", slug: "monolith-table", category: "Dining", price: "$4,500", isTrending: true,
    description: "A monumental centerpiece for your dining room. The Monolith Table features a stunning single slab aesthetic, supported by a geometric base that plays with light and shadow.",
    material: "Solid Walnut, Burnished Brass Accents",
    dimensions: "L: 96\" x W: 42\" x H: 30\"", finishOptions: ["Natural Walnut", "Ebonized Oak"],
    images: ["https://images.unsplash.com/photo-1533090368676-1fd25485ce69?q=80&w=2070&auto=format&fit=crop"]
  },
  {
    name: "Lumina Pendant Light", slug: "lumina-pendant", category: "Lighting", price: "$850", isTrending: true,
    description: "The Lumina Pendant provides a warm, ambient glow. Its sculptural brass housing is both a statement piece and a masterclass in modern industrial design.",
    material: "Brushed Brass, Frosted Glass",
    dimensions: "D: 24\" x H: 18\"", finishOptions: ["Brushed Brass", "Matte Black"],
    images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop"]
  },
  {
    name: "Crescent Bed Frame", slug: "crescent-bed", category: "Bedroom", price: "$2,900", isTrending: false,
    description: "Experience the ultimate in relaxation. The Crescent Bed Frame features a gently curved, upholstered headboard that invites you to unwind in absolute luxury.",
    material: "Bouclé Fabric, Solid White Oak",
    dimensions: "King: W: 80\" x L: 86\" x H: 44\"", finishOptions: ["Ivory Bouclé", "Charcoal Linen"],
    images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2022&auto=format&fit=crop"]
  },
  {
    name: "Verona Velvet Sofa", slug: "verona-sofa", category: "Living Room", price: "$3,800", isTrending: false,
    description: "Plush, deep, and impossibly soft. The Verona Sofa is designed for those who refuse to compromise on either style or comfort.",
    material: "Italian Velvet, Kiln-Dried Hardwood",
    dimensions: "W: 94\" x D: 40\" x H: 34\"", finishOptions: ["Emerald Green", "Sapphire Blue", "Blush Pink"],
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop"]
  },
  {
    name: "Eclipse Coffee Table", slug: "eclipse-coffee-table", category: "Living Room", price: "$1,200", isTrending: false,
    description: "A stunning interplay of glass and marble, the Eclipse Coffee Table is a sculptural element that grounds any seating arrangement.",
    material: "Nero Marquina Marble, Smoked Glass, Black Powder-Coated Steel",
    dimensions: "D: 36\" x H: 16\"", finishOptions: ["Nero Marquina", "Carrara Marble"],
    images: ["https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1976&auto=format&fit=crop"]
  },
  {
    name: "Nova Dining Chair", slug: "nova-dining-chair", category: "Dining", price: "$450", isTrending: false,
    description: "Ergonomically perfect and aesthetically striking. The Nova chair complements any modern dining table with its understated elegance.",
    material: "Molded Plywood, Top-Grain Leather Seat",
    dimensions: "W: 19\" x D: 21\" x H: 32\"", finishOptions: ["Walnut/Black Leather", "Ash/White Leather"],
    images: ["https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1974&auto=format&fit=crop"]
  },
  {
    name: "Aura Floor Lamp", slug: "aura-floor-lamp", category: "Lighting", price: "$650", isTrending: false,
    description: "Sleek and statuesque, the Aura Floor Lamp casts a soft, indirect light that transforms the mood of any room.",
    material: "Matte Black Steel, Opal Glass",
    dimensions: "Base: 12\" x H: 65\"", finishOptions: ["Matte Black", "Antique Brass"],
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974&auto=format&fit=crop"]
  },
  {
    name: "Zenith Bookshelf", slug: "zenith-bookshelf", category: "Storage", price: "$2,100", isTrending: true,
    description: "An architectural approach to storage. The Zenith Bookshelf's asymmetrical open shelving creates a gallery-like display for your curated objects and books.",
    material: "Solid Teak Wood, Black Metal Accents",
    dimensions: "W: 72\" x D: 14\" x H: 80\"", finishOptions: ["Natural Teak", "Dark Stained Teak"],
    images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=2039&auto=format&fit=crop"]
  },
  {
    name: "Luxe Nightstand", slug: "luxe-nightstand", category: "Bedroom", price: "$550", isTrending: false,
    description: "A perfect companion to your bed, featuring soft-close drawers and a seamless, handle-less design.",
    material: "Walnut Veneer, Matte Lacquer",
    dimensions: "W: 24\" x D: 16\" x H: 20\"", finishOptions: ["Walnut/White", "All Black"],
    images: ["https://images.unsplash.com/photo-1532372576444-ea2f7d3838bb?q=80&w=2070&auto=format&fit=crop"]
  },
  {
    name: "Kanso Platform Bed", slug: "kanso-platform-bed", category: "Bedroom", price: "$2,400", isTrending: false,
    description: "Inspired by Japanese minimalism, the Kanso Platform Bed floats slightly above the ground, creating a serene and grounded bedroom environment.",
    material: "Solid Maple Wood",
    dimensions: "Queen: W: 64\" x L: 84\" x H: 12\"", finishOptions: ["Natural Maple", "Espresso Stain"],
    images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop"]
  },
  {
    name: "Artisan Credenza", slug: "artisan-credenza", category: "Storage", price: "$3,100", isTrending: false,
    description: "A functional work of art. The Artisan Credenza features hand-carved detailing on the solid wood doors, offering ample storage with unmatched style.",
    material: "Solid Mango Wood, Brass Hardware",
    dimensions: "W: 78\" x D: 18\" x H: 30\"", finishOptions: ["Natural Mango", "Whitewashed"],
    images: ["https://images.unsplash.com/photo-1601366533287-5ee4c763ae4e?q=80&w=2069&auto=format&fit=crop"]
  },
  {
    name: "Silhouette Mirror", slug: "silhouette-mirror", category: "Decor", price: "$400", isTrending: true,
    description: "An oversized, organically shaped mirror that acts as a window, expanding your space and reflecting light beautifully.",
    material: "Mirrored Glass, Ultra-thin Brass Frame",
    dimensions: "W: 36\" x H: 72\"", finishOptions: ["Brass Frame", "Black Frame"],
    images: ["https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=2070&auto=format&fit=crop"]
  },
  {
    name: "Haven Outdoor Lounge", slug: "haven-outdoor", category: "Outdoor", price: "$2,800", isTrending: false,
    description: "Bring luxury living to your exterior spaces. The Haven Outdoor Lounge is weather-resistant without sacrificing the comfort of indoor furniture.",
    material: "Powder-coated Aluminum, Sunbrella Fabric",
    dimensions: "W: 82\" x D: 36\" x H: 28\"", finishOptions: ["White/Sand", "Charcoal/Slate"],
    images: ["https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1974&auto=format&fit=crop"]
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing
    await Product.deleteMany({});
    
    // Insert new
    await Product.insertMany(sampleProducts);
    
    return NextResponse.json({ success: true, message: "Database seeded successfully with sample products." });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
