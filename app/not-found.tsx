import Image from "next/image";
import Logo1 from "@/public/logo.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <Image src={Logo1} width={64} height={64} alt="Logo" />
        <h2 className="text-center text-2xl mt-4">Page Not Found</h2>
        <p className="text-center text-2xl mt-2">404</p>
        <p className="text-center mt-2">Video Not Found Or Deleted</p>
        <Link href='/login' className="px-6 py-2 bg-violet-600 hover:bg-violet-400 rounded mt-4">Back To Home</Link>
      </div>
    </div>
  );
}