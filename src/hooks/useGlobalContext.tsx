// src/hooks/useGlobalContext.ts
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext"; // GlobalContext ইমপোর্ট করুন

export const useGlobalContext = () => {
  const context = useContext(GlobalContext); // এখানে GlobalContext হবে
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};