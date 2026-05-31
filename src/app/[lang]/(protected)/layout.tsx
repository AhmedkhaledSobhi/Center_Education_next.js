import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
type Props = {
  children: ReactNode;
};
export default async function ProtectedLayout({ children }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    // redirect("/login");
  }

  return (
        <div className="min-h-full flex flex-col">
          <div className="flex justify-end ">
            <Sidebar/>
            <div className="bg- amber-400"
              style={{width: "calc(100% - 17.9999%)"}}
            >
              <Header/>
              <main className="pt-12">
                <div className="min-h-[calc(100vh-91px)] py-3.5 px-0">
                  {children}
                </div>
                <Footer/>
              </main>
            </div>
          </div>
        </div>
  ) 
  // <>{children}</>;
}