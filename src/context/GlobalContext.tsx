"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// ১. টাইপ ডিফাইন করা (TypeScript এর জন্য)
interface GlobalContextType {
  user: any;
  setUser: (user: any) => void;
  isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// ২. প্রোভাইডার কম্পোনেন্ট
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session.user);
      setIsLoading(false);
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [session, status]);

  return (
    <GlobalContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

// ৩. কাস্টম হুক (সহজে ব্যবহার করার জন্য)
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};