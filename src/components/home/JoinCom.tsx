import React from 'react'
import Container from '@/components/shared/Container'
import { Button } from '@/components/ui/button'

export default function JoinCom() {
  return (
    <section className="py-20 bg-white border-t border-slate-50">
      <Container>
        {/* মোবাইলে দুই পাশে প্যাডিং নিশ্চিত করতে px-4 sm:px-6 অ্যাড করা হয়েছে */}
        <div className="px-4 sm:px-6 md:px-0">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Text Content using Global Classes */}
            <h2 className="newsletter-title text-center">Join Our Community</h2>
            <p className="newsletter-desc text-center mb-10 md:mb-12">
              Subscribe to our newsletter for exclusive offers, skincare tips, and new product announcements.
            </p>

            {/* Subscription Form - Figma Exact Layout */}
            <div className="w-full max-w-[500px] flex flex-col sm:flex-row items-center gap-4 sm:gap-3">
              <div className="w-full relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full h-12 md:h-14 px-6 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#CC99A2]/30 transition-all text-slate-600 bg-white"
                />
              </div>
              <Button 
                className="w-full sm:w-auto h-12 md:h-14 px-10 rounded-full bg-[#CC99A2] hover:bg-[#B88691] text-white font-semibold transition-all shadow-sm"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}