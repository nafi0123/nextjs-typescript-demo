"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

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
import { useGlobalContext } from "@/hooks/useGlobalContext";
import { getAllProducts } from "@/services/product.service";

const navLinks = [
  { name: "Skincare", href: "/", hasDropdown: true },
  { name: "Collections", href: "/collections", hasDropdown: true },
  { name: "About", href: "/about", hasDropdown: false },
  { name: "Contact", href: "/contact", hasDropdown: false },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  
  const { user } = useGlobalContext(); 
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ১. লাইভ সার্চ সাজেশান লজিক
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 1) {
        const res = await getAllProducts(1, 6, "", searchQuery); 
        setSuggestions(res?.data || res?.products || []);
      } else {
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // ২. লোকাল স্টোরেজ থেকে রিয়েল-টাইম কার্ট কাউন্ট আপডেট
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(cart.length);
      } catch (error) {
        setCartCount(0);
      }
    };

    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node))
        setShowUserMenu(false);
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-[1000] w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 font-sans">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 h-20 flex items-center justify-between relative">
        
        {/* Left: Mobile Menu & Logo */}
        <div className={`flex items-center gap-4 md:gap-6 transition-all duration-300 ${isSearchOpen ? "w-0 opacity-0 overflow-hidden md:w-auto md:opacity-100" : "w-auto opacity-100"}`}>
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 hover:bg-slate-50 rounded-full transition-colors">
                <Menu className="w-6 h-6 text-slate-700" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-8 border-none shadow-2xl">
              <SheetHeader className="mb-10 text-left">
                <SheetTitle>
                  <Image src={logo} alt="Logo" width={80} height={40} className="object-contain" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 text-left">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-3 flex justify-between items-center hover:text-black transition-colors uppercase"
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex-shrink-0">
            <Image src={logo} alt="Logo" width={100} height={50} className="w-[85px] md:w-[100px] object-contain" />
          </Link>

          <div className="hidden lg:flex items-center gap-10 ml-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-[14px] font-semibold text-slate-600 hover:text-black transition-all uppercase tracking-widest">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Search, User & Cart */}
        <div className="flex items-center gap-1.5 md:gap-4 flex-1 justify-end" ref={searchContainerRef}>
          
          <div className="relative flex-1 md:flex-none">
            <div className={`flex items-center bg-slate-50 rounded-full transition-all duration-500 overflow-hidden ${isSearchOpen ? "flex-1 md:w-[400px] px-4 py-1.5 ring-1 ring-slate-200 ml-4" : "w-0 opacity-0"}`}>
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

            {/* Live Search Suggestions with Next.js Image */}
            {isSearchOpen && suggestions.length > 0 && (
              <div className="absolute top-full right-0 w-full md:w-[400px] bg-white mt-3 border border-slate-100 shadow-2xl rounded-sm z-[1001] overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 bg-slate-50 border-b">
                  <span className="text-[10px] font-black uppercase text-slate-400">Products Found</span>
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                  {suggestions.map((product) => (
                    <Link
                      key={product._id}
                      href={`/collections/${product._id}`}
                      onClick={() => {setIsSearchOpen(false); setSearchQuery("");}}
                      className="flex items-center gap-4 p-4 hover:bg-slate-50 border-b border-slate-50 last:border-none transition-colors group"
                    >
                      <div className="relative w-10 h-10 border p-1 bg-white flex-shrink-0 overflow-hidden">
                         <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill 
                            className="object-contain p-1"
                            sizes="40px"
                         />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-slate-900 truncate">{product.name}</span>
                        <span className="text-xs font-black text-black">৳{product.price}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-2.5 rounded-full transition-colors ${isSearchOpen ? "bg-black text-white ml-2" : "hover:bg-slate-50 text-slate-700"}`}
          >
            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          <div className={`flex items-center gap-1.5 md:gap-4 ${isSearchOpen ? "hidden md:flex" : "flex"}`}>
            
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-50 transition-all">
                <User className="w-5 h-5 text-slate-700" />
                {user && <span className="hidden md:block text-xs font-bold text-slate-700">{user.name.split(' ')[0]}</span>}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 shadow-2xl rounded-sm py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-2 space-y-1">
                    {!user ? (
                      <Link href="/login" onClick={() => setShowUserMenu(false)} className="block px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Sign In</Link>
                    ) : (
                      <>
                        <p className="px-4 py-2 text-[10px] uppercase text-slate-400 font-bold">Account</p>
                        <Link href="/my-profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
                          <UserCircle size={16} /> My Profile
                        </Link>
                        {user.role === "admin" && (
                           <Link href="/dashboard" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-[#CCAF91] hover:bg-slate-50">
                           <LayoutDashboard size={16} /> Dashboard
                         </Link>
                        )}
                        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 mt-2 border-t pt-3">
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
              
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}