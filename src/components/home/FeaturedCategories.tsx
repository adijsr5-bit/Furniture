"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedCategories({ settings }: { settings: any }) {
  const categories = [
    {
      id: 1,
      name: "Living Room",
      image: settings?.livingRoomImage || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
      link: "/categories/living-room"
    },
    {
      id: 2,
      name: "Bedroom",
      image: settings?.bedroomImage || "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2022&auto=format&fit=crop",
      link: "/categories/bedroom"
    },
    {
      id: 3,
      name: "Dining",
      image: settings?.diningRoomImage || "https://images.unsplash.com/photo-1617806118233-18e1c094ddcb?q=80&w=2128&auto=format&fit=crop",
      link: "/categories/dining"
    }
  ];

  return (
    <section className="py-24 bg-brand-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">Curated Spaces</h2>
            <p className="text-brand-dark/70 font-light text-lg">
              Explore our meticulously designed collections tailored for every room in your luxury home.
            </p>
          </div>
          <Link href="/categories" className="group flex items-center gap-2 text-sm uppercase tracking-widest text-brand-dark font-medium border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
            All Categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden block"
            >
              <Link href={category.link}>
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/10 transition-colors duration-700 z-10" />
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                  <h3 className="text-white font-serif text-3xl mb-2 drop-shadow-md">{category.name}</h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm uppercase tracking-widest opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
