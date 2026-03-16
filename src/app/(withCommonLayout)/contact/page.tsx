"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { FAQItem } from "@/types/contact"; 

// ASSETS
import c1 from "@/assets/img/contact1.png";
import c2 from "@/assets/img/contact2.png";
import JoinCom from "@/components/home/JoinCom";
import Container from "@/components/shared/Container";

const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: "What is your return policy?",
      a: "Figma ipsum component variant main layer. Line ellipse object list undo rectangle duplicate editor distribute overflow Arrow pen union device share scrolling style.",
    },
    {
      q: "Are your products cruelty-free?",
      a: "Yes, all Seoul Mirage products are 100% cruelty-free and dermatologically tested.",
    },
    {
      q: "How long does international shipping take?",
      a: "International shipping typically takes 7-14 business days depending on your location.",
    },
    {
      q: "Do you offer wholesale opportunities?",
      a: "Yes, please contact us via email for wholesale inquiries and bulk pricing.",
    },
    {
      q: "Can I change my order after it's placed?",
      a: "Orders can be modified within 2 hours of placement. Please contact our support team immediately.",
    },
    {
      q: "Is Seoul Mirage available in stores?",
      a: "Currently, we are exclusively online to ensure the best pricing for our premium products.",
    },
  ];

  return (
    <div className="bg-white font-sans overflow-hidden">
      
      {/* SECTION 1: Get in Touch */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="px-4 sm:px-6 md:px-0 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 w-full space-y-6">
              <div>
                <h1 className="text-[36px] md:text-[56px] font-black text-[#333] leading-tight uppercase italic tracking-tighter">
                  Contact Us
                </h1>
                <div className="h-[2px] w-12 bg-black mt-2" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#333] uppercase">
                  Get in Touch
                </h2>
                <p className="text-[#666] text-sm md:text-base leading-relaxed max-w-[450px]">
                  Have a question or need assistance? Fill out the form below and our
                  team will get back to you as soon as possible.
                </p>
              </div>

              <form className="space-y-5 max-w-[500px] pt-4">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 block font-black">Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 bg-gray-50/30 p-4 focus:outline-none focus:border-black rounded-sm transition-colors text-sm"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 block font-black">Email</label>
                    <input
                      type="email"
                      className="w-full border border-gray-200 bg-gray-50/30 p-4 focus:outline-none focus:border-black rounded-sm transition-colors text-sm"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 block font-black">How can we help</label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-200 bg-gray-50/30 p-4 focus:outline-none focus:border-black rounded-sm resize-none transition-colors text-sm"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full md:w-auto px-12 py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all"
                >
                  Let Us Know
                </button>
              </form>
            </div>

            <div className="flex-1 w-full h-[400px] md:h-[600px] relative">
              <Image
                src={c1}
                alt="Contact Seoul Mirage"
                fill
                className="object-cover rounded-sm"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2: Other Ways */}
      <section className="bg-[#F6ECDC] py-20">
        <Container>
          <div className="px-4 sm:px-6 md:px-0">
            <h2 className="text-[24px] md:text-[32px] font-black mb-12 text-[#333] uppercase italic tracking-tighter">
              Other Ways to Reach Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              {[
                { icon: Mail, title: "Email", info: "seoulmirage@gmail.com" },
                { icon: Phone, title: "Phone", info: "+82 2 123 4567" },
                { icon: MapPin, title: "Address", info: "123 Beauty Lane, Gangnam, Seoul, South Korea" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[16px] md:text-[18px] uppercase mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3: FAQs */}
      <section className="py-20 md:py-24">
        <Container>
          <div className="px-4 sm:px-6 md:px-0 flex flex-col md:flex-row gap-16 items-start">
            <div className="flex-1 w-full h-[400px] md:h-[700px] relative">
              <Image
                src={c2}
                alt="Skin Care Questions"
                fill
                className="object-cover rounded-sm"
              />
            </div>

            <div className="flex-1 w-full">
              <div className="mb-10">
                <h2 className="text-[32px] md:text-[40px] font-black text-[#333] mb-4 uppercase italic tracking-tighter leading-none">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  Find answers to our most commonly asked questions. If you can't find
                  what you're looking for, please contact us.
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {faqs.map((faq, index) => (
                  <div key={index} className="overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full py-6 flex justify-between items-center text-left transition-colors focus:outline-none group"
                    >
                      <span className={`font-extrabold text-[15px] md:text-[16px] uppercase tracking-tight transition-colors ${openFaq === index ? 'text-black' : 'text-slate-600 group-hover:text-black'}`}>
                        {faq.q}
                      </span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-black" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 pb-8 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <JoinCom />
    </div>
  );
};

export default ContactPage;