"use client";
import React, { useState, ReactNode } from "react";
// import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Navbar from "../Navbar";

export default function DefaultLayout2({
  children,
}: {
  children: React.ReactNode;
}) {
    const navItems = [
        { label: "About Us", href: "/about" },
        { label: "Products", dropdownItems: [
            { label: "Product 1", href: "/products/1" },
            { label: "Product 2", href: "/products/2" },
          ]
        },
        { label: "Gallery", href: "/gallery" },
        { label: "News & Events", dropdownItems: [
            { label: "Event 1", href: "/events/1" },
            { label: "Event 2", href: "/events/2" },
          ]
        },
        { label: "Blogs", href: "/blogs" },
        { label: "Contact Us", href: "/contact" },
      ];
      
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col min-h-[100vh]">
          {/* <!-- ===== Header Start ===== --> */}
          <Navbar
          logoSrc="https://flowbite.com/docs/images/logo.svg"
          brandName="Flowbite"
          navItems={navItems}
        />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto w-full p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
