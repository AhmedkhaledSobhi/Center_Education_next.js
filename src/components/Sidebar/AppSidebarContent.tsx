"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import links from "./LayoutMenuData";
import { useTranslations } from "next-intl";


export default function AppSidebarContent() {
  const t = useTranslations();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const toggleMenu = (id: string) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {links.map((item) => {
              const isOpen = openMenu === item.id;
              return (
                <SidebarMenuItem key={item.id}>
                  {isCollapsed ? (
                    <DropdownMenu
                      open={openMenu === item.id}
                      onOpenChange={(open) =>
                        setOpenMenu(open ? item.id : null)
                      }
                    >
                      <SidebarMenuButton
                        render={
                          <DropdownMenuTrigger />
                        }
                        className="justify-center text-white"
                        onMouseEnter={() => setOpenMenu(item.id)}
                      >
                        {item.icon}
                      </SidebarMenuButton>
                     
                      <DropdownMenuContent
                        side="right"
                        align="start"
                        onMouseEnter={() => setOpenMenu(item.id)}
                        onMouseLeave={() => setOpenMenu(null)}
                      >
                        {item.subItems?.map((sub) => (
                          <DropdownMenuItem key={sub.id}>
                            <Link href={sub.link} className="w-full">
                              {t(sub.label)}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      {/* Parent */}
                      <SidebarMenuButton
                        onClick={() => toggleMenu(item.id)}
                        className="flex items-center justify-between text-white cursor-pointer"
                      >
                        <div className="flex items-center gap-2 text-[18px] font-extralight">
                          {item.icon}
                          <span>{t(item.label)}</span>
                        </div>

                        {item.subItems && (
                          <ChevronRight
                            size={16}
                            className={`transition-transform ${isOpen ? "rotate-90" : ""
                              }`}
                          />
                        )}
                      </SidebarMenuButton>

                      {/* Children */}
                      {item.subItems && isOpen && (
                        <SidebarMenuSub >
                          {item.subItems.map((sub) => (
                            <SidebarMenuSubItem key={sub.id}>
                              <SidebarMenuButton
                                render={
                                  <Link href={sub.link} className="w-full">
                                    {t(sub.label)}
                                  </Link>
                                }
                                className="w-full text-white text-[17px] font-extralight"
                              />
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}