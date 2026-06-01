"use client";
import React from 'react'
import { Undo2 } from 'lucide-react'

export default function BackDropdown() {
  return (
    <React.Fragment>
      <div className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-blue-100 transition'>
        <button
          onClick={() => window.history.back()}
          type="button"
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle cursor-pointer"
        >
          <Undo2 
            className="text-[#0d6efd] text-[22px]"
          />
        </button>
      </div>
    </React.Fragment>
  )
}
