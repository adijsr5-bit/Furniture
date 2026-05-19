"use client";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function AdminSettings() {
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

  if (loading) return <div>Loading settings from database...</div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-gray-900">Brand & Website Settings</h2>
        <button 
          onClick={handleSubmit} 
          disabled={saving}
          className="bg-brand-dark text-white px-6 py-2 text-sm uppercase tracking-wider hover:bg-brand-gold flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <form className="space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        {/* Brand Details */}
        <section>
          <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">Brand Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Brand Name</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.brandName} onChange={e => setFormData({...formData, brandName: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Logo URL (Optional)</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" placeholder="https://" value={formData.logoUrl} onChange={e => setFormData({...formData, logoUrl: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Primary Color (Hex)</label>
              <div className="flex items-center gap-2">
                <input type="color" className="w-10 h-10 border-none" value={formData.primaryColor} onChange={e => setFormData({...formData, primaryColor: e.target.value})} />
                <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.primaryColor} onChange={e => setFormData({...formData, primaryColor: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Background Color (Hex)</label>
              <div className="flex items-center gap-2">
                <input type="color" className="w-10 h-10 border-none" value={formData.backgroundColor} onChange={e => setFormData({...formData, backgroundColor: e.target.value})} />
                <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.backgroundColor} onChange={e => setFormData({...formData, backgroundColor: e.target.value})} />
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
              <input type="email" className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">WhatsApp Number</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.whatsappNumber} onChange={e => setFormData({...formData, whatsappNumber: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Store Address</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.storeAddress} onChange={e => setFormData({...formData, storeAddress: e.target.value})} />
            </div>
          </div>
        </section>

        {/* SEO */}
        <section>
          <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">SEO Configuration</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">SEO Title</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.seoTitle} onChange={e => setFormData({...formData, seoTitle: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">SEO Description</label>
              <textarea rows={2} className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.seoDescription} onChange={e => setFormData({...formData, seoDescription: e.target.value})} />
            </div>
          </div>
        </section>

        {/* Policies */}
        <section>
          <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">Store Policies</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Shipping Policy</label>
              <textarea rows={4} className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.shippingPolicy} onChange={e => setFormData({...formData, shippingPolicy: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Return Policy</label>
              <textarea rows={4} className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.returnPolicy} onChange={e => setFormData({...formData, returnPolicy: e.target.value})} />
            </div>
          </div>
        </section>

        {/* Social */}
        <section>
          <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Instagram URL</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.instagramUrl} onChange={e => setFormData({...formData, instagramUrl: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Facebook URL</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.facebookUrl} onChange={e => setFormData({...formData, facebookUrl: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Twitter/X URL</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" value={formData.twitterUrl} onChange={e => setFormData({...formData, twitterUrl: e.target.value})} />
            </div>
          </div>
        </section>

        {/* Curated Spaces Images */}
        <section>
          <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">Curated Spaces Section (Home)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Living Room Image URL</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" placeholder="https://" value={formData.livingRoomImage} onChange={e => setFormData({...formData, livingRoomImage: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Bedroom Image URL</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" placeholder="https://" value={formData.bedroomImage} onChange={e => setFormData({...formData, bedroomImage: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Dining Image URL</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" placeholder="https://" value={formData.diningRoomImage} onChange={e => setFormData({...formData, diningRoomImage: e.target.value})} />
            </div>
          </div>
        </section>

        {/* Footer Settings */}
        <section>
          <h3 className="font-serif text-lg mb-4 text-brand-dark border-b pb-2">Footer Customization</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Footer Tagline</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" placeholder="Crafted for Premium Lifestyles." value={formData.footerTagline} onChange={e => setFormData({...formData, footerTagline: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Footer Copyright Text</label>
              <input className="w-full border p-2 text-sm focus:border-brand-gold outline-none" placeholder="Luxe Furnishings. All rights reserved." value={formData.footerCopyright} onChange={e => setFormData({...formData, footerCopyright: e.target.value})} />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
