"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import img2 from "@/public/icons/bell.png";
import Form from "next/form";

export default function Heading() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="p-4 flex flex-col md:flex-row md:justify-between items-center gap-4">
      {/* Logo and Title */}
      <div className="flex items-center gap-4">
        <Image src="/logo.png" height={48} width={48} alt="logo" />
        <p className="text-2xl font-bold">YourPost</p>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex justify-center items-center gap-4">
        <Link href="#" className="relative group font-semibold">
          Top Post
          <span className="absolute left-0 bottom-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
        <Link href="#" className="relative group font-semibold">
          Top Followers
          <span className="absolute left-0 bottom-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
        <Link href="#" className="relative group font-semibold">
          Trending
          <span className="absolute left-0 bottom-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
      </div>

      {/* Search Form */}
      <div className="w-full lg:w-5/12">
        <Form action="/" className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 text-sm text-gray-900 border border-violet-700 rounded-lg focus:ring-violet-700 focus:border-violet-700 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-1 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-violet-700 dark:hover:bg-violet-400 transition-transform duration-100 hover:scale-105"
            >
              Search
            </button>
          </div>
        </Form>
      </div>

      {/* Notification and Dropdown */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 relative">
        <Link href="#">
          <Image src={img2} width={24} height={24} alt="bell" />
        </Link>
        <Link href="#" className="hidden md:block">
          Haloo Meaw
        </Link>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Menu
            <svg
              className="w-2.5 h-2.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-40 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/logout"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
