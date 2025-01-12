"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";

interface NavbarProps {
  logoSrc: string;
  brandName: string;
  navItems: NavItem[];
}

interface NavItem {
  label: string;
  href?: string;
  dropdownItems?: DropdownItem[];
}

interface DropdownItem {
  label: string;
  href: string;
}

const Navbar: React.FC<NavbarProps> = ({ logoSrc, brandName, navItems }) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white drop-shadow-md dark:bg-boxdark dark:drop-shadow-none">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo and Navigation */}
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src={logoSrc}
              width={60}
              height={60}
              loading="lazy"
              alt={`${brandName} Logo`}
              className="w-auto h-auto md:w-12 md:h-12"
              layout="intrinsic"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white px-4">
              {brandName}
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex flex-grow justify-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {item.label}
                  </Link>
                ) : item.dropdownItems ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                    >
                      {item.label}
                      <svg
                        className="w-2.5 h-2.5 ml-2.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                        aria-hidden="true"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1l4 4 4-4"
                        />
                      </svg>
                    </button>

                    <div
                      className={`absolute z-10 font-normal bg-white dark:bg-boxdark divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 transform transition-transform duration-300 ease-in-out ${
                        openDropdown === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-5"
                      }`}
                    >
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                        {item.dropdownItems?.map((dropdownItem, idx) => (
                          <li key={idx}>
                            <Link
                              href={dropdownItem.href}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-200 hover:text-black"
                            >
                              {dropdownItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : null}
              </li>
            ))}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            {/* Implement a hamburger menu for mobile if needed */}
            <button className="text-gray-900 dark:text-white focus:outline-none">
              {/* Hamburger icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dark Mode Switcher */}
        <div className="flex items-center space-x-4 h-1 pb-5">
          <DarkModeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
