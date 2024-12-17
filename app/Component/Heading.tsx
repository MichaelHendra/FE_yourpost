import Image from "next/image";
import Link from "next/link";
export default function Heading() {
  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      <div className="flex justify-center gap-4">
        <Image src="/logo.png" height={48} width={48} alt="logo" />
        <p className="text-2xl font-bold flex justify-center items-center">
          YourPost
        </p>
      </div>
      <div className="flex justify-center items-center gap-4 ">
        <Link href="#" className="relative group font-semibold">
          Top Post{" "}
          <span className="absolute left-0 bottom-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
        <Link href="#" className="relative group font-semibold">
          Top Followers{" "}
          <span className="absolute left-0 bottom-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
        <Link href="#" className="relative group font-semibold">
          Trending{" "}
          <span className="absolute left-0 bottom-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
      </div>
      <div>
        <form className="max-w-md mx-auto">
          <label
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-violet-700 rounded-lg bg-gray-50 focus:ring-violet-700 focus:border-violet-700 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-800 dark:focus:border-violet-800"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-violet-700 dark:hover:bg-violet-400 dark:focus:ring-violet-800 transition-transform duration-100 hover:scale-105"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center items-center gap-4">
        <Link href="#">Bell</Link>
        <Link href="#">Haloo Meaw</Link>
      </div>
    </div>
  );
}
