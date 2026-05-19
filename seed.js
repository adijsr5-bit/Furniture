const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://adijsr5_db_user:t1vjnKYxQDBjmThI@ac-pjlpy7q-shard-00-00.lmhthv3.mongodb.net:27017,ac-pjlpy7q-shard-00-01.lmhthv3.mongodb.net:27017,ac-pjlpy7q-shard-00-02.lmhthv3.mongodb.net:27017/luxury-furniture?ssl=true&replicaSet=atlas-swfsg7-shard-0&authSource=admin&retryWrites=true&w=majority&appName=luxury-furniture";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  material: { type: String, required: true },
  dimensions: { type: String, required: true },
  finishOptions: [{ type: String }],
  images: [{ type: String }],
  isTrending: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const products = [
  { name: "The Oslo Sofa", slug: "oslo-sofa", category: "Living Room", price: "$3,200", isTrending: true, description: "Timeless Scandinavian elegance.", material: "Italian Top-Grain Leather, Solid Ash Wood Frame", dimensions: "W: 88\" x D: 36\" x H: 32\"", finishOptions: ["Cognac Leather", "Matte Black Leather"], images: ["https://images.unsplash.com/photo-1540574163026-643ea20d25b5?q=80&w=2070"] },
  { name: "Aero Lounge Chair", slug: "aero-lounge", category: "Accent Seating", price: "$1,850", isTrending: true, description: "Floating design masterclass.", material: "Brushed Steel, Walnut Veneer", dimensions: "W: 30\" x D: 32\" x H: 34\"", finishOptions: ["Charcoal Wool"], images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1974"] },
  { name: "Monolith Dining Table", slug: "monolith-table", category: "Dining", price: "$4,500", isTrending: true, description: "A monumental centerpiece.", material: "Solid Walnut, Burnished Brass Accents", dimensions: "L: 96\" x W: 42\" x H: 30\"", finishOptions: ["Natural Walnut"], images: ["https://images.unsplash.com/photo-1533090368676-1fd25485ce69?q=80&w=2070"] },
  { name: "Lumina Pendant Light", slug: "lumina-pendant", category: "Lighting", price: "$850", isTrending: true, description: "Warm, ambient glow.", material: "Brushed Brass, Frosted Glass", dimensions: "D: 24\" x H: 18\"", finishOptions: ["Brushed Brass"], images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069"] },
  { name: "Crescent Bed Frame", slug: "crescent-bed", category: "Bedroom", price: "$2,900", isTrending: false, description: "Experience ultimate relaxation.", material: "Bouclé Fabric, Solid White Oak", dimensions: "King: W: 80\" x L: 86\" x H: 44\"", finishOptions: ["Ivory Bouclé"], images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2022"] },
  { name: "Verona Velvet Sofa", slug: "verona-sofa", category: "Living Room", price: "$3,800", isTrending: false, description: "Plush, deep, and impossibly soft.", material: "Italian Velvet, Kiln-Dried Hardwood", dimensions: "W: 94\" x D: 40\" x H: 34\"", finishOptions: ["Emerald Green"], images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070"] },
  { name: "Eclipse Coffee Table", slug: "eclipse-coffee-table", category: "Living Room", price: "$1,200", isTrending: false, description: "Interplay of glass and marble.", material: "Nero Marquina Marble", dimensions: "D: 36\" x H: 16\"", finishOptions: ["Nero Marquina"], images: ["https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1976"] },
  { name: "Nova Dining Chair", slug: "nova-dining-chair", category: "Dining", price: "$450", isTrending: false, description: "Ergonomically perfect.", material: "Molded Plywood, Top-Grain Leather Seat", dimensions: "W: 19\" x D: 21\" x H: 32\"", finishOptions: ["Walnut/Black Leather"], images: ["https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1974"] },
  { name: "Aura Floor Lamp", slug: "aura-floor-lamp", category: "Lighting", price: "$650", isTrending: false, description: "Sleek and statuesque.", material: "Matte Black Steel", dimensions: "Base: 12\" x H: 65\"", finishOptions: ["Matte Black"], images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974"] },
  { name: "Zenith Bookshelf", slug: "zenith-bookshelf", category: "Storage", price: "$2,100", isTrending: true, description: "Architectural approach to storage.", material: "Solid Teak Wood", dimensions: "W: 72\" x D: 14\" x H: 80\"", finishOptions: ["Natural Teak"], images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=2039"] },
  { name: "Luxe Nightstand", slug: "luxe-nightstand", category: "Bedroom", price: "$550", isTrending: false, description: "Perfect companion to your bed.", material: "Walnut Veneer", dimensions: "W: 24\" x D: 16\" x H: 20\"", finishOptions: ["Walnut/White"], images: ["https://images.unsplash.com/photo-1532372576444-ea2f7d3838bb?q=80&w=2070"] },
  { name: "Kanso Platform Bed", slug: "kanso-platform-bed", category: "Bedroom", price: "$2,400", isTrending: false, description: "Japanese minimalism.", material: "Solid Maple Wood", dimensions: "Queen: W: 64\" x L: 84\" x H: 12\"", finishOptions: ["Natural Maple"], images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070"] },
  { name: "Artisan Credenza", slug: "artisan-credenza", category: "Storage", price: "$3,100", isTrending: false, description: "A functional work of art.", material: "Solid Mango Wood", dimensions: "W: 78\" x D: 18\" x H: 30\"", finishOptions: ["Natural Mango"], images: ["https://images.unsplash.com/photo-1601366533287-5ee4c763ae4e?q=80&w=2069"] },
  { name: "Silhouette Mirror", slug: "silhouette-mirror", category: "Decor", price: "$400", isTrending: true, description: "Organically shaped mirror.", material: "Mirrored Glass", dimensions: "W: 36\" x H: 72\"", finishOptions: ["Brass Frame"], images: ["https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=2070"] },
  { name: "Haven Outdoor Lounge", slug: "haven-outdoor", category: "Outdoor", price: "$2,800", isTrending: false, description: "Bring luxury living to exterior.", material: "Powder-coated Aluminum", dimensions: "W: 82\" x D: 36\" x H: 28\"", finishOptions: ["White/Sand"], images: ["https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1974"] },
  // Adding 15 more to make 30 items
  { name: "Nordic Lounge Chair", slug: "nordic-lounge-chair", category: "Accent Seating", price: "$1,100", isTrending: false, description: "Cozy minimal lounge seating.", material: "Ash Wood, Wool", dimensions: "W: 28\" x D: 30\" x H: 32\"", finishOptions: ["Light Ash"], images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1965"] },
  { name: "Elegance Dining Table", slug: "elegance-dining-table", category: "Dining", price: "$3,500", isTrending: false, description: "Minimalist dining perfection.", material: "Oak Wood", dimensions: "L: 80\" x W: 36\" x H: 30\"", finishOptions: ["Oak"], images: ["https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1974"] },
  { name: "Rustic Coffee Table", slug: "rustic-coffee-table", category: "Living Room", price: "$900", isTrending: false, description: "Raw wood beauty.", material: "Reclaimed Wood", dimensions: "D: 36\" x H: 18\"", finishOptions: ["Natural"], images: ["https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=1974"] },
  { name: "Velvet Accent Ottoman", slug: "velvet-accent-ottoman", category: "Accent Seating", price: "$350", isTrending: false, description: "Soft luxurious footrest.", material: "Velvet, Steel", dimensions: "W: 20\" x D: 20\" x H: 16\"", finishOptions: ["Blush Pink"], images: ["https://images.unsplash.com/photo-1540574163026-643ea20d25b5?q=80&w=2070"] },
  { name: "Modernist Chandelier", slug: "modernist-chandelier", category: "Lighting", price: "$1,200", isTrending: false, description: "Striking aerial light.", material: "Brass", dimensions: "W: 40\" x H: 20\"", finishOptions: ["Brass"], images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069"] },
  { name: "Marble Side Table", slug: "marble-side-table", category: "Living Room", price: "$450", isTrending: false, description: "Elegant companion piece.", material: "Marble, Iron", dimensions: "D: 18\" x H: 22\"", finishOptions: ["White Marble"], images: ["https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1976"] },
  { name: "Leather Club Chair", slug: "leather-club-chair", category: "Accent Seating", price: "$2,200", isTrending: false, description: "Vintage sophisticated seating.", material: "Top-grain Leather", dimensions: "W: 34\" x D: 36\" x H: 32\"", finishOptions: ["Cognac"], images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1974"] },
  { name: "Minimalist Desk", slug: "minimalist-desk", category: "Office", price: "$1,400", isTrending: false, description: "Clean workspace.", material: "Walnut", dimensions: "W: 60\" x D: 24\" x H: 30\"", finishOptions: ["Walnut"], images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=2070"] },
  { name: "Executive Office Chair", slug: "executive-office-chair", category: "Office", price: "$800", isTrending: false, description: "Ergonomic luxury.", material: "Leather, Aluminum", dimensions: "W: 26\" x D: 26\" x H: 44\"", finishOptions: ["Black Leather"], images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2070"] },
  { name: "Ceramic Table Lamp", slug: "ceramic-table-lamp", category: "Lighting", price: "$250", isTrending: false, description: "Soft bedside glow.", material: "Ceramic", dimensions: "D: 12\" x H: 20\"", finishOptions: ["White Ceramic"], images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974"] },
  { name: "Floating TV Unit", slug: "floating-tv-unit", category: "Storage", price: "$1,600", isTrending: false, description: "Seamless entertainment storage.", material: "Oak Veneer", dimensions: "W: 80\" x D: 16\" x H: 12\"", finishOptions: ["Natural Oak"], images: ["https://images.unsplash.com/photo-1601366533287-5ee4c763ae4e?q=80&w=2069"] },
  { name: "Plush Area Rug", slug: "plush-area-rug", category: "Decor", price: "$750", isTrending: false, description: "Hand-tufted softness.", material: "New Zealand Wool", dimensions: "8' x 10'", finishOptions: ["Ivory"], images: ["https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=1974"] },
  { name: "Teak Outdoor Chair", slug: "teak-outdoor-chair", category: "Outdoor", price: "$600", isTrending: false, description: "Weatherproof elegance.", material: "Solid Teak", dimensions: "W: 24\" x D: 26\" x H: 34\"", finishOptions: ["Natural Teak"], images: ["https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1974"] },
  { name: "Abstract Canvas Art", slug: "abstract-canvas-art", category: "Decor", price: "$1,200", isTrending: false, description: "Original large-scale painting.", material: "Canvas, Oil", dimensions: "W: 48\" x H: 60\"", finishOptions: ["Multicolor"], images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071"] },
  { name: "Woven Storage Basket", slug: "woven-storage-basket", category: "Decor", price: "$120", isTrending: false, description: "Artisanal woven container.", material: "Seagrass", dimensions: "D: 18\" x H: 16\"", finishOptions: ["Natural"], images: ["https://images.unsplash.com/photo-1584988290379-389d4fb91e0a?q=80&w=1964"] }
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB!");
    
    console.log("Dropping existing products...");
    await Product.deleteMany({});
    
    console.log("Inserting 30 products...");
    await Product.insertMany(products);
    
    console.log("Successfully seeded 30 items!");
    process.exit(0);
  } catch (error) {
    console.error("MongoDB Connection/Seed Error:", error);
    process.exit(1);
  }
}

seed();
