"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white p-8 shadow-2xl">
        <h1 className="font-serif text-3xl text-brand-dark text-center mb-8 uppercase tracking-widest">
          Luxe<span className="text-brand-gold">.</span> Admin
        </h1>
        {error && <div className="bg-red-50 text-red-600 p-4 mb-6 text-sm text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-brand-dark mb-2">Admin Email</label>
            <input 
              type="email" 
              required
              className="w-full border-b border-brand-walnut/30 py-3 focus:outline-none focus:border-brand-gold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-brand-dark mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full border-b border-brand-walnut/30 py-3 focus:outline-none focus:border-brand-gold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-brand-dark text-white py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors mt-8">
            Access Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}
