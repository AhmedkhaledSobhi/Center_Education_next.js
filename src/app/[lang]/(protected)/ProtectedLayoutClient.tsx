"use client";

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import React, { ReactNode, useState } from 'react'

type Props = {
  children: ReactNode;
  locale: string;
};

export default function ProtectedLayoutClient({
  children,
  locale,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <React.Fragment>
      <div 
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="min-h-full flex flex-col"
        >
          <div className="flex justify-end ">
            <Sidebar
              isOpens={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <div className=""
              style={{
                width: `calc(100% - ${sidebarOpen ? "17.9999%" : "6%"})`
              }}
            >
              <Header
                isOpen={sidebarOpen}

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
        </div>
    </React.Fragment>
  )
}
