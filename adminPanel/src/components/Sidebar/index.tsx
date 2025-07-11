"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay,faBagShopping, faBlog, faNewspaper,faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from "@fortawesome/free-solid-svg-icons/faAddressCard";
import { faSitemap } from "@fortawesome/free-solid-svg-icons/faSitemap";
import { fetchCompany } from "../Tables/TableEleven";
import { Company } from "@/types/company";
import { useQuery } from "@tanstack/react-query";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "",
    menuItems: [
      {
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
              fill=""
            />
            <path
              d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
              fill=""
            />
            <path
              d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
              fill=""
            />
            <path
              d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
              fill=""
            />
          </svg>
        ),
        label: "Dashboard",
        route: "/admin",
      },
      // {
      //   icon: (
      //     <FontAwesomeIcon icon={faNewspaper} style={{color: "#FFFFFF",}} />
      //   ),
      //   label: "News & Event Management",
      //   route: "#",
      //   children: [
      //     { label: "Categories", route: "/admin/news-event/categories" },
      //     { label: "News & Events", route: "/admin/news-event/categoriesdetail" },
      //   ],
      // },
      {
        icon: (
          <FontAwesomeIcon icon={faBlog} style={{color: "#FFFFFF",}} />
        ),
        label: "Blog Management",
        route: "#",
        children: [
          { label: "Categories", route: "/admin/blog-management/categories" },
          { label: "Blogs", route: "/admin/blog-management/products" },
        ],
      },
      // {
      //   icon: (
      //     <FontAwesomeIcon icon={faBagShopping} style={{color: "#FFFFFF",}} />
      //   ),
      //   label: "Products Management",
      //   route: "#",
      //   children: [
      //     {
      //       label: "Categories",
      //       route: "/admin/product-management/product-categories",
      //     },
      //     { label: "Products", route: "/admin/product-management/product-details" },
      //   ],
      // },
      // {
      //   icon: (
      //     <FontAwesomeIcon icon={faPlay} style={{color: "#FFFFFF",}} />
      //   ),
      //   label: "Media Management",
      //   route: "#",
      //   children: [
      //     {
      //       label: "Slider",
      //       route: "/admin/media-management/slider",
      //     },
      //     { label: "Gallery", route: "/admin/media-management/gallery"},
      //   ],
      // },
      {
        icon: (
          <FontAwesomeIcon icon={faPeopleArrows} style={{color: "#FFFFFF",}} />
        ),
        label: "Social Management",
        route: "#",
        children: [
          {
            label: "Social Links",
            route: "/admin/social-management/social-links",
          },
          { label: "Testimony", 
            route: "/admin/social-management/testimony"
          },
          { label: "Our Clients", 
            route: "/admin/social-management/our-clients"
          },
        ],
      },
      {
        icon: (
          <FontAwesomeIcon icon={faAddressCard} style={{color: "#FFFFFF",}} />
        ),
        label: "About Us",
        route: "#",
        children: [
          {
            label: "Our Teams",
            route: "/admin/about-us-management/our-teams",
          },
          { label: "Why Choose Us", route: "/admin/about-us-management/why-choose-us"},
          { label: "Contact Form", route: "/admin/about-us-management/contact-form"},
        ],
      },
      {
        icon: (
          <FontAwesomeIcon icon={faSitemap} style={{color: "#FFFFFF",}} />
        ),
        label: "Site Configuration",
        route: "/admin/site-configuration",
      },

    ],
  },

];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const {
    data: companyData,
    isLoading,
    error,
    refetch
  } = useQuery<Company[]>({
    queryKey: ["company"],
    queryFn: fetchCompany,
  });
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image
              width={70}
              height={70}
              src={companyData?.[0]?.logo_url || "/images/logo/logo.svg"}
              alt="Logo"
              priority
              className="rounded-full"
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
