"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // Import signOut
import { useGlobalContext } from "@/context/GlobalContext"; // Import Context

import {
  Search,
  User,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import logo from "../../assets/img/logo.png";

const navLinks = [
  { name: "Skincare", href: "#", hasDropdown: true },
  { name: "Collections", href: "/collections", hasDropdown: true },
  { name: "About", href: "/about", hasDropdown: false },
  { name: "Contact", href: "/contact", hasDropdown: false },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // --- Context থেকে ডাটা নেওয়া ---
  const { user, isLoading } = useGlobalContext(); 

  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node))
        setShowUserMenu(false);
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-[1000] w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 font-sans">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 h-20 flex items-center justify-between relative">
        
        <div className={`flex items-center gap-4 md:gap-6 transition-all duration-300 ${isSearchOpen ? "w-0 opacity-0 overflow-hidden md:w-auto md:opacity-100" : "w-auto opacity-100"}`}>
          
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 hover:bg-slate-50 rounded-full transition-colors">
                <Menu className="w-6 h-6 text-slate-700" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-8 border-none shadow-2xl">
              <SheetHeader className="mb-10">
                <SheetTitle className="text-left">
                  <Image src={logo} alt="Logo" width={80} height={40} className="object-contain" />
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-6 text-left">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-3 flex justify-between items-center hover:text-black transition-colors"
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </Link>
                ))}

                <div className="mt-4 space-y-4">
                  {user && (
                    <>
                      <Link href="/my-profile" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-3 text-lg font-semibold text-slate-700">
                        <UserCircle className="w-5 h-5" /> My Profile
                      </Link>
                      {user.role === "admin" && (
                        <Link href="/dashboard" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-3 text-lg font-semibold text-[#CCAF91]">
                          <LayoutDashboard className="w-5 h-5" /> Dashboard
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex-shrink-0">
            <Image src={logo} alt="Logo" width={100} height={50} className="w-[85px] md:w-[100px] object-contain" />
          </Link>

          <div className="hidden lg:flex items-center gap-10 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[14px] font-semibold text-slate-600 hover:text-black transition-all uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-4 flex-1 justify-end" ref={searchContainerRef}>
          
          <div className={`flex items-center bg-slate-50 rounded-full transition-all duration-500 overflow-hidden ${isSearchOpen ? "flex-1 md:flex-none md:w-[350px] px-4 py-1.5 ring-1 ring-slate-200 ml-4" : "w-0 opacity-0"}`}>
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent border-none outline-none w-full px-3 text-sm font-medium text-slate-700 h-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={isSearchOpen}
            />
          </div>

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-2.5 rounded-full transition-colors ${isSearchOpen ? "bg-black text-white ml-2" : "hover:bg-slate-50 text-slate-700"}`}
          >
            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          <div className={`flex items-center gap-1.5 md:gap-4 transition-all duration-300 ${isSearchOpen ? "hidden md:flex" : "flex"}`}>
            
            {/* User Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-50 transition-all">
                <User className="w-5 h-5 text-slate-700" />
                {/* লগইন থাকলে নাম দেখানো */}
                {user && <span className="hidden md:block text-xs font-bold text-slate-700">{user.name.split(' ')[0]}</span>}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 shadow-2xl rounded-sm py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-2 space-y-1 text-left">
                    {!user ? (
                      <Link href="/login" onClick={() => setShowUserMenu(false)} className="block px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Sign In</Link>
                    ) : (
                      <>
                        <p className="px-4 py-2 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Account</p>
                        <Link href="/my-profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
                          <UserCircle size={16} /> My Profile
                        </Link>
                        {user.role === "admin" && (
                           <Link href="/dashboard" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-[#CCAF91] hover:bg-slate-50">
                           <LayoutDashboard size={16} /> Dashboard
                         </Link>
                        )}
                        <button 
                          onClick={() => signOut()}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 mt-2 border-t border-slate-50 pt-3"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link href="/cart" className="relative p-2.5 hover:bg-slate-50 rounded-full text-slate-700">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}