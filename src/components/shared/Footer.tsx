"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import Logo from '@/assets/img/logo.png'; // আপনার ফোল্ডার পাথ অনুযায়ী ঠিক করে নিন
import { Facebook, Instagram, Mail } from 'lucide-react'; 

const Footer: React.FC = () => {
    return (
        <footer className="bg-white pt-12 md:pt-16 pb-0 border-t border-gray-100">
            <Container>
                {/* Grid layout: 
                   - Mobile: 1 column (items-center, text-center)
                   - Tablet/Desktop: 3 columns (text-left)
                */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16 text-center md:text-left">
                    
                    {/* 1. Brand Section */}
                    <div className="flex flex-col items-center md:items-start gap-4 md:gap-5">
                        <Link href="/">
                            <Image 
                                src={Logo} 
                                alt="Seoul Mirage Logo" 
                                width={130} 
                                height={45} 
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-gray-500 text-[14px] max-w-[300px] leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. 
                            Scelerisque lectus habitasse adipiscing.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-5 mt-2">
                            <a href="mailto:info@example.com" className="text-[#E893CF] hover:text-pink-600 transition-colors">
                                <Mail size={22} strokeWidth={1.5} />
                            </a>
                            <a href="#" className="text-[#E893CF] hover:text-pink-600 transition-colors">
                                <Facebook size={22} strokeWidth={1.5} />
                            </a>
                            <a href="#" className="text-[#E893CF] hover:text-pink-600 transition-colors">
                                <Instagram size={22} strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>

                    {/* 2. Shop Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-xl md:text-2xl font-normal text-gray-800 mb-4 md:mb-6">Shop</h3>
                        <ul className="flex flex-col gap-3 md:gap-4 text-[15px]">
                            <li><Link href="#" className="text-gray-600 hover:text-[#E893CF] transition-colors">All Products</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-[#E893CF] transition-colors">Bestsellers</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-[#E893CF] transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* 3. About Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-xl md:text-2xl font-normal text-gray-800 mb-4 md:mb-6">About</h3>
                        <ul className="flex flex-col gap-3 md:gap-4 text-[15px]">
                            <li><Link href="#" className="text-gray-600 hover:text-[#E893CF] transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-[#E893CF] transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-[#E893CF] transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="#" className="text-gray-600 hover:text-[#E893CF] transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[13px] text-gray-400 font-light tracking-wide">
                        © {new Date().getFullYear()} Seoul Mirage. All rights reserved.
                    </p>
                </div>
            </Container>
            
        
        </footer>
    );
};

export default Footer;