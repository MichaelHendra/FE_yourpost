"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import img2 from "@/public/icons/bell.png";
import Form from "next/form";

export default function Heading() {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isLogin, setLogin] = useState<boolean>(false);
  const [isUserId, setUserId] = useState<string>('');
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem('userid');
    setUserId(userid || '');
    if(token){
      setLogin(true);
    }
  },[]);

  return (
    <div className="p-4 flex flex-row md:flex-row md:justify-between items-center gap-4">
      {/* Logo and Title */}
      <div className="flex items-center gap-4">
        <Image src="/logo.png" height={48} width={48} alt="logo" />
        {/* <p className="text-2xl font-bold sm:hidden">YourPost</p> */}
      </div>
      {/* Search Form */}
      <div className=" w-8/12 lg:w-6/12">
        <Form action="/" className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 text-sm text-gray-900 border border-violet-700 rounded-lg focus:ring-violet-700 focus:border-violet-700 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search"
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
      <div className="flex flex-row justify-center items-center gap-4 relative">
        {/* Dropdown */}
        <div className="relative">
        { isLogin ?(
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-white bg-violet-600 hover:bg-violet-800 font-medium rounded-lg text-sm px-4 py-2 inline-flex items-center dark:bg-violet-600 dark:hover:bg-violet-700 transition-transform duration-100 hover:scale-105"
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
        ):(
          <Link href='/login' className="px-4 py-2 bg-violet-600 hover:bg-violet-300 rounded transition-transform duration-100 hover:scale-105">Login</Link>
        )}
          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-40 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link
                    href={`/profile/main/${isUserId}`}
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
