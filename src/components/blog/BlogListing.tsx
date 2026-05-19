"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BookOpen, Calendar, Clock, X, ArrowRight, FileText } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string; // Dynamic DB structure splits paragraphs by \n\n
  image: string;
}

export default function BlogListing() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (err) {
        console.error("Failed to load blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map(post => post.category)))];

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-t-2 border-brand-gold border-solid rounded-full animate-spin mx-auto"></div>
        <p className="text-brand-dark/60 text-sm font-light mt-4">Curating article layouts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-24 text-center bg-white border border-brand-dark/5 p-8 max-w-xl mx-auto rounded-sm">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="font-serif text-xl text-brand-dark mb-2">No Articles Curated</h3>
        <p className="text-brand-dark/60 font-light text-sm">Please log in to the admin panel to publish your first design journal article.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar border-b border-brand-dark/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 text-xs uppercase tracking-widest transition-all duration-300 rounded-full border shrink-0 ${
              activeCategory === cat 
                ? "bg-brand-dark text-white border-brand-dark" 
                : "border-brand-dark/20 text-brand-dark/75 hover:border-brand-dark hover:text-brand-dark"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {filteredPosts.map((post) => (
          <article 
            key={post._id} 
            className="group cursor-pointer flex flex-col h-full bg-white border border-brand-dark/5 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm overflow-hidden"
            onClick={() => setSelectedPost(post)}
          >
            {/* Image Wrapper */}
            <div className="relative h-[250px] w-full overflow-hidden bg-brand-dark/5">
              <Image 
                src={post.image || "https://images.unsplash.com/photo-1540574163026-643ea20d25b5"} 
                alt={post.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <span className="absolute top-4 left-4 bg-brand-cream/90 backdrop-blur-sm text-brand-dark px-3 py-1 text-[10px] uppercase tracking-widest font-medium border border-brand-dark/10">
                {post.category}
              </span>
            </div>

            {/* Post Content Summary */}
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <div className="flex items-center gap-4 text-xs text-brand-dark/50 mb-3 font-light">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
              </div>

              <h3 className="font-serif text-2xl text-brand-dark mb-4 group-hover:text-brand-gold transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-brand-dark/70 font-light text-sm leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="mt-auto flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Reading Modal/Overlay for full large content */}
      {selectedPost && (
        <div className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-brand-cream w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative rounded-sm border border-brand-dark/10 fade-in">
            {/* Sticky Close Button */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 bg-brand-dark text-white p-2.5 hover:bg-brand-gold transition-colors rounded-full z-10"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner Image */}
            <div className="relative h-[300px] md:h-[450px] w-full">
              <Image 
                src={selectedPost.image || "https://images.unsplash.com/photo-1540574163026-643ea20d25b5"} 
                alt={selectedPost.title} 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/25 to-transparent flex flex-col justify-end p-8 md:p-12">
                <span className="text-brand-gold text-xs uppercase tracking-widest font-semibold mb-2 block">{selectedPost.category}</span>
                <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight drop-shadow-md">{selectedPost.title}</h2>
              </div>
            </div>

            {/* Article Body */}
            <div className="p-8 md:p-16 max-w-3xl mx-auto space-y-8">
              {/* Meta information */}
              <div className="flex items-center gap-6 text-sm text-brand-dark/60 border-b border-brand-dark/10 pb-6 font-light">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-gold" /> {selectedPost.date}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-gold" /> {selectedPost.readTime}</span>
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-brand-gold" /> Written by Luxe Curation Team</span>
              </div>

              {/* Large Content Blocks (split by double newlines) */}
              <div className="prose prose-lg max-w-none space-y-6 text-brand-dark/85 font-light leading-relaxed text-lg">
                {selectedPost.content.split("\n\n").map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="border-t border-brand-dark/10 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                <p className="text-brand-dark/60 font-light">Thank you for reading the Luxe Design Journal.</p>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="bg-brand-dark text-white px-8 py-3.5 uppercase tracking-widest text-xs hover:bg-brand-gold transition-colors font-medium"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
