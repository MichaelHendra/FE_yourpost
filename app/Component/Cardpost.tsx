import Image from "next/image";
import img1 from "@/public/1.png";
import img2 from "@/public/pp.jpg";
import Link from "next/link";

export default function Cardpost({id_vid,title,thumbnail,displayname,photo}:{id_vid:string, title:string, thumbnail:string, displayname:string, photo:string}) {
  return (
    <div className="p-2 lg:p-4">
      <Link href={`/play/${id_vid}`}>
        <Image
          src={thumbnail}
          width={1000}
          height={1000}
          alt="content"
          className=" rounded transition-transform duration-100 hover:scale-105"
        />
        <h1 className="text-xl pt-2">{title}</h1>
        <div className="flex gap-4 lg:gap-2 pt-2">
          <Image
            src={photo|| img2}
            width={32}
            height={32}
            alt="Profile"
            className="rounded-full "
          />
          <p>{displayname}</p>
        </div>
      </Link>
    </div>
  );
}
