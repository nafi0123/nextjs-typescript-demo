"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link" // লিঙ্কিংয়ের জন্য ইম্পোর্ট করা হয়েছে
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

const bannerData = [
  { 
    id: 1, 
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2000", 
    title: "Discover your skin's true potential", 
    desc: "Premium skincare that combines innovation with clean, effective ingredients for all skin types." 
  },
  { 
    id: 2, 
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2000", 
    title: "Radiance Redefined", 
    desc: "Experience the glow with our natural ingredient formula for a healthier look." 
  },
  { 
    id: 3, 
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2000", 
    title: "Modern Beauty Standards", 
    desc: "Empowering your natural beauty with science-backed skincare solutions." 
  }
]

export default function Banner() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <section className="w-full relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {bannerData.map((banner) => (
            <CarouselItem key={banner.id} className="pl-0">
              
              <div className="relative h-[65vh] md:h-[85vh] w-full overflow-hidden">
                
                <Image
                  src={banner.img}
                  alt={banner.title}
                  fill
                  className="object-cover" 
                  priority={banner.id === 1}
                  quality={100}
                  sizes="100vw"
                />
                
                <div className="absolute inset-0 bg-black/30 flex items-center">
                  <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="max-w-3xl space-y-5 md:space-y-6 text-white text-left">
                      
                      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[1] italic">
                        {banner.title}
                      </h1>
                      
                      <p className="text-sm md:text-xl text-slate-100 max-w-lg leading-relaxed font-medium">
                        {banner.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 pt-4">
                        {/* Shop Now বাটন - কালেকশন পেজে যাওয়ার জন্য */}
                        <Link href="/collections">
                          <Button 
                            size="lg" 
                            className="rounded-full px-8 md:px-10 h-12 md:h-16 bg-white text-black hover:bg-slate-200 font-black uppercase text-[10px] md:text-sm tracking-widest transition-all active:scale-95 shadow-2xl"
                          >
                            Shop Now
                          </Button>
                        </Link>

                        {/* About Us বাটন - অ্যাবাউট পেজে যাওয়ার জন্য */}
                        <Link href="/about">
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="rounded-full px-8 md:px-10 h-12 md:h-16 border-2 border-white text-white hover:bg-white/10 font-black uppercase text-[10px] md:text-sm tracking-widest transition-all active:scale-95 bg-transparent"
                          >
                            About Us
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}