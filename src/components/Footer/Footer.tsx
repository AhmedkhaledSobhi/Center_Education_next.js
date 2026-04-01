import React from 'react'

export default function Footer() {
  return (
    <React.Fragment>
      <footer 
        className=" p-2.5"
        style={{
          // width: "calc(100% - 19.66667%)",
          height: "30%",
        }}
      >
        {new Date().getFullYear()} © Center Education.
      </footer>
      
    </React.Fragment>
  )
}
