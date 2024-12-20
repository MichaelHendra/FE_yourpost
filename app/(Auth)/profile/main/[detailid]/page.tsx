'use client';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import React, { useEffect, useState } from "react";
import Image from "next/image";
import img1 from "@/public/iofi.jpg";
import img2 from "@/public/pp.jpg";
import Cardpost from "@/app/Component/Cardpost";
import { userData } from "@/app/Hook/user";
import { userVideoList } from "@/app/Hook/video";

export default function Profile({ params }: { params: Promise<{ detailid: string }> }) {
  const [detailId, setDetailId] = useState<string>("");
  const [user, setUser ] = useState<any>(null);
  const [video, setVideo] = useState<any[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  // Unwrap the promise for params
  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params;
      setDetailId(resolvedParams.detailid);
    }

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!detailId) return;
    userData(detailId)
      .then((data) => {
        setUser (data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [detailId]);

  useEffect(() => {
    if (!detailId) return;
    userVideoList(detailId)
      .then((data) => {
        setVideo(data);
        setNotFound(data.length === 0); // Set notFound based on the length of data
      })
      .catch((error) => {
        setNotFound(true); // Set notFound to true if there's an error
      });
  }, [detailId]);

  if (loading) {
    return <div className="flex items-center justify-center content-center text-xl">Loading...</div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center content-center text-xl">No user data found.</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-10">
        <div className="p-4 ml-8 lg:ml-20">
          <div className="border-b pb-4">
            <div className="flex justify-center items-center">
              <Image
                src={user.banner || img1}
                width={1707}
                height={282}
                alt="Background"
                className="w-11/12 h-20 lg:h-44 rounded-lg"
              />
            </div>
            <div className="flex gap-4 mt-8 lg:ml-12 items-center">
              <div>
                <Image
                  src={user.photo || img2}
                  width={120}
                  height={120}
                  className="rounded-full w-full h-full lg:w-12/12 lg:h-full"
                  alt="Profile Picture"
                />
              </div>
              <div>
                <h1 className="text-md lg:text-4xl font-semibold">
                  {user.displayname || "No Display Name"}
                </h1>
                <p className="text-sm font-thin lg:pt-1">
                  {user.followers || "0"} Followers
                </p>
                <p className="text-sm font-thin lg:pt-1">
                  {user.email || "No Email"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4 pt-4 lg:ml-12">
              <button className="px-4 py-1 lg:px-6 lg:py-2 bg-gray-900 rounded-3xl hover:bg-gray-600">
                Follow
              </button>
              <button className="px-6 py-2 bg-black rounded-3xl border hover:bg-gray-900">
                Join
              </button>
            </div>
          </div>
          {notFound ? (
            <div className="flex items-center justify-center content-center text-xl pt-4">Not Upload Video Yet!</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4">
              {video.map((item, index) => {
                const thumbnailUrl = `${apiUrl}/uploads/thumbnails/${item.thumbnail.split('\\').pop()}`;
                return (
                  <Cardpost
                    key={index}
                    id_vid={item.id_vid}
                    thumbnail={thumbnailUrl}
                    title={item.title}
                    displayname={item.displayname}
                    photo={item.photo}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}