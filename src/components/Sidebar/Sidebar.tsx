"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import MySVG from "../../SVG/MySVG";
import Link from 'next/link';
import layoutLinks from './LayoutMenuData';
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import { TiMinus } from 'react-icons/ti';


export default function Sidebar() {
  const [active, setActive] = useState("/");
  const links = layoutLinks;

  return (
    <React.Fragment>
      <aside className="fixed top-0 right-0 bottom-0 z-50 p-2.5  font-bold text-xl bg-blue-900 "
        style={{ width: "calc(100% - 82.33333%)", backgroundColor:"#283c47" }}
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
            <div key={item.id} onClick={() => setActive(prev => prev === item.id ? "" : item.id)} className="px-2 my-2">
              <div className="flex items-center justify-between gap-2 text-white cursor-pointer  ">
                <div className='flex items-center gap-2  '>
                  {item.icon}
                  <span className='hover:text-primary cursor-pointer transition-colors '>
                    {item.label}
                  </span>
                </div>
                <div className='text-sm text-gray-400'>
                  {active === item.id ? <FaChevronLeft /> : <FaChevronDown />}
                </div>
              </div>
              <ul className={`pr-4 mt-2  ${active === item.id ? "block" : "hidden"}`}>
                {item.subItems?.map((subItem, subIndex) => (
                  <li key={subIndex} className='text-white cursor-pointer flex items-center' style={{ fontSize: "medium"}}>
                    <TiMinus />
                    <Link href={`${subItem.link}`} className="p-2  hover:text-primary  transition-colors ">
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
