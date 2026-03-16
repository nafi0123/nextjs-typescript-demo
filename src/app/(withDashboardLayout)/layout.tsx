import { GlobalProvider } from "@/context/GlobalContext";
import SessionWrapper from "@/components/SessionWrapper";
import DashboardLayout from "./DashboardLayout";
// আপনার তৈরি করা প্রোভাইডার পাথ অনুযায়ী

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionWrapper>
     
        <GlobalProvider>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </GlobalProvider>
  
    </SessionWrapper>
  );
}