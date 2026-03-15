import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { GlobalProvider } from "@/context/GlobalContext";
import React from "react";
import { Toaster } from "react-hot-toast";

const layout = ({ children }) => {
  return (
    <SessionWrapper>
      <GlobalProvider>
        <div>
          <Navbar />
          <div className="min-h-[90vh]">
            {children}
            <Toaster position="bottom-right" reverseOrder={false} />
          </div>
          <Footer />
        </div>
      </GlobalProvider>
    </SessionWrapper>
  );
};

export default layout;