"use client";
import React from 'react'
import { IoReload } from 'react-icons/io5'

export default function ReloadDropdown() {
  let Profile = {
    role:""
  }
  const handleReload = async () => {
    try {
      if (Profile) {
        // localStorage.removeItem("packages");
        // localStorage.setItem("packages", JSON.stringify(res?.data));

        localStorage.setItem("authUser", JSON.stringify(Profile));
        localStorage.setItem("userInfo", JSON.stringify(Profile));
        localStorage.setItem("myInfo", JSON.stringify(Profile));
        localStorage.setItem("role", JSON.stringify(Profile?.role));
        window.location.reload();
      }
    } catch (error) { }
  };
  return (
    <React.Fragment>
      <div className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-blue-100 transition'>
        <button
          onClick={handleReload}
          type="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
        >
          <IoReload className="text-[22px]"
            style={{ color: "#0d6efd" }}
          />
        </button>
      </div>
    </React.Fragment>
  )
}
