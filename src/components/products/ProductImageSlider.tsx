"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductImageSlider({ images, productName }: { images: string[], productName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const imagesList = images && images.length > 0 ? images : ["/placeholder.jpg"];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesList.length) % imagesList.length);
  };

  // Autoplay Logic
  useEffect(() => {
    if (!isHovered && imagesList.length > 1) {
      autoPlayRef.current = setInterval(nextSlide, 4000); // Auto slide every 4 seconds
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, imagesList.length]);

  return (
    <div 
      className="space-y-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image Slider Wrapper */}
      <div className="relative h-[350px] md:h-[500px] lg:h-[600px] w-full bg-white rounded-sm overflow-hidden group shadow-sm border border-brand-dark/5">
        
        {/* Images List Container */}
        <div 
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${imagesList.length * 100}%` }}
        >
          {imagesList.map((img, idx) => (
            <div key={idx} className="relative h-full w-full shrink-0">
              <Image 
                src={img} 
                alt={`${productName} - Slide ${idx + 1}`} 
                fill 
                priority={idx === 0}
                className="object-cover" 
              />
            </div>
          ))}
        </div>

        {/* Overlay Navigation Arrows */}
        {imagesList.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-brand-gold hover:text-white text-brand-dark p-3 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-brand-gold hover:text-white text-brand-dark p-3 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Index Indicator Pill */}
        {imagesList.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-brand-dark/75 text-white px-3 py-1 text-xs font-light tracking-widest rounded-full z-10">
            {currentIndex + 1} / {imagesList.length}
          </div>
        )}
      </div>

      {/* Horizontal Thumbnail Row */}
      {imagesList.length > 1 && (
        <div className="flex gap-4 pb-2 overflow-x-auto no-scrollbar snap-x">
          {imagesList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-[80px] w-[80px] md:h-[100px] md:w-[100px] bg-white rounded-sm overflow-hidden shrink-0 border-2 transition-all duration-300 snap-start ${
                currentIndex === idx ? "border-brand-gold opacity-100" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image 
                src={img} 
                alt={`${productName} thumbnail ${idx + 1}`} 
                fill 
                className="object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
