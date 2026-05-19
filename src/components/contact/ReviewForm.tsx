"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      rating,
      product: formData.get("product") || "General Service",
      text: formData.get("comment"),
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const resData = await res.json();
      if (resData.success) {
        alert("Thank you for sharing your experience! Your review has been submitted for moderation.");
        (e.target as HTMLFormElement).reset();
        setRating(5);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Full Name</label>
          <input name="name" required className="w-full border-b border-brand-dark/20 py-2 bg-transparent focus:outline-none focus:border-brand-gold" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Email Address</label>
          <input name="email" type="email" required className="w-full border-b border-brand-dark/20 py-2 bg-transparent focus:outline-none focus:border-brand-gold" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Product / Collection Reviewed</label>
          <input name="product" placeholder="e.g. Oslo Sofa (Optional)" className="w-full border-b border-brand-dark/20 py-2 bg-transparent focus:outline-none focus:border-brand-gold placeholder:text-gray-400 placeholder:font-light" />
        </div>
        <div className="pb-2">
          <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Rating</label>
          <div className="flex gap-1.5 items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform active:scale-90"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= (hoverRating ?? rating) 
                      ? "text-brand-gold fill-brand-gold" 
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
            <span className="text-xs text-brand-dark/60 font-light ml-2">({rating} Stars)</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Your Review / Experience</label>
        <textarea name="comment" required rows={4} placeholder="Describe the quality, delivery, and overall satisfaction..." className="w-full border-b border-brand-dark/20 py-2 bg-transparent focus:outline-none focus:border-brand-gold placeholder:text-gray-400 placeholder:font-light" />
      </div>

      <button 
        type="submit" 
        disabled={submitting}
        className="w-full bg-brand-dark text-white py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors mt-6 disabled:bg-gray-400 flex items-center justify-center gap-2"
      >
        {submitting ? "Submitting Review..." : "Submit Review"}
      </button>
    </form>
  );
}
