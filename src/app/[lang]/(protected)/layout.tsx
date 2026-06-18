import { useLocale } from "next-intl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import AuthGuard from "@/Auth/AuthGuard";
import ProtectedLayoutClient from "./ProtectedLayoutClient";

type Props = {
  children: ReactNode;
};
export default async function ProtectedLayout({ children }: Props) {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token");
  const locale = await getLocale();
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  // const locale =
  //   typeof window !== "undefined"
  //     ? localStorage.getItem("i18nextLng")
  //     : "en";
  // if (!token) {
  //   redirect("/login");
  // }
//  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);

//   useEffect(() => {
//     const handleResize = () => setIsSmallScreen(window.innerWidth < 576);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
  return (
    <AuthGuard>
      <ProtectedLayoutClient locale={locale}>
        {children}
        {/* <div 
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="min-h-full flex flex-col"
        >
          <div className="flex justify-end ">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <div className="bg- amber-400"
              style={{width: "calc(100% - 17.9999%)"}}
            >
              <Header
                toggleSidebar={() =>
                  setSidebarOpen((prev) => !prev)
                }
              />
              <main className="pt-12">
                <div className="min-h-[calc(100vh-91px)] py-3.5 px-0">
                  {children}
                </div>
                <Footer/>
              </main>
            </div>
          </div>
        </div> */}
      </ProtectedLayoutClient>
    </AuthGuard>
  ) 
}