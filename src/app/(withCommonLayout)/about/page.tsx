"use client"

import Image from 'next/image'
import Container from '@/components/shared/Container'
import { Ingredient } from '@/types/about'

// ASSETS
import storyImg from '@/assets/img/Philosophy.png'
import philosophyImg from '@/assets/img/Rectangle 8 (1).png'   
import ingredients1 from '@/assets/img/Frame 1597882762 (1).png'
import ingredients2 from '@/assets/img/Frame 1597882762.png'
import ingredients3 from '@/assets/img/Frame 1597882765.png'

export default function AboutPage() {
  
  const ingredientList: Ingredient[] = [
    { 
      img: ingredients1, 
      title: "Botanical Extracts", 
      desc: "Natural plant-based nourishment for glowing skin sourced from clean environments." 
    },
    { 
      img: ingredients2, 
      title: "Fermented Ingredients", 
      desc: "Enhanced absorption through advanced fermentation science for deeper results." 
    },
    { 
      img: ingredients3, 
      title: "Scientific Compounds", 
      desc: "Clinically tested actives like Peptides and HA for visible, lasting transformations." 
    }
  ];

  return (
    <main className="bg-white font-sans overflow-hidden">
      
      {/* --- SECTION 1: OUR STORY --- */}
      <section className="bg-[#F6ECDC] py-16 md:py-24">
        <Container>
          {/* মোবাইলে দুই পাশে প্যাডিং নিশ্চিত করতে px-4 বা px-6 যোগ করা হয়েছে */}
          <div className="px-4 sm:px-6 md:px-0 flex flex-col md:flex-row items-center gap-10 lg:gap-20">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h1 className="text-[36px] md:text-[56px] font-black text-[#333] leading-tight uppercase italic tracking-tighter">
                Our Story
              </h1>
              <p className="text-[#666] text-[16px] md:text-[18px] leading-relaxed max-w-[500px] mx-auto md:mx-0">
                Seoul Mirage was born from a passion for Korean skincare innovation 
                and a commitment to creating luxury products that deliver exceptional results.
              </p>
            </div>
            <div className="flex-1 w-full h-[350px] md:h-[500px] relative">
              <Image
                src={storyImg}
                alt="Our Story"
                fill
                className="object-cover rounded-sm shadow-sm"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* --- SECTION 3: OUR PHILOSOPHY --- */}
      <section className="py-20 md:py-24 bg-white">
        <Container>
          <div className="px-4 sm:px-6 md:px-0 flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1 space-y-8 md:space-y-10">
              <h2 className="text-[32px] md:text-[40px] font-black text-[#333] uppercase italic tracking-tighter">
                Our Philosophy
              </h2>

              <div className="space-y-0">
                {[
                  { title: "Purity", desc: "Clean, gentle ingredients safe for all skin types. We believe beauty shouldn't be complicated." },
                  { title: "Innovation", desc: "Modern science fused with time-tested rituals to unlock your skin's true potential." },
                  { title: "Sustainability", desc: "Eco-conscious sourcing and responsible packaging for a beautiful future." }
                ].map((item, i) => (
                  <div key={i} className="border-b border-gray-100 py-6 md:py-8 group">
                    <h4 className="text-[18px] md:text-[20px] font-bold text-[#333] mb-2 uppercase">{item.title}</h4>
                    <p className="text-gray-500 text-[14px] md:text-[15px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full h-[400px] md:h-[650px] relative">
              <Image
                src={philosophyImg}
                alt="Our Philosophy"
                fill
                className="object-cover rounded-sm"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* --- SECTION 4: OUR INGREDIENTS --- */}
      <section className="bg-[#F6ECDC] py-20 md:py-24">
        <Container>
          <div className="px-4 sm:px-6 md:px-0">
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <h2 className="text-[32px] md:text-[48px] font-black text-[#333] uppercase italic tracking-tighter">
                Our Ingredients
              </h2>
              <p className="text-[#666] text-[14px] md:text-[16px] max-w-2xl mx-auto leading-relaxed">
                We believe in the power of nature enhanced by science. Our formulations are crafted for pure efficacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {ingredientList.map((item, idx) => (
                <div key={idx} className="bg-white p-6 md:p-8 rounded-sm shadow-sm hover:shadow-md transition-all group">
                  <div className="relative h-52 md:h-60 w-full mb-6 md:mb-8 rounded-sm overflow-hidden">
                    <Image 
                      src={item.img} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <h4 className="text-[20px] md:text-[22px] font-extrabold mb-3 text-[#333] uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[#666] text-[13px] md:text-[14px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}