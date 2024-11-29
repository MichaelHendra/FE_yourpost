import Image from "next/image";
import Link from "next/link";
export default function Heading() {
  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      <div className="flex justify-start pl-5 gap-4">
        <Image src="/logo.png" height={48} width={48} alt="logo" />
        <p className="text-2xl font-bold flex justify-center items-center">
          YourPost
        </p>
      </div>
      <div className="flex justify-center items-center gap-6">
        <Link href="#">Top Post</Link>
        <Link href="#">Top Followers</Link>
        <Link href="#">Trending</Link>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-full px-3">
          <input
            className="appearance-none block bg-gray-800 text-white p-2 pr-20"
            type="text"
            placeholder="Search Post"
          />
        </div>
        <div className="bg-gray-800 p-2">
          <button type="submit">
            Search
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center gap-6">
        <Link href="#">Bell</Link>
        <Link href="#">Haloo Meaw</Link>
      </div>
    </div>
  );
}
