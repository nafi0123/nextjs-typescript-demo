"use client";

import React, { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react"; 
import { useGlobalContext } from "@/hooks/useGlobalContext"; 
import logo from "../../assets/img/logo.png"; 
import {
  LayoutDashboard,
  ShoppingBag,
  Truck,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  UserCircle,
} from "lucide-react";
import Swal from "sweetalert2";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { user, isLoading } = useGlobalContext();

  const navLinks = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/dashboard/products", icon: ShoppingBag },
    { name: "Orders", path: "/dashboard/orders", icon: Truck },
    { name: "Customers", path: "/dashboard/customers", icon: Users },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  const handleLogout = (): void => {
    Swal.fire({
      title: "Are you sure?",
      text: "Logout from the admin panel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut({ callbackUrl: "/" }); 
      }
    });
  };

  return (
    // মেইন কন্টেইনারকে h-screen এবং overflow-hidden করে দেওয়া হয়েছে যাতে পুরো পেজ স্ক্রল না হয়
    <div className="flex h-screen w-full bg-[#FDFBF9] overflow-hidden">
      
      {/* --- ১. SIDEBAR (Sticky/Fixed Full Height) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-[280px] bg-[#FEF4EC] border-r border-[#EBE3D9] 
        transition-transform duration-300 transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 flex-shrink-0 h-full overflow-y-auto
      `}>
        <div className="flex flex-col h-full pt-12 pb-8 px-8">
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden self-end p-2 text-slate-400 mb-4">
            <X size={20} />
          </button>

          <div className="mb-16 flex flex-col items-center">
            <Link href="/" className="w-16 h-16 mb-3 relative">
              <Image src={logo} alt="Logo" fill className="object-contain" />
            </Link>
            <h2 className="text-2xl font-serif font-bold text-[#333] text-center">Seoul Mirage</h2>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#CCAF91] mt-2 font-black text-center">Cosmetics Admin</p>
          </div>

          <nav className="flex-grow space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-300 ${
                    isActive ? "bg-black text-white shadow-xl" : "text-[#615E5B] hover:bg-[#F2E8DE]"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[11px] tracking-widest font-bold uppercase">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto group flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-[#CCAF91] text-[#A38A6F] rounded-sm transition-all hover:bg-black hover:text-white"
          >
            <LogOut size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* ডান পাশের অংশ: নেভবার এবং মেইন কন্টেন্ট */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* --- ২. NAVBAR (Fixed at Top) --- */}
        <header className="h-[100px] w-full bg-white border-b border-[#F0F0F0] flex items-center justify-between px-6 md:px-12 flex-shrink-0 z-50">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-slate-600">
              <Menu size={24} />
            </button>
            <div className="hidden md:block">
              <h1 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none">Dashboard</h1>
              <p className="text-2xl font-black uppercase tracking-tighter mt-1">
                {navLinks.find(l => l.path === pathname)?.name || "Overview"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            <div className="flex items-center gap-5 text-slate-400">
              <div className="relative">
              </div>
            </div>

            <div className="flex items-center gap-4 pl-6 md:pl-10 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-none uppercase">
                  {isLoading ? "..." : user?.name }
                </p>
                <p className="text-[9px] text-[#CCAF91] font-bold uppercase tracking-[0.15em] mt-1.5">
                  {user?.role || "Admin"}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-[#FEF4EC] p-0.5 overflow-hidden bg-slate-50 relative shadow-sm">
                {user?.image ? (
                  <Image src={user.image} alt="profile" fill className="object-cover rounded-full" />
                ) : (
                  <UserCircle size={44} className="text-slate-200" strokeWidth={1} />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* --- ৩. MAIN CONTENT AREA (এটি শুধু স্ক্রল করবে) --- */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 bg-[#FDFBF9] scroll-smooth">
          <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
            {children}
          </div>
        </main>
      </div>

      {/* মোবাইল ওভারলে */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[95] md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}