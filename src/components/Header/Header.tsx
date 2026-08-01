"use client"
import React, { useEffect, useState } from "react";
import ReloadDropdown from "../Common/ReloadDropdown/ReloadDropdown";
import LanguageDropdown from "../Common/LanguageDropdown/LanguageDropdown";
import FullScreenDropdown from "../Common/FullScreenDropdown/FullScreenDropdown";
import ProfileDropdown from "../Common/ProfileDropdown/ProfileDropdown";
import BackDropdown from "../Common/BackDropdown/BackDropdown";
import { MoveLeft, TextAlignStart } from "lucide-react";
interface HeaderProps {
  isOpen: boolean
  toggleSidebar: () => void;
}

export default function Header({ isOpen,toggleSidebar }: HeaderProps) {
  const [openMenus, setOpenMenus] = useState<boolean>(false);
   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);

    useEffect(() => {
      const handleResize = () => setIsSmallScreen(window.innerWidth < 576);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  return (
    <React.Fragment>
      <header className="bg-white fixed top-0 z-20 w-full border-b-[0.5px] 2 border-b-gray-200  "
        style={{
          width: `calc(100% - ${isOpen? "16.9999%": "5.9999%"})`, 
          height: "65px", 
          placeContent: "center"
        }}
      >
        <section className="flex items-center justify-between me-3 ms-3">
          <div className="flex items-center ">
            <button 
              className="me-2 cursor-pointer"
              onClick={() => {
                toggleSidebar()
                setOpenMenus((prev)=> !prev )
              }}
            >
              {openMenus ?
                <MoveLeft size={28} color="gray" strokeWidth={2} />
                :
                <TextAlignStart size={28} color="gray" strokeWidth={2} />
              }
            </button>
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
