import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import BG from "@/public/photos/sangatxd.jpg";

export default function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-center items-center bg-gray-700 p-4">
        <div className="mb-10 md:mb-0 md:mr-10">
          <Image src={BG} width={350} height={500} alt="login" />
        </div>
        <div>
          <div className="flex justify-center">
            <h1 className="block mb-2 font-medium text-gray-900 dark:text-white text-5xl">
              Login
            </h1>
          </div>
          <div className="pt-4">
          <Form action="/" className="max-w-sm mx-auto">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                id="email"
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
                id="password"
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
          </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
