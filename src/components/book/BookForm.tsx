"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BookForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    preferredDate: "",
    customRequirement: "",
    productName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const product = params.get("product");
      if (product) {
        setFormData(prev => ({ ...prev, productName: product }));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", city: "", preferredDate: "", customRequirement: "", productName: "" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-brand-beige p-8 text-center text-brand-dark">
        <h3 className="font-serif text-2xl mb-4">Request Received</h3>
        <p className="font-light">Thank you for your interest. Our team will contact you shortly to confirm your visit.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-dark mb-2">Full Name</label>
          <input
            type="text"
            required
            className="w-full border-b border-brand-walnut/30 bg-transparent py-3 focus:outline-none focus:border-brand-gold transition-colors font-light"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-dark mb-2">Email Address</label>
          <input
            type="email"
            required
            className="w-full border-b border-brand-walnut/30 bg-transparent py-3 focus:outline-none focus:border-brand-gold transition-colors font-light"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-dark mb-2">Phone Number</label>
          <input
            type="tel"
            required
            className="w-full border-b border-brand-walnut/30 bg-transparent py-3 focus:outline-none focus:border-brand-gold transition-colors font-light"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-dark mb-2">City</label>
          <input
            type="text"
            required
            className="w-full border-b border-brand-walnut/30 bg-transparent py-3 focus:outline-none focus:border-brand-gold transition-colors font-light"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-brand-dark mb-2">Preferred Date</label>
          <input
            type="date"
            className="w-full border-b border-brand-walnut/30 bg-transparent py-3 focus:outline-none focus:border-brand-gold transition-colors font-light text-brand-dark/80"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-brand-dark mb-2">Interested Product (Optional)</label>
        <input
          type="text"
          className="w-full border-b border-brand-walnut/30 bg-transparent py-3 focus:outline-none focus:border-brand-gold transition-colors font-light text-brand-gold font-medium"
          value={formData.productName}
          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          placeholder="e.g. The Oslo Sofa"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-brand-dark mb-2">Specific Requirements (Optional)</label>
        <textarea
          rows={4}
          className="w-full border-b border-brand-walnut/30 bg-transparent py-3 focus:outline-none focus:border-brand-gold transition-colors font-light resize-none"
          value={formData.customRequirement}
          onChange={(e) => setFormData({ ...formData, customRequirement: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-dark text-white py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
