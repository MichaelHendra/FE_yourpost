"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import BG from "@/public/photos/sangatxd.jpg";
import { registerUser } from "@/app/Hook/user";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const [displayname, setDisplayname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem('token');

    if(token){
      router.push('/');
    }
  },[router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
        const response = await registerUser ({
            displayname,
            email,
            password,
        });
        console.log(response.displayname);
        if (response.displayname) {
            setIsSuccess(true);
            setPopupMessage("Registration Success!");
            const homeURL = "/login";
            window.location.href = homeURL;
        } else {
            setIsSuccess(false);
            setPopupMessage("Failed To Create User!");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle the error response from the server
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            setIsSuccess(false);
            setPopupMessage(errorMessage);
        } else {
            // Handle unexpected errors
            setIsSuccess(false);
            setPopupMessage("An unexpected error occurred. Please try again.");
        }
    }
};
  const closePopup = () => setPopupMessage(null);
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-center items-center bg-gray-700 p-4 rounded">
        <div className="mb-10 md:mb-0 md:mr-10">
          <Image
            src={BG}
            width={350}
            height={500}
            alt="login"
            className="rounded pl-6"
          />
        </div>
        <div>
          <div className="flex justify-center">
            <h1 className="block mb-2 font-medium text-gray-900 dark:text-white text-5xl">
              Register
            </h1>
          </div>
          <div className="pt-4 p-10">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Name
                </label>
                <input
                  type="text"
                  name="displayname"
                  value={displayname}
                  onChange={(e) => setDisplayname(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nama Mu Gan"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@yourpost.my.id"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex justify-between gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 font-semibold bg-violet-600 text-white rounded hover:bg-violet-400"
                >
                  Register
                </button>
                <Link
                  href="/login"
                  className="px-6 py-2 bg-gray-900 text-white hover:bg-violet-500 rounded"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {popupMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`bg-white p-6 rounded shadow-lg text-center ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            <h2 className="text-2xl mb-4">{popupMessage}</h2>
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
