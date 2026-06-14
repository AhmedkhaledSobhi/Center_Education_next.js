"use client"
import React, { useEffect, useState } from 'react'
import LoadingBar from "react-top-loading-bar";
import { ThreeDots } from "react-loader-spinner";

interface ButtonLoaderProps {
  height?: string | number;
  width?: string | number;
  color?: string;
}

export default function ButtonLoader({ 
  height = "20",
  width = "20",
  color = "#fff", 
}: ButtonLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increase progress until it reaches 100%
      if (progress < 100) {
        setProgress(progress + 5);
      } else {
        // If progress reaches 100%, clear the interval and reset progress
        clearInterval(interval);
        setProgress(0);
      }
    }, 100); // Adjust the interval duration as needed
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [progress]);
  return (
    <React.Fragment>
      {" "}
      <LoadingBar
        color='#0d6efd'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />{" "}
      <ThreeDots
        height={height ?? "20"}
        width={width ?? "20"}
        radius="9"
        color={color ?? "#fff"}
        ariaLabel="three-dots-loading"
        wrapperClass=""
        visible={true}
      />
    </React.Fragment>
  )
}
