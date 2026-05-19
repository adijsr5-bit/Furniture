import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Product from "@/models/Product";
import connectDB from "@/lib/db";

async function getProducts() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 bg-brand-cream min-h-screen">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-16 fade-in">
            <h1 className="font-serif text-5xl md:text-6xl text-brand-dark mb-4">The Collection</h1>
            <p className="text-brand-dark/70 font-light text-lg max-w-2xl">
              Explore our complete range of meticulously crafted furniture, designed to elevate your living spaces with uncompromising quality and timeless elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product: any, index: number) => (
              <div key={product._id} className="group cursor-pointer fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link href={`/products/${product.slug}`}>
                  <div className="relative h-[280px] md:h-[450px] mb-6 overflow-hidden bg-white/50 rounded-sm">
                    <Image
                      src={product.images[0] || "https://images.unsplash.com/photo-1540574163026-643ea20d25b5"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-brand-dark px-6 py-3 uppercase text-xs tracking-widest font-medium flex items-center gap-2 shadow-xl">
                        View Details
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs text-brand-dark/50 uppercase tracking-wider mb-2 block font-light">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-2xl text-brand-dark group-hover:text-brand-gold transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    <span className="text-brand-dark font-light">{product.price}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
