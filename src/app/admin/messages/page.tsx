"use client";

import { useState, useEffect } from "react";
import { Mail, Calendar, CheckCircle2, XCircle, Trash2 } from "lucide-react";

interface IMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  customRequirement: string;
  status: string;
  createdAt: string;
  // We identify a "Message" vs a "Booking" if it doesn't have a preferredDate or productName
  preferredDate?: string;
  productName?: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (data.success) {
        // Filter out bookings (bookings have preferredDate or productName)
        const contactMessages = data.data.filter((inq: IMessage) => !inq.preferredDate && !inq.productName);
        setMessages(contactMessages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchMessages();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) fetchMessages();
    } catch (error) {
      console.error("Failed to delete message", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif text-brand-dark mb-1">Contact Messages</h2>
          <p className="text-gray-500 text-sm">Review and respond to general inquiries.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>No messages found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {messages.map((msg) => (
              <div key={msg._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-brand-dark text-lg">{msg.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {msg.email}</span>
                      <span>•</span>
                      <span>{msg.phone}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(msg.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      msg.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      msg.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-md mb-4 text-sm text-brand-dark/80 whitespace-pre-wrap">
                  {msg.customRequirement || "No message provided."}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(msg._id, "Contacted")}
                      className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100 rounded-md transition-colors"
                    >
                      Mark Contacted
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(msg._id, "Closed")}
                      className="px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                    >
                      Mark Resolved
                    </button>
                    <a
                      href={`mailto:${msg.email}`}
                      className="px-4 py-2 text-sm font-medium text-brand-dark bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      Reply via Email
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
