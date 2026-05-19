"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IProduct } from "@/models/Product";

export default function TrendingFurniture() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && data.data) {
          const trending = data.data.filter((p: any) => p.isTrending).slice(0, 4);
          setProducts(trending);
        }
      } catch (err) {
        console.error("Failed to fetch trending products", err);
      }
    };
    fetchTrending();
  }, []);
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-brand-gold text-sm uppercase tracking-widest font-medium mb-4 block">Iconic Pieces</span>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark">Trending Collection</h2>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-sm uppercase tracking-widest text-brand-dark font-medium border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-[280px] md:h-[400px] mb-6 overflow-hidden bg-brand-cream rounded-sm">
                  <Image
                    src={product.images?.[0] || "https://images.unsplash.com/photo-1540574163026-643ea20d25b5"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Quick view overlay */}
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
                    <h3 className="font-serif text-xl text-brand-dark group-hover:text-brand-gold transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <span className="text-brand-dark font-light">{product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
