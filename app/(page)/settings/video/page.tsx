'use client'
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useEffect, useState } from "react";
import DashHeading from "@/app/Component/DashHeading";
import Image from "next/image";
import Link from "next/link";
import { userVideoList } from "@/app/Hook/video";
import { videoListUser } from "@/app/Type/video";


export default function VideoSetting() { // Renamed to PascalCase
  const [videos, setVideo] = useState<videoListUser[]>([]);
  const [id_user, setIdUser] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      window.location.href = "/login";
    } else {
      setIdUser(userId);
    }
  }, []);

  useEffect(() => {
    if (id_user) {
      userVideoList(id_user)
        .then((response) => {
          setVideo(response.data);
        })
        .catch((error) => {
          console.error("Error Fetching List Video!:", error);
        });
    }
  }, [id_user]);

  const handleDelete = (id: string) => {
    console.log(`Delete video with ID: ${id}`);
    // Add delete logic here
  };

  return (
    <div className="min-h-screen">
      <div className="pb-4">
        <DashHeading />
      </div>
      <div className="ml-10 lg:ml-20">
        <div className="flex justify-between">
          <h1 className="text-4xl">List Videos</h1>
          <Link
            href="/settings/video/store"
            className="px-6 py-2 bg-violet-700 hover:bg-violet-500 rounded mr-4"
          >
            Add Videos
          </Link>
        </div>
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b border-slate-600">Thumbnail</th>
                <th className="border-b border-slate-600">Title</th>
                <th className="border-b border-slate-600">Description</th>
                <th className="border-b border-slate-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((item, index)=>{
                const thumbnailUrl = `${apiUrl}/${item.thumbnail?.split("\\").pop()}`;
                return(
                  <tr key={index}>
                  <td className="text-center">
                    <Image
                      src={thumbnailUrl}
                      width={128}
                      height={128}
                      alt="thumbnail"
                      className="rounded-2xl mt-4"
                    />
                  </td>
                  <td className="text-center">{item.title}</td>
                  <td className="text-center">{item.desc_vid}</td>
                  <td className="text-center">
                    <div className="flex justify-center gap-4">
                      <Link
                        href={`/settings/video/edit/${item.id_vid}`}
                        className="px-6 py-2 bg-blue-700 hover:bg-blue-500 rounded"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id_vid)}
                        className="px-6 py-2 bg-red-700 hover:bg-red-500 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
