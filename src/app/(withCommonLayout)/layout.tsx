import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { GlobalProvider } from "@/context/GlobalContext";
import React from "react";

const layout = ({ children }) => {
  return (
    <SessionWrapper>
      <GlobalProvider>
        <div>
          <Navbar />
          <div className="min-h-[90vh]">
            {children}
          </div>
          <Footer />
        </div>
      </GlobalProvider>
    </SessionWrapper>
  );
};

export default layout;