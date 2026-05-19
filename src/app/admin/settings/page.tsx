"use client";

import { useState, useEffect } from "react";
import { Save, Settings, BookOpen } from "lucide-react";
import AdminAboutManager from "@/components/admin/AdminAboutManager";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<"general" | "about">("general");
  const [formData, setFormData] = useState({
    brandName: "",
    logoUrl: "",
    primaryColor: "",
    secondaryColor: "",
    backgroundColor: "",
    seoTitle: "",
    seoDescription: "",
    contactEmail: "",
    whatsappNumber: "",
    storeAddress: "",
    instagramUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    shippingPolicy: "",
    returnPolicy: "",
    livingRoomImage: "",
    bedroomImage: "",
    diningRoomImage: "",
    footerTagline: "",
    footerCopyright: "",
  });
  
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.data) {
          setFormData(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) alert("Settings saved successfully to MongoDB!");
      else alert("Failed to save settings.");
    } catch (err) {
      alert("Error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="py-24 text-center">
      <div className="w-8 h-8 border-t-2 border-brand-gold rounded-full animate-spin mx-auto"></div>
    </div>
  );

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header and Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif text-brand-dark">Brand Control Center</h2>
          <p className="text-gray-500 text-xs font-light">Moderate global details, policies, and editorial sections.</p>
        </div>
        {activeTab === "general" && (
          <button 
            onClick={handleSubmit} 
            disabled={saving}
            className="bg-brand-dark text-white px-5 py-2.5 uppercase tracking-widest text-[10px] font-semibold hover:bg-brand-gold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" /> {saving ? "Saving..." : "Save Settings"}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b gap-4">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 pb-3 text-xs uppercase tracking-widest font-semibold border-b-2 transition-all ${
            activeTab === "general"
              ? "border-brand-gold text-brand-gold"
              : "border-transparent text-gray-500 hover:text-brand-dark"
          }`}
        >
          <Settings className="w-4 h-4" /> Global Settings
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 pb-3 text-xs uppercase tracking-widest font-semibold border-b-2 transition-all ${
            activeTab === "about"
              ? "border-brand-gold text-brand-gold"
              : "border-transparent text-gray-500 hover:text-brand-dark"
          }`}
        >
          <BookOpen className="w-4 h-4" /> About Us Story
        </button>
      </div>

      {/* Dynamic Body */}
      <div>
        {activeTab === "general" ? (
          <form className="space-y-8 bg-white p-6 md:p-8 rounded-sm shadow-sm border text-gray-900">
            {/* Brand Details */}
            <section>
              <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">Brand Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Brand Name</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" value={formData.brandName} onChange={e => setFormData({...formData, brandName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Logo URL (Optional)</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" placeholder="https://" value={formData.logoUrl} onChange={e => setFormData({...formData, logoUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Primary Color (Hex)</label>
                  <div className="flex items-center gap-2">
                    <input type="color" className="w-10 h-10 border-none bg-transparent" value={formData.primaryColor || "#000000"} onChange={e => setFormData({...formData, primaryColor: e.target.value})} />
                    <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" value={formData.primaryColor} onChange={e => setFormData({...formData, primaryColor: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Background Color (Hex)</label>
                  <div className="flex items-center gap-2">
                    <input type="color" className="w-10 h-10 border-none bg-transparent" value={formData.backgroundColor || "#ffffff"} onChange={e => setFormData({...formData, backgroundColor: e.target.value})} />
                    <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" value={formData.backgroundColor} onChange={e => setFormData({...formData, backgroundColor: e.target.value})} />
                  </div>
                </div>
              </div>
            </section>

            {/* Contact & Location */}
            <section>
              <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Contact Email</label>
                  <input type="email" className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">WhatsApp Number</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" value={formData.whatsappNumber} onChange={e => setFormData({...formData, whatsappNumber: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Store Address</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" value={formData.storeAddress} onChange={e => setFormData({...formData, storeAddress: e.target.value})} />
                </div>
              </div>
            </section>

            {/* SEO */}
            <section>
              <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">SEO Configuration</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">SEO Title</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" value={formData.seoTitle} onChange={e => setFormData({...formData, seoTitle: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">SEO Description</label>
                  <textarea rows={2} className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white font-light" value={formData.seoDescription} onChange={e => setFormData({...formData, seoDescription: e.target.value})} />
                </div>
              </div>
            </section>

            {/* Policies */}
            <section>
              <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">Store Policies</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Shipping Policy</label>
                  <textarea rows={4} className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white font-light" value={formData.shippingPolicy} onChange={e => setFormData({...formData, shippingPolicy: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Return Policy</label>
                  <textarea rows={4} className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white font-light" value={formData.returnPolicy} onChange={e => setFormData({...formData, returnPolicy: e.target.value})} />
                </div>
              </div>
            </section>

            {/* Social */}
            <section>
              <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">Social Media Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Instagram URL</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" value={formData.instagramUrl} onChange={e => setFormData({...formData, instagramUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Facebook URL</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" value={formData.facebookUrl} onChange={e => setFormData({...formData, facebookUrl: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Twitter/X URL</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" value={formData.twitterUrl} onChange={e => setFormData({...formData, twitterUrl: e.target.value})} />
                </div>
              </div>
            </section>

            {/* Curated Spaces Images */}
            <section>
              <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">Curated Spaces Section (Home)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Living Room Image URL</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" placeholder="https://" value={formData.livingRoomImage} onChange={e => setFormData({...formData, livingRoomImage: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Bedroom Image URL</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" placeholder="https://" value={formData.bedroomImage} onChange={e => setFormData({...formData, bedroomImage: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Dining Image URL</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" placeholder="https://" value={formData.diningRoomImage} onChange={e => setFormData({...formData, diningRoomImage: e.target.value})} />
                </div>
              </div>
            </section>

            {/* Footer Settings */}
            <section>
              <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">Footer Customization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Footer Tagline</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" placeholder="Crafted for Premium Lifestyles." value={formData.footerTagline} onChange={e => setFormData({...formData, footerTagline: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Footer Copyright Text</label>
                  <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none text-gray-900 bg-white" placeholder="Luxe Furnishings. All rights reserved." value={formData.footerCopyright} onChange={e => setFormData({...formData, footerCopyright: e.target.value})} />
                </div>
              </div>
            </section>
          </form>
        ) : (
          <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border">
            <AdminAboutManager />
          </div>
        )}
      </div>
    </div>
  );
}
