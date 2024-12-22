import Image from "next/image";
import Link from "next/link";
import Home from "@/public/icons/home.png";
import Book from '@/public/icons/bookmark.png'
import Credit from "@/public/icons/credit.png"
import Setting from '@/public/icons/setting.png'
import Add from '@/public/icons/add.png'
export default function Sidebar() {
  return (
    <div className="absolute h-screen w-12 lg:w-16 text-white flex flex-col items-center py-4 px-4 space-y-6">
      <div className="container mx-auto">
        <div className="grid grid-rows-1 gap-8">
          <Link href="/">
            <Image src={Home} width={32} height={32} alt="home" className="rounded hover:bg-slate-700 hover:bg-opacity-50"/>
          </Link>
          <Link href="/">
            <Image src={Book} width={32} height={32} alt="bookmark" className="rounded hover:bg-slate-700 hover:bg-opacity-50"/>
          </Link>
          <Link href="/">
            <Image src={Credit} width={32} height={32} alt="Credit" className="rounded hover:bg-slate-700 hover:bg-opacity-50"/>
          </Link>
          <Link href="/settings">
            <Image src={Setting} width={32} height={32} alt="Setting" className="rounded hover:bg-slate-700 hover:bg-opacity-50"/>
          </Link>
          <Link href="/">
            <Image src={Add} width={32} height={32} alt="Add Post" className="rounded hover:bg-slate-700 hover:bg-opacity-50"/>
          </Link>
        </div>
      </div>
    </div>
  );
}
