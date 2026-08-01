"use client"
import React, { useEffect, useState } from "react";
import ReloadDropdown from "../Common/ReloadDropdown/ReloadDropdown";
import LanguageDropdown from "../Common/LanguageDropdown/LanguageDropdown";
import FullScreenDropdown from "../Common/FullScreenDropdown/FullScreenDropdown";
import ProfileDropdown from "../Common/ProfileDropdown/ProfileDropdown";
import BackDropdown from "../Common/BackDropdown/BackDropdown";
import { MoveLeft, TextAlignStart } from "lucide-react";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";


export default function Header(
) {
  const { state, isMobile } = useSidebar();
  console.log("ahmed state", state);
  console.log("ahmed isMobile", isMobile);
  
  const sidebarWidth = isMobile
  ? "0px"
  : state === "collapsed"
  ? "var(--sidebar-width-icon)"
  : "var(--sidebar-width)";
  
  console.log("ahmed sidebarWidth", sidebarWidth);
   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 576);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <React.Fragment>
      <header className="bg-white fixed top-0 z-20 w -full border-b-[0.5px] 2 border-b-gray-200 "
        style={{
          width: `calc(100% - ${sidebarWidth})`,
          transition: "width 200ms linear",
          height: "65px", 
          placeContent: "center"
        }}
      >
        <section className="flex items-center justify-between me-3 ms-3">
          <div className="flex items-center ">
            <SidebarTrigger >
              { state === "expanded" ? 
                <TextAlignStart size={28} 
                  color="#0d6efd"
                  // color="gray"
                  strokeWidth={2} />
                :
                <MoveLeft size={28} 
                  color="#0d6efd"
                // color="gray"
                strokeWidth={2} />
              }
            </SidebarTrigger>

            Header
          </div>

          <div className="flex items-center gap-2">

            {/* ReloadDropdown */}
            <ReloadDropdown/>
            {/* Back */}
            <BackDropdown />

            {/* LanguageDropdown */}
            <LanguageDropdown />

            {/* FullScreenDropdown */}
            <FullScreenDropdown/>

            {/* ProfileDropdown */}
            <ProfileDropdown/>
          </div>
        </section>
      </header>
    </React.Fragment>
  )
}
