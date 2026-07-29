// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import "../assets/styles/scss/main.scss"
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: {
//     default: "Center Education",
//     template: "%s | Center Education",
//   },
//   description: "Center Education is a modern education platform offering courses, training programs, and professional learning experiences.",
//   keywords: [
//     "education",
//     "courses",
//     "training",
//     "online learning",
//     "Center Education",
//   ]};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="ar"
//       dir="rtl"
//       suppressHydrationWarning
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col" suppressHydrationWarning={true}>
//         {children}
//       </body>
//     </html>
//   );
// }


import { Toaster } from "sonner";
import "./globals.css";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
  // params
}: Readonly<{
  children: React.ReactNode;
  // params: { lang: string };

}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  
  if (!token) {
    // redirect("/dashboard");
  }
  return (
    <html 
      // lang={params.lang}
     suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Toaster
          position="top-center"
          richColors
          closeButton
        />
        {children}
      </body>
    </html>
  );
}