"use client";

import { useState, useEffect } from "react";
import { Star, CheckCircle2, Trash, MessageSquare, ShieldAlert } from "lucide-react";

interface Review {
  _id: string;
  name: string;
  email: string;
  rating: number;
  product: string;
  text: string;
  status: "Pending" | "Published";
  date: string;
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (err) {
      console.error("Error loading reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Published" }),
      });
      const data = await res.json();
      if (data.success) {
        setReviews(prev =>
          prev.map(r => (r._id === id ? { ...r, status: "Published" } : r))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review permanently?")) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setReviews(prev => prev.filter(r => r._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl text-brand-dark">Customer Reviews</h2>
        <p className="text-gray-500 text-sm font-light">Moderate customer ratings and review comments submitted through your portal.</p>
      </div>

      {loading ? (
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-t-2 border-brand-gold rounded-full animate-spin mx-auto"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="py-24 bg-white border text-center p-8">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl mb-2">No Reviews Found</h3>
          <p className="text-gray-500 font-light text-sm">When customers write reviews on your Contact page, they will show up here for review.</p>
        </div>
      ) : (
        <div className="bg-white border rounded-sm overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b text-gray-500 uppercase tracking-wider text-[11px] font-semibold">
                  <th className="p-4 md:p-6">Customer</th>
                  <th className="p-4 md:p-6">Product / Scope</th>
                  <th className="p-4 md:p-6">Rating</th>
                  <th className="p-4 md:p-6">Review text</th>
                  <th className="p-4 md:p-6">Status</th>
                  <th className="p-4 md:p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reviews.map((rev) => (
                  <tr key={rev._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 md:p-6">
                      <h4 className="font-semibold text-brand-dark">{rev.name}</h4>
                      <p className="text-gray-400 text-xs font-light mt-0.5">{rev.email}</p>
                      <p className="text-gray-400 text-[10px] font-light mt-1">{rev.date}</p>
                    </td>
                    <td className="p-4 md:p-6">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs font-light">
                        {rev.product}
                      </span>
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < rev.rating ? "text-brand-gold fill-brand-gold" : "text-gray-200"}`} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="p-4 md:p-6 max-w-xs md:max-w-md">
                      <p className="text-gray-600 font-light leading-relaxed text-xs md:text-sm">{rev.text}</p>
                    </td>
                    <td className="p-4 md:p-6">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider ${
                        rev.status === "Published" 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {rev.status}
                      </span>
                    </td>
                    <td className="p-4 md:p-6 text-right">
                      <div className="flex justify-end gap-2">
                        {rev.status === "Pending" && (
                          <button
                            onClick={() => handleApprove(rev._id)}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                            title="Approve & Publish"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(rev._id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete Permanently"
                        >
                          <Trash className="w-5 h-5" />
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
    </div>
  );
}
