"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Users, Settings, LogOut, MessageSquare, FileText, BookOpen } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "About Us Story", href: "/admin/about", icon: BookOpen },
    { name: "Inquiries & Leads", href: "/admin/inquiries", icon: Users },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-serif text-2xl uppercase tracking-widest text-white">
            Luxe<span className="text-brand-gold">.</span>
          </h2>
          <span className="text-xs text-brand-gold mt-1 block uppercase tracking-widest">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive ? "bg-brand-gold text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm uppercase tracking-wider">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-white/70 hover:bg-white/10 hover:text-white rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-medium text-brand-dark">
            {navItems.find((i) => i.href === pathname)?.name || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white font-serif">A</div>
            <span className="text-sm font-medium text-brand-dark">Super Admin</span>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
