"use client";
import MySVG from "@/SVG/MySVG";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  // redirect('/login')
  const router = useRouter();
  return (
    <section className={`bg-amber-400 w-full h-screen flex items-center justify-center text-center`} >
      <div className="">
        <div className="flex flex-row-reverse ">
          <h1 className="text-xl font-medium">Welcome to the homepage of the (Center Education) platform</h1> 
          <Image
            src={MySVG.logoSm}
            alt="Center_Education logo"
            className="mx-2"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <p className="text-xl font-medium my-2.5">This is the main content of the home page</p>
        <button 
          className="rounded-[10px] py-2.5 px-6 my-3.5 text-white bg-blue-700 hover:bg-blue-800 cursor-pointer"
          onClick={() => { router.push('/login') }}
        >
          Login 
        </button>
      </div>
    </section>
  );
}
