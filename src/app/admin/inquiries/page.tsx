"use client";
import { useEffect, useState } from "react";
import { Search, Filter, Phone, Mail, Calendar, MapPin, Download } from "lucide-react";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const STATUSES = ["New", "Contacted", "Confirmed", "Visited", "Closed"];

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      const leads = (data.data || []).filter((inq: any) => inq.preferredDate || inq.productName);
      setInquiries(leads);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadEmails = async () => {
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      if (!data.success) {
        alert("Failed to fetch leads.");
        return;
      }
      
      const emails = (data.data || [])
        .map((inq: any) => inq.email || "")
        .filter((email: string) => email.trim() !== "" && email.includes("@"));
        
      const uniqueEmails = Array.from(new Set(emails));
      
      if (uniqueEmails.length === 0) {
        alert("No lead email addresses found in database yet. Try submitting a new inquiry or contact message with an email!");
        return;
      }
      
      const fileContent = uniqueEmails.join("\n");
      const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `leads-emails-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Error generating download.");
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchInquiries();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesStatus = filterStatus === "All" || inq.status === filterStatus;
    const matchesSearch = inq.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inq.phone?.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-medium text-gray-900">Inquiries & Leads</h2>
          <p className="text-xs text-gray-500 font-light mt-1">Moderate customer appointments and showroom bookings.</p>
        </div>
        
        <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-auto items-center">
          <button
            onClick={downloadEmails}
            className="bg-brand-dark text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold hover:bg-brand-gold transition-colors flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" /> Download Email List (.TXT)
          </button>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm outline-none focus:border-brand-gold w-full text-gray-900 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select 
              className="pl-10 pr-8 py-2 border border-gray-200 rounded-md text-sm outline-none focus:border-brand-gold bg-white appearance-none w-full text-gray-900"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All" className="text-gray-900 bg-white">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s} className="text-gray-900 bg-white">{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-gray-500">Loading leads...</div>
        ) : filteredInquiries.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center text-gray-500 rounded-lg shadow-sm border border-gray-100">
            No inquiries found matching your criteria.
          </div>
        ) : filteredInquiries.map((inq: any) => (
          <div key={inq._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-lg text-gray-900">{inq.name}</h3>
                  <span className="text-xs text-gray-500">{new Date(inq.createdAt).toLocaleString()}</span>
                </div>
                <select 
                  className={`text-xs font-medium px-3 py-1 rounded-full outline-none cursor-pointer border-none
                    ${inq.status === 'New' ? 'bg-blue-100 text-blue-700' : 
                      inq.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' : 
                      inq.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                      inq.status === 'Visited' ? 'bg-purple-100 text-purple-700' : 
                      'bg-gray-100 text-gray-700'}`}
                  value={inq.status}
                  onChange={(e) => updateStatus(inq._id, e.target.value)}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <a href={`tel:${inq.phone}`} className="hover:underline">{inq.phone}</a>
                  <a href={`https://wa.me/${inq.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">WhatsApp</a>
                </div>
                {inq.email && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-brand-gold" />
                    <a href={`mailto:${inq.email}`} className="hover:underline">{inq.email}</a>
                  </div>
                )}
                {inq.preferredDate && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-brand-gold" />
                    <span>Preferred Visit: {new Date(inq.preferredDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {(inq.productName || inq.customRequirement) && (
                <div className="bg-gray-50 p-4 rounded-md mb-4 text-sm">
                  {inq.productName && <p className="mb-2"><span className="font-medium text-gray-700">Interested in:</span> {inq.productName}</p>}
                  {inq.customRequirement && <p><span className="font-medium text-gray-700">Message:</span> {inq.customRequirement}</p>}
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => updateStatus(inq._id, "Contacted")}
                disabled={inq.status === "Contacted"}
                className="text-xs uppercase tracking-wider font-medium text-brand-dark hover:text-brand-gold transition-colors disabled:opacity-50"
              >
                Mark as Contacted
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
