"use client";

import { useState } from "react";
import ContactForm from "./ContactForm";
import ReviewForm from "./ReviewForm";
import { MessageSquare, Star } from "lucide-react";

export default function ContactTabs() {
  const [activeTab, setActiveTab] = useState<"message" | "review">("message");

  return (
    <div className="bg-white p-6 md:p-8 border border-brand-dark/10 shadow-sm rounded-sm">
      {/* Tab Selectors */}
      <div className="flex border-b border-brand-dark/10 mb-8 gap-4">
        <button
          onClick={() => setActiveTab("message")}
          className={`flex items-center gap-2 pb-4 text-xs uppercase tracking-widest font-semibold border-b-2 transition-all ${
            activeTab === "message"
              ? "border-brand-gold text-brand-gold"
              : "border-transparent text-brand-dark/65 hover:text-brand-dark"
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Send Message
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={`flex items-center gap-2 pb-4 text-xs uppercase tracking-widest font-semibold border-b-2 transition-all ${
            activeTab === "review"
              ? "border-brand-gold text-brand-gold"
              : "border-transparent text-brand-dark/65 hover:text-brand-dark"
          }`}
        >
          <Star className="w-4 h-4" /> Write a Review
        </button>
      </div>

      {/* Dynamic Tab Body */}
      <div className="fade-in">
        {activeTab === "message" ? (
          <div>
            <h3 className="font-serif text-2xl text-brand-dark mb-6">Send a Message</h3>
            <ContactForm />
          </div>
        ) : (
          <div>
            <h3 className="font-serif text-2xl text-brand-dark mb-6">Write a Review</h3>
            <ReviewForm />
          </div>
        )}
      </div>
    </div>
  );
}
