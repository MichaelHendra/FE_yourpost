"use client";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useEffect, useState } from "react";
import DashHeading from "@/app/Component/DashHeading";
import Image from "next/image";
import Link from "next/link";
import { deleteVideo, userVideoList } from "@/app/Hook/video";
import { videoListUser } from "@/app/Type/video";

export default function VideoSetting() {
  const [videos, setVideo] = useState<videoListUser[]>([]);
  const [id_user, setIdUser] = useState<string | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const closePopup = () => setPopupMessage(null);
  const [id_vid, setIdVid] = useState<string>("");
  const [isLogin, setIsLogin] = useState<string>("");

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    const token = localStorage.getItem('token');
    if (!userId || !token) {
      window.location.href = "/login";
    } else {
      setIdUser(userId);
      setIsLogin(token);
    }
  }, []);

  useEffect(() => {
    if (id_user) {
      userVideoList(id_user,isLogin)
        .then((response) => {
          setVideo(response.data);
        })
        .catch((error) => {
          console.error("Error Fetching List Video!:", error);
        });
    }
  }, [id_user,isLogin]);

  const handleDeleteMessage = (id: string) => {
    setPopupMessage("Do You Want To Delete Video ?");
    setIdVid(id);
  };

  const handleDelete = (id_vid: string) => {
    if (id_vid) {
      deleteVideo(id_vid) // Call the delete function when the user confirms
        .then(() => {
          setVideo(videos.filter((video) => video.id_vid !== id_vid));
          closePopup() // This removes the deleted video from the list
        })
        .catch((error) => {
          console.error("Error deleting video:", error);
        });
    }
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
              {videos.map((item, index) => {
                const thumbnailUrl = `${apiUrl}/${item.thumbnail
                  ?.split("\\")
                  .pop()}`;
                return (
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
                          onClick={() => handleDeleteMessage(item.id_vid)}
                          className="px-6 py-2 bg-red-700 hover:bg-red-500 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {popupMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-violet-500 p-6 rounded shadow-lg text-center">
              <h2 className="text-2xl mb-4">{popupMessage}</h2>

              <div className="flex gap-4 justify-center items-center">
                <button
                  onClick={() => handleDelete(id_vid)} // Call handleDelete only when the button is clicked
                  className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-600"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={closePopup} // This closes the modal
                  className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
