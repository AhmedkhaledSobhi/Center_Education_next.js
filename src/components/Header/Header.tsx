import React from "react";
import ReloadDropdown from "../Common/ReloadDropdown/ReloadDropdown";
import LanguageDropdown from "../Common/LanguageDropdown/LanguageDropdown";
import FullScreenDropdown from "../Common/FullScreenDropdown/FullScreenDropdown";
import ProfileDropdown from "../Common/ProfileDropdown/ProfileDropdown";

export default function Header() {

  return (
    <React.Fragment>
      <header className="bg-white fixed top-0 z-20 w-full border-b-2 border-b-gray-200  "
        style={{width: "calc(100% - 17.9999%)", height: "65px", placeContent: "center"}}
      >
        <section className="flex items-center justify-between mx-7">
          <div>
            Header
          </div>

          <div className="flex items-center gap-2">

            {/* ReloadDropdown */}
            <ReloadDropdown/>

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
