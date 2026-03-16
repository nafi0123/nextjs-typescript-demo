import SessionWrapper from "@/components/SessionWrapper";
import AIChatBot from "@/components/shared/AIChatBot";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { GlobalProvider } from "@/context/GlobalContext";
import { getProductsForChat } from "@/services/product.service";
import React from "react";
import { Toaster } from "react-hot-toast";

export const revalidate = 0; 

const layout = async ({ children }) => {
 const products = await getProductsForChat();
  
  // ২. চেক করার জন্য (টার্মিনালে দেখবেন)
  console.log("Chatbot loaded with products:", products?.length);

  return (
    <SessionWrapper>
      <GlobalProvider>
        <div className="relative">
          <Navbar />
          <div className="min-h-[90vh]">
            {children}
            <Toaster position="bottom-right" reverseOrder={false} />
          </div>
          <Footer />

          {/* এখন products প্রপস হিসেবে আসল অ্যারেটি যাচ্ছে */}
          <AIChatBot products={products} />
        </div>
      </GlobalProvider>
    </SessionWrapper>
  );
};

export default layout;