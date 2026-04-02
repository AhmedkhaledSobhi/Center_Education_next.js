"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import MySVG from "../../SVG/MySVG";
import Link from 'next/link';
import layoutLinks from './LayoutMenuData';
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import { TiMinus } from 'react-icons/ti';


export default function Sidebar() {
  const [activeLink, setActiveLink] = useState<string>("/");
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const links = layoutLinks;

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
  return (
    <React.Fragment>
      <aside className="Sidebar fixed top-0 right-0 bottom-0 z-50 p-2.5  font-bold text-xl bg-blue-900 "
        style={{ width: "calc(100% - 82.33333%)"}}
      >
        <div className='md-[h-20]  top-0 right-0 left- 0  flex items-center justify-center mt-3.5'>
          <Link href="/" className='flex items-center gap-2'>
            <Image src={MySVG.logoLight} alt="Logo" width={170} height={170} />
          </Link>
        </div>

        <nav className="p-4 flex flex-col gap-2 mt-3.5 overflow-y-auto scrollbar-none bg- amber-500 "
         style={{ height: "calc(100vh - 80px)" }}
        >
    
          {links?.map((item) => (
            <div key={item.id} 
              className="px-2 my-2"
              onClick={(e) => {
                if (item.subItems?.length || !item.link) {
                  e.preventDefault(); // مانع التنقل
                  toggleMenu(item.id)
                }
              }}
            >
              <div className="flex items-center justify-between gap-2 text-white cursor-pointer  ">
                <div className='flex items-center gap-2  text-[22px] font-bold'>
                  {item.icon}
                  <span className='hover:text-red-700 cursor-pointer transition-colors text-[18px]'>
                    {!item.subItems?.length ? (
                      <Link href={`${item.link}`}>
                        {item.label}
                      </Link>
                    ) : item.label}
                  </span>
                </div>

                <div className='text-sm text-gray-400'>
                  {item.subItems?.length ? (
                    openSubmenus[item.id] ? <FaChevronDown /> : <FaChevronLeft />
                  ) : <FaChevronLeft /> }
                </div>
              </div>
              <ul className={`pr-4 mt-2  ${openSubmenus[item.id] ? "block" : "hidden"}`}>
                {item.subItems?.map((subItem, subIndex) => (
                  <li key={subIndex} className='text-white cursor-pointer flex items-center' style={{ fontSize: "medium"}}>
                    <TiMinus />
                    <Link href={`${subItem.link}`}
                      className={`p-2 hover:text-red-700 transition-colors ${activeLink === subItem.link ? "text-red-700" : "text-white"}`}
                      onClick={(e) => handleSubLinkClick(e, item.id, subItem.link)}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

    </React.Fragment>
  )
}
