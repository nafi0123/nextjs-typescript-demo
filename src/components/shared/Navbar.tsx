"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import Logo from '../../assets/img/logo.png';
import { Search, User, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';

// Shadcn Components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Navbar: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <Container>
        <div className="navbar bg-base-100 px-0 h-20 flex justify-between items-center">
          
          {/* --- 1. Logo & Mobile Trigger --- */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu using Shadcn Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-1 text-gray-600 hover:bg-gray-100 rounded-md">
                  <Menu size={24} strokeWidth={1.5} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0 border-none">
                <SheetHeader className="p-6 text-left">
                  <SheetTitle>
                    <Image src={Logo} alt="Logo" width={100} height={40} className="object-contain" />
                  </SheetTitle>
                </SheetHeader>
                
                {/* Mobile Menu Items with Accordion */}
                <div className="p-6 overflow-y-auto h-full pb-20">
                  <Accordion type="single" collapsible className="w-full">
                    {/* Skincare Accordion */}
                    <AccordionItem value="skincare" className="border-none">
                      <AccordionTrigger className="text-lg font-normal py-3 hover:no-underline">Skincare</AccordionTrigger>
                      <AccordionContent className="bg-gray-50 rounded-lg px-4 pt-2">
                        <ul className="flex flex-col gap-3 pb-2 text-gray-600">
                          <li><Link href="/cleansers">Cleansers</Link></li>
                          <li><Link href="/essences">Essences</Link></li>
                          <li><Link href="/moisturizers">Moisturizers</Link></li>
                          <li><Link href="/serums">Serums</Link></li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Collections Accordion */}
                    <AccordionItem value="collections" className="border-none">
                      <AccordionTrigger className="text-lg font-normal py-3 hover:no-underline">Collections</AccordionTrigger>
                      <AccordionContent className="bg-gray-50 rounded-lg px-4 pt-2">
                        <ul className="flex flex-col gap-3 pb-2 text-gray-600">
                          <li><Link href="/hydration">Hydration</Link></li>
                          <li><Link href="/anti-aging">Anti-Aging</Link></li>
                          <li><Link href="/brightening">Brightening</Link></li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Static Mobile Links */}
                  <div className="flex flex-col gap-5 mt-4">
                    <Link href="/about" className="text-lg font-normal py-1 border-b border-transparent">About</Link>
                    <Link href="/contact" className="text-lg font-normal py-1 border-b border-transparent">Contact</Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/">
              <Image
                src={Logo}
                alt="Secret Village Logo"
                width={120}
                height={50}
                className="h-[40px] md:h-[50px] w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* --- 2. Center Navigation (Desktop) --- */}
          <div className="flex-1 justify-center px-4">
            {showSearch ? (
              <div className="relative w-full max-w-md animate-in slide-in-from-top-2 duration-300">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="input input-bordered w-full h-10 rounded-full pl-10 pr-10 focus:outline-none focus:border-gray-200 border-gray-200 text-sm" 
                  autoFocus
                  onBlur={(e) => !e.target.value && setShowSearch(false)}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <button onClick={() => setShowSearch(false)} className="absolute right-3 top-2.5 lg:hidden text-gray-400"><X size={16} /></button>
              </div>
            ) : (
              /* Desktop Menu */
              <ul className="hidden lg:flex menu menu-horizontal p-0 gap-8 font-normal text-[15px] text-gray-600">
                <li className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="hover:text-black flex items-center gap-1 p-0 bg-transparent border-none">
                    Skincare <ChevronDown size={14} />
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-50 menu p-6 shadow-xl bg-white border border-gray-100 rounded-none w-[350px] grid grid-cols-2 mt-0">
                    <div className="space-y-1">
                      <li><Link href="/cleansers" className="hover:text-pink-400">Cleansers</Link></li>
                      <li><Link href="/essences" className="hover:text-pink-400">Essences</Link></li>
                      <li><Link href="/moisturizers" className="hover:text-pink-400">Moisturizers</Link></li>
                    </div>
                    <div className="space-y-1">
                      <li><Link href="/toners" className="hover:text-pink-400">Toners</Link></li>
                      <li><Link href="/serums" className="hover:text-pink-400">Serums</Link></li>
                      <li><Link href="/masks" className="hover:text-pink-400">Masks</Link></li>
                    </div>
                  </ul>
                </li>
                {/* Collections - Same Desktop UI */}
                <li className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="hover:text-black flex items-center gap-1 p-0 bg-transparent border-none">
                    Collections <ChevronDown size={14} />
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-50 menu p-6 shadow-xl bg-white border border-gray-100 rounded-none w-[350px] grid grid-cols-2 mt-0">
                    <div className="space-y-1">
                      <li><Link href="/hydration" className="hover:text-pink-400">Hydration</Link></li>
                      <li><Link href="/anti-aging" className="hover:text-pink-400">Anti-Aging</Link></li>
                    </div>
                    <div className="space-y-1">
                      <li><Link href="/brightening" className="hover:text-pink-400">Brightening</Link></li>
                    </div>
                  </ul>
                </li>
                <li><Link href="/about" className="hover:text-black p-0">About</Link></li>
                <li><Link href="/contact" className="hover:text-black p-0">Contact</Link></li>
              </ul>
            )}
          </div>

          {/* --- 3. Right Icons --- */}
          <div className="flex-none flex items-center gap-3 md:gap-4">
            <button onClick={() => setShowSearch(!showSearch)} className="hover:opacity-60 transition-opacity p-1">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="hover:opacity-60 transition-opacity cursor-pointer p-1">
                <User size={20} strokeWidth={1.5} />
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white border border-gray-100 rounded-none z-50 mt-4 w-44 p-2 shadow-xl">
                <li><Link href="/signup" className="py-2">Sign-up</Link></li>
                <li><Link href="/signin" className="py-2 border-t border-gray-50">Sign in</Link></li>
              </ul>
            </div>
            <Link href="/cart" className="relative p-1">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute top-0 right-0 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;