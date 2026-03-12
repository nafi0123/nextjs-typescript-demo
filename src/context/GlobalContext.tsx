// src/context/GlobalContext.tsx
"use client";

import React, { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface GlobalContextType {
  user: any;
  setUser: (user: any) => void;
  isLoading: boolean;
}

// এই GlobalContext কে এক্সপোর্ট করুন
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

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