"use client";

import MySVG from '@/SVG/MySVG';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import DropdownItem from './DropdownItem';
import avatar1 from "../../../assets/images/user-avatar.png";


export default function ProfileDropdown() {
  const [userInfo, setUserInfo] = useState({
    avatar: "",
    Point: "",
    first_name: "Ahmed",
    last_name: "khaled"
  });
  
  const [open, setOpen] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogOut = async () => {
    // logout()
    //   .then((res) => {
    //     if (res && res.status) {
    //       // performLogoutCleanup();
    //       nav("/login");
    //     }
    //   })
    //   .catch((error) => {});
    // performLogoutCleanup();
    // nav("/login");
  };

  const handleExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  // close when click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <React.Fragment>
      <div className="relative" ref={dropdownRef}>
        {/* Trigger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 px-2 py-1"
        >
          <div className="w-8 h-8 overflow-hidden rounded-full">
            <Image
              src={userInfo?.avatar || avatar1}
              alt="avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>

          {/* Arrow */}
          <svg
            className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""
              }`}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 7l5 5 5-5"
              stroke="#0d6efd"
              strokeWidth="2"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute left-1 mt-2 w-\[100px\] bg-white rounded-xl shadow-lg z-50">
            {/* Welcome */}
            <div className="flex items-center  gap-2 p-3 border-b  border-gray-300">
              <Image src={MySVG.Point} alt="point" width={25} height={25} />
              <div className="text-xs">
                <div>{t("ProfileDropdown.Welcome")}</div>
                <div className="font-medium">
                  {userInfo?.first_name?.split(" ").slice(0, 3).join(" ")}
                  {" "}
                  {userInfo?.last_name?.split(" ").slice(0, 3).join(" ")}
                </div>
              </div>
            </div>

            <DropdownItem href="/profile" icon={MySVG.Profile}>
              {t("ProfileDropdown.Profile")}
            </DropdownItem>

            <DropdownItem disabled icon={MySVG.UpgradesSubscriptions}>
              {t("ProfileDropdown.UpgradesAndSubscriptions")}
            </DropdownItem>

            <DropdownItem disabled icon={MySVG.changePassword}>
              {t("ProfileDropdown.changePassword")}
            </DropdownItem>

            <DropdownItem
              onClick={() =>
                handleExternalLink(
                  "https://api.whatsapp.com/send?phone=201026496334"
                )
              }
              disabled
              icon={MySVG.Help}
            >
              {t("ProfileDropdown.Help")}
            </DropdownItem>

            <DropdownItem href="/user-account" icon={MySVG.Settings}>
              {t("ProfileDropdown.accountSettings")}
            </DropdownItem>

            {/* Logout */}
            <button
              onClick={handleLogOut}
              className="w-full flex items-center justify-center gap-1 py-3 text-sm text-gray-500 hover:bg-gray-100"
            >
              {t("ProfileDropdown.Logout")}
              <span>{i18n?.language === "ar" ? "←" : "→"}</span>
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

