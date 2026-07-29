"use client";

import Image from 'next/image'
import MySVG from "../../SVG/MySVG";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import layoutLinks from './LayoutMenuData';
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import { TiMinus } from 'react-icons/ti';
import { GraduationCap } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface SidebarProps {
  isOpens: boolean;
  onClose?: () => void;
}
export default function Sidebar({ isOpens
}: SidebarProps) {
  const [activeLink, setActiveLink] = useState<string>("/");
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const links = layoutLinks;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const lang = pathname.split("/")[1] || "ar";
  const toggleMenu = (id: string) => {
    setOpenSubmenus(prev => {
      const isOpen = !!prev[id];
      const newState: Record<string, boolean> = {};
      links.forEach(link => {
        // إذا هذا الـ main item يحتوي على activeLink لا تغلقه
        const hasActiveSub = link.subItems?.some(sub => sub.link === activeLink);
        newState[link.id] = hasActiveSub ? true : false;
      });
      newState[id] = !isOpen; // فتح/إغلاق الـ submenu اللي ضغطت عليه
      return newState;
    });
  };

  const handleSubLinkClick = (e: React.MouseEvent, parentId: string, link: string) => {
    e.stopPropagation();
    setActiveLink(link);

    const newState: Record<string, boolean> = {};
    links.forEach(item => {
      newState[item.id] = false; // أغلق الباقي
    });
    newState[parentId] = true; // إبقاء الـ submenu الحالي مفتوح
    setOpenSubmenus(newState);
  };

  // __________________

  // const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);

//   useEffect(() => {
//     const handleResize = () => setIsSmallScreen(window.innerWidth < 576);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
  return (
    <React.Fragment>
      <aside 
        className={`Sidebar 
          ${lang === "ar" ? "right-0" : "left-0"} 
          ${isOpens ? "sidebar-open" : "sidebar-close"}
          fixed top-0 right -0 bottom-0 z-50 p-2.5  font-bold text-xl bg- blue-900
        `}
      >
        <div className='md-[h-20] text-white top-0 right-0 left- 0  flex items-center justify-center mt-3.5'>
          {/* <Link href="/" className='flex items-center gap-2'>
            <Image src={MySVG.logoLight} alt="Logo" width={170} height={170} />
          </Link> */}
          <div dir="rtl" className="flex items-center gap-4 mb-0"
            onClick={() => { router.push('/') }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
              <GraduationCap size={36} />
            </div>
            {isOpens && (
              <div>
                <h2 className="text-4xl font-bold tracking-wide">
                  CENTER
                </h2>
                <p className="text-xl tracking-[3px]">
                  EDUCATION
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className={`py-4 px-1 flex flex-col gap-2 mt-3.5 ${isOpens && "overflow-y-auto"} scrollbar-none`}
         style={{ height: "calc(100vh - 80px)" }}
        >
          {links?.map((item) => (
            <div key={item.id} 
              className="relative px-2 my-2"
              onMouseEnter={() => {
                if (!isOpens && item.subItems?.length) {
                  setOpenSubmenus({ [item.id]: true });
                }
              }}
              onMouseLeave={() => {
                if (!isOpens) {
                  setOpenSubmenus({});
                }
              }}
              onClick={(e) => {
                if (item.subItems?.length || !item.link) {
                  e.preventDefault(); // مانع التنقل
                  toggleMenu(item.id)
                }
              }}
            >
              <div 
                className={`
                  flex items-center gap-3 text-white cursor-pointer
                  ${isOpens ? "justify-between" : "justify-center"}
                `}
              >
                <div className='flex items-center gap-2'>
                  <div className="text-xl">{item.icon}</div>
                  {isOpens && (
                    <span className='hover:text-blue-700 cursor-pointer transition-colors text-[15px]'
                      style={{
                        fontWeight: "700",
                        lineHeight: "20px"
                      }}
                    >
                      {!item.subItems?.length ? (
                        <Link href={`${item.link}`}>
                            {t(item.label)}
                        </Link>
                        ) : t(item.label)
                      }
                    </span>
                  )}
                </div>
                {isOpens && (
                  <div className='text-sm text-gray-400'>
                    {item.subItems?.length ? (
                      openSubmenus[item.id] ? <FaChevronDown /> : <FaChevronLeft />
                    ) : <FaChevronLeft /> }
                  </div>
                )}
              </div>
              {item.subItems && item.subItems.length > 0 && (
                <ul
                  className={`
                    ${isOpens? `
                        mt-2
                        ${openSubmenus[item.id] ? "block" : "hidden"}
                      ` : `
                        absolute
                        top-0
                        min-w-50
                        bg-linear-to-b from-[#001a4d] to-[#003b9e]
                        shadow-xl
                        p-3
                        z-9999
                        ${lang === "ar" ? "rounded-l-lg right-full mr-6" : "rounded-r-lg left-full ml-6"}
                        ${openSubmenus[item.id] ? "block" : "hidden"}
                      `
                    }
                  `}
                >
                  {item.subItems?.map((subItem, subIndex) => (
                    <li key={subIndex} className='text-white cursor-pointer flex items-center' 
                      style={{
                        fontSize: "medium",
                        marginInlineStart: "5px",
                      }}
                    >
                      <TiMinus />
                      <Link href={`${subItem.link}`}
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "20px",
                        }}
                        className={`p-2 hover:text-blue-700 transition-colors ${activeLink === subItem.link ? "text-blue-700" : "text-white"}`}
                        onClick={(e) => handleSubLinkClick(e, item.id, subItem.link)}
                      >
                        {t(subItem.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>

    </React.Fragment>
  )
}
