"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BG from "@/public/photos/sangatxd.jpg";
import { FormEvent, useEffect, useState } from "react";
import { loginUser } from "@/app/Hook/user";


export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  const closePopup = () => setPopupMessage(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      router.push('/');
    }
  }, [router]);


  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
    });
    if (response.token) {
      setIsSuccess(true);
      setPopupMessage("Login Successs !");
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userid", response.userid);
        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("userid"));
        
      }
      const homeURL = "/";
      window.location.href = homeURL;
    } else {
      setIsSuccess(false);
      setPopupMessage("Login Failed Email Or Password Is Wrong !");
    }
  };
  
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
              Login
            </h1>
          </div>
          <div className="pt-4 p-10">
            <form onSubmit={handleLogin} className="max-w-sm mx-auto">
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@ourpost.my.id"
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
                  id="password"
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
                  Login
                </button>
                <Link
                  href="/register"
                  className="px-6 py-2 bg-gray-900 hover:bg-violet-500"
                >
                  Register
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
