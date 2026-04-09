"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
type Language = {
  label: string;
  flag: string;
};
import en from "@/assets/images/flags/us.svg"
import ar from "@/assets/images/flags/eg.svg"

const languages: Record<string, Language> = {
  en: { label: "English", flag: en },
  ar: { label: "العربية", flag: ar },
};

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("ar");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (lang: string) => {
    setSelectedLang(lang);
    setIsOpen(false);
    console.log("Language changed to:", lang);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <React.Fragment>
      <div ref={dropdownRef} className="relative inline-block ms-1">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center overflow-hidden rounded-[1.25rem]"
        >
          <Image
            src={languages[selectedLang].flag}
            alt={languages[selectedLang].label}
            width={20}
            height={20}
            className="object-cover"
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-50">
            {Object.keys(languages).map((key) => (
              <button
                key={key}
                onClick={() => changeLanguage(key)}
                className={`flex items-center w-full px-4 py-2 text-sm text-blue-700 ${selectedLang === key ? "font-bold" : "text-gray-700"
                  } hover:bg-gray-100`}
              >
                <Image
                  src={languages[key].flag}
                  alt={languages[key].label}
                  width={18}
                  height={18}
                  className="rounded-[1.25rem] me-2"
                />
                <span className="ml-2">{languages[key].label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
