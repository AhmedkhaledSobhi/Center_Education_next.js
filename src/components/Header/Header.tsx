import React from "react";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";

export default function Header() {
  return (
    <React.Fragment>
      <header className="bg-white fixed top-0 z-20 w-full border-b-2 border-b-gray-200 flex items-center justify-around "
        style={{width: "calc(100% - 17.9999%)", height: "65px"}}
      >
        Header
        <LanguageDropdown />
      </header>
    </React.Fragment>
  )
}
