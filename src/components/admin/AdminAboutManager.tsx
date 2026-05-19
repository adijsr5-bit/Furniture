"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash, Save, X, BookOpen, Layers } from "lucide-react";

interface AboutSection {
  _id: string;
  label: string;
  title: string;
  content: string;
  order: number;
}

export default function AdminAboutManager() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal / Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    title: "",
    content: "",
    order: 0,
  });

  const fetchSections = async () => {
    try {
      const res = await fetch("/api/about");
      const data = await res.json();
      if (data.success) {
        setSections(data.data);
      }
    } catch (err) {
      console.error("Failed to load about sections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleEdit = (section: AboutSection) => {
    setEditingId(section._id);
    setFormData({
      label: section.label,
      title: section.title,
      content: section.content,
      order: section.order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this paragraph from your About Us page?")) return;
    try {
      const res = await fetch(`/api/about/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSections(sections.filter(s => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/about/${editingId}` : "/api/about";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (data.success) {
        fetchSections();
        setShowForm(false);
        setEditingId(null);
        setFormData({
          label: "",
          title: "",
          content: "",
          order: 0,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div>
          <h2 className="font-serif text-2xl text-brand-dark">About Us Story Blocks</h2>
          <p className="text-gray-500 text-xs font-light">Curate the history, design philosophy, and values shown on your legacy page.</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              label: "",
              title: "",
              content: "",
              order: sections.length + 1,
            });
            setShowForm(true);
          }}
          className="bg-brand-dark text-white px-4 py-2.5 uppercase tracking-widest text-[10px] font-semibold hover:bg-brand-gold transition-colors flex items-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" /> Add Section Block
        </button>
      </div>

      {/* List of active blocks */}
      {loading ? (
        <div className="py-12 text-center">
          <div className="w-6 h-6 border-t-2 border-brand-gold rounded-full animate-spin mx-auto"></div>
        </div>
      ) : sections.length === 0 ? (
        <div className="py-12 bg-white border text-center p-8">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="font-serif text-lg mb-1">No Content Sections</h3>
          <p className="text-gray-500 font-light text-xs">Add a block of text to describe your luxury story.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {sections.map((section) => (
            <div 
              key={section._id}
              className="bg-white border rounded-sm p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm hover:shadow transition-all"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-3">
                  <span className="bg-brand-cream text-brand-dark px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider border font-medium">
                    {section.label}
                  </span>
                  <span className="text-gray-400 text-[10px] flex items-center gap-1">
                    <Layers className="w-2.5 h-2.5" /> Block Order: {section.order}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-brand-dark font-medium">{section.title}</h3>
                <p className="text-gray-600 font-light text-xs md:text-sm leading-relaxed max-w-3xl">{section.content}</p>
              </div>

              <div className="flex justify-end gap-2 shrink-0 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
                <button
                  onClick={() => handleEdit(section)}
                  className="flex-1 md:flex-none justify-center px-3 py-1.5 border text-gray-600 hover:text-brand-gold hover:bg-gray-50 text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <Edit className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(section._id)}
                  className="flex-1 md:flex-none justify-center px-3 py-1.5 border border-red-100 text-red-600 hover:bg-red-50 text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <Trash className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative rounded-sm border p-6 md:p-8 fade-in">
            {/* Close Button */}
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-brand-dark p-1.5 hover:bg-gray-100 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif text-xl text-brand-dark mb-6 border-b pb-3">
              {editingId ? "Edit Story Block" : "Add Story Block"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Heritage Label / Tag</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Our Heritage, The Philosophy"
                    className="w-full border p-2.5 text-xs focus:border-brand-gold outline-none text-gray-900 bg-white"
                    value={formData.label}
                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Display Order</label>
                  <input
                    type="number"
                    required
                    min={1}
                    className="w-full border p-2.5 text-xs focus:border-brand-gold outline-none text-gray-900 bg-white"
                    value={formData.order}
                    onChange={e => setFormData({ ...formData, order: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Block Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A Legacy of Design, An Eye For Detail"
                  className="w-full border p-2.5 text-xs focus:border-brand-gold outline-none text-gray-900 bg-white"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Paragraph Content</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your story context here..."
                  className="w-full border p-2.5 text-xs focus:border-brand-gold outline-none resize-none font-light leading-relaxed text-gray-900 bg-white"
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-dark text-white px-4 py-2 border border-brand-dark text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:border-brand-gold transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" /> Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
