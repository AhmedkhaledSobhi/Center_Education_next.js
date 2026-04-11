"use client";
import React, { useEffect, useState } from 'react'
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from 'react-icons/md';

export default function FullScreenDropdown() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullscreen = async () => {
    const doc = document;

    try {
      if (!doc.fullscreenElement) {
        await doc.documentElement.requestFullscreen();
        doc.body.classList.add("fullscreen-enable");
        setIsFullScreen(true);
      } else {
        await doc.exitFullscreen();
        doc.body.classList.remove("fullscreen-enable");
        setIsFullScreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  // handle exit (ESC key, etc.)
  useEffect(() => {
    const handleChange = () => {
      if (!document.fullscreenElement) {
        document.body.classList.remove("fullscreen-enable");
        setIsFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);
  return (
    <React.Fragment>
      <div className="hidden sm:flex items-center border-0">
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-blue-100 transition"
        >
          {isFullScreen ?
            <MdOutlineFullscreenExit className='text-[30px]  text-blue-600'/>
            :
            <MdOutlineFullscreen className='text-[30px] text-blue-600'/>
          }
        </button>
      </div>
    </React.Fragment>
    
  )
}
