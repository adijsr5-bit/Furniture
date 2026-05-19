"use client";
import { useState } from "react";
import { Star, CheckCircle2, XCircle } from "lucide-react";

export default function AdminReviews() {
  const [reviews] = useState([
    { id: 1, name: "Eleanor Richards", product: "The Oslo Sofa", rating: 5, date: "May 15, 2026", status: "Published", text: "Exceptional quality. The delivery team was professional and the sofa completely transformed our living room." },
    { id: 2, name: "Marcus Thorne", product: "Monolith Dining Table", rating: 5, date: "May 10, 2026", status: "Published", text: "A stunning centerpiece. The craftsmanship is undeniable. Worth every penny for a luxury home." },
    { id: 3, name: "Sophia Lin", product: "Aero Lounge Chair", rating: 4, date: "May 02, 2026", status: "Pending", text: "Beautiful design, though the lead time took slightly longer than expected. The comfort is unmatched." }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-gray-900">Customer Reviews & Testimonials</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Rating</th>
              <th className="p-4 font-medium">Review</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reviews.map((rev) => (
              <tr key={rev.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <p className="text-sm font-medium text-gray-900">{rev.name}</p>
                  <p className="text-xs text-gray-500">{rev.date}</p>
                </td>
                <td className="p-4 text-sm text-gray-600">{rev.product}</td>
                <td className="p-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < rev.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={rev.text}>{rev.text}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${rev.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {rev.status}
                  </span>
                </td>
                <td className="p-4 flex items-center gap-2">
                  <button className="text-green-600 hover:text-green-800" title="Publish"><CheckCircle2 className="w-5 h-5" /></button>
                  <button className="text-red-600 hover:text-red-800" title="Hide/Delete"><XCircle className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
