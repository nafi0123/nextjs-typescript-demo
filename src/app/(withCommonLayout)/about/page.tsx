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

export default function Page() {
  
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
      <section className="bg-[#F6ECDC] py-20 lg:py-24">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <h1 className="text-[48px] md:text-[56px] font-bold text-[#333] leading-tight">
                Our Story
              </h1>
              <p className="text-[#666] text-[18px] leading-relaxed max-w-[500px]">
                Seoul Mirage was born from a passion for Korean skincare innovation 
                and a commitment to creating luxury products that deliver exceptional results.
              </p>
            </div>
            <div className="flex-1 w-full h-[500px] relative">
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
      <section className="py-24 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 space-y-10">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#333]">
                Our Philosophy
              </h2>

              <div className="space-y-0">
                <div className="border-b border-gray-200 py-8 group">
                  <h4 className="text-[20px] font-bold text-[#333] mb-3">Purity</h4>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    Clean, gentle ingredients safe for all skin types. We believe beauty shouldn&apos;t be complicated.
                  </p>
                </div>
                <div className="border-b border-gray-200 py-8 group">
                  <h4 className="text-[20px] font-bold text-[#333] mb-3">Innovation</h4>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    Modern science fused with time-tested rituals to unlock your skin&apos;s true potential.
                  </p>
                </div>
                <div className="border-b border-gray-200 py-8 group">
                  <h4 className="text-[20px] font-bold text-[#333] mb-3">Sustainability</h4>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    Eco-conscious sourcing and responsible packaging for a beautiful future.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full h-[650px] relative">
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
      <section className="bg-[#F6ECDC] py-24">
        <Container>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-[36px] md:text-[48px] font-bold text-[#333]">
              Our Ingredients
            </h2>
            <p className="text-[#666] text-[16px] max-w-2xl mx-auto leading-relaxed">
              We believe in the power of nature enhanced by science. Our formulations are crafted for pure efficacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {ingredientList.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow group">
                <div className="relative h-60 w-full mb-8 rounded-sm overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h4 className="text-[22px] font-bold mb-4 text-[#333]">{item.title}</h4>
                <p className="text-[#666] text-[14px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}