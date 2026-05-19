"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash, Save, X, Search, FileText } from "lucide-react";
import Image from "next/image";

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
}

export default function AdminBlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Interior Design",
    excerpt: "",
    content: "",
    image: "",
  });

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post: BlogPost) => {
    setEditingId(post._id);
    setFormData({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/blog/${editingId}` : "/api/blog";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (data.success) {
        fetchPosts();
        setShowForm(false);
        setEditingId(null);
        setFormData({
          title: "",
          category: "Interior Design",
          excerpt: "",
          content: "",
          image: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-serif text-3xl text-brand-dark">Blog Manager</h2>
          <p className="text-gray-500 text-sm font-light">Create, edit, and curate your luxury Design Journal articles.</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: "",
              category: "Interior Design",
              excerpt: "",
              content: "",
              image: "",
            });
            setShowForm(true);
          }}
          className="bg-brand-dark text-white px-5 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-brand-gold transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Blog Post
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md bg-white">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search articles by title or category..."
          className="w-full pl-10 pr-4 py-3 border text-sm outline-none focus:border-brand-gold font-light"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* List of articles */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-t-2 border-brand-gold rounded-full animate-spin mx-auto"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="py-24 bg-white border text-center p-8">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl mb-2">No Articles Found</h3>
          <p className="text-gray-500 font-light text-sm">Start writing your first article to share interior secrets with your guests.</p>
        </div>
      ) : (
        <div className="bg-white border rounded-sm overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b text-gray-500 uppercase tracking-wider text-[11px] font-semibold">
                  <th className="p-4 md:p-6">Cover</th>
                  <th className="p-4 md:p-6">Title</th>
                  <th className="p-4 md:p-6">Category</th>
                  <th className="p-4 md:p-6">Publish Date</th>
                  <th className="p-4 md:p-6">Read Time</th>
                  <th className="p-4 md:p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 md:p-6">
                      <div className="relative w-16 h-12 rounded bg-gray-100 overflow-hidden border">
                        <Image src={post.image || "https://images.unsplash.com/photo-1540574163026-643ea20d25b5"} alt={post.title} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="p-4 md:p-6 max-w-xs md:max-w-sm">
                      <h4 className="font-serif text-brand-dark font-medium text-base line-clamp-1">{post.title}</h4>
                      <p className="text-gray-400 text-xs font-light line-clamp-1 mt-1">{post.excerpt}</p>
                    </td>
                    <td className="p-4 md:p-6">
                      <span className="bg-brand-cream/80 text-brand-dark px-3 py-1 rounded-full text-xs font-light tracking-wide border border-brand-dark/5">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4 md:p-6 text-gray-500 font-light">{post.date}</td>
                    <td className="p-4 md:p-6 text-gray-500 font-light">{post.readTime}</td>
                    <td className="p-4 md:p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 text-gray-600 hover:text-brand-gold hover:bg-gray-100 rounded transition-colors"
                          title="Edit post"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                          title="Delete post"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative rounded-sm border p-6 md:p-10 fade-in">
            {/* Close Button */}
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-brand-dark p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-brand-dark mb-8 border-b pb-4">
              {editingId ? "Edit Article" : "Write New Article"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Philosophy of Bouclé Styling"
                    className="w-full border p-3 text-sm focus:border-brand-gold outline-none"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Category</label>
                  <select
                    className="w-full border p-3 text-sm focus:border-brand-gold outline-none bg-white"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Interior Design">Interior Design</option>
                    <option value="Craftsmanship">Craftsmanship</option>
                    <option value="Color Theory">Color Theory</option>
                    <option value="Materials">Materials</option>
                    <option value="Ergonomics">Ergonomics</option>
                    <option value="Trends">Trends</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Image URL</label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/... or https://res.cloudinary.com/..."
                  className="w-full border p-3 text-sm focus:border-brand-gold outline-none"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Short Summary / Excerpt</label>
                <input
                  type="text"
                  required
                  placeholder="Provide a compelling 1-2 sentence preview for cards..."
                  className="w-full border p-3 text-sm focus:border-brand-gold outline-none"
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Full Content (Separate paragraphs using double enters)
                </label>
                <textarea
                  rows={10}
                  required
                  placeholder="Write your article copy here..."
                  className="w-full border p-3 text-sm focus:border-brand-gold outline-none resize-none font-light leading-relaxed"
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-4 border-t pt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-dark text-white px-6 py-3 border border-brand-dark text-xs uppercase tracking-widest hover:bg-brand-gold hover:border-brand-gold transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
