"use client";
import { useEffect, useState } from "react";
import { Users, Package, CalendarCheck, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInquiries: 0,
    pendingLeads: 0,
    conversionRate: 0,
    recentInquiries: []
  });

  useEffect(() => {
    // In a real app, fetch from an analytics API. 
    // For now, we fetch the real lists and count them.
    const fetchStats = async () => {
      try {
        const [prodRes, inqRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/inquiries")
        ]);
        
        const products = await prodRes.json();
        const inquiries = await inqRes.json();
        
        const inqData = inquiries.data || [];
        
        const total = inqData.length;
        const converted = inqData.filter((i: any) => i.status === "Confirmed" || i.status === "Visited" || i.status === "Closed").length;
        const conversionRate = total === 0 ? 0 : Math.round((converted / total) * 100 * 10) / 10;
        
        setStats({
          totalProducts: products.data?.length || 0,
          totalInquiries: total,
          pendingLeads: inqData.filter((i: any) => i.status === "New").length,
          conversionRate: conversionRate,
          recentInquiries: inqData.slice(0, 5)
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Products", value: stats.totalProducts, icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Total Inquiries", value: stats.totalInquiries, icon: Users, color: "text-green-600", bg: "bg-green-100" },
    { title: "Pending Leads", value: stats.pendingLeads, icon: CalendarCheck, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Conversion Rate", value: `${stats.conversionRate}%`, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
              <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Recent Leads & Inquiries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stats.recentInquiries.length > 0 ? (
                stats.recentInquiries.map((inq: any, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm font-medium text-gray-900">{inq.name}</td>
                    <td className="p-4 text-sm text-gray-500">{inq.phone}</td>
                    <td className="p-4 text-sm text-gray-500">{new Date(inq.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        inq.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        inq.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                        inq.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No recent inquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
