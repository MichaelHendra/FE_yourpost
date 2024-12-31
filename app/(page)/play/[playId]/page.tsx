"use client";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useState, useEffect } from "react";
import Image from "next/image";
import Form from "next/form";
import Cardpost from "@/app/Component/Cardpost";
import Videoplayer from "@/app/Component/Videoplayer";
import img2 from "@/public/pp.jpg";
import Comment from "@/app/Component/Comment";
import Like from "@/public/icons/like.png";
import Dislike from "@/public/icons/dislike.png";
import { playVideo, listVideo } from "@/app/Hook/video";
import { listVideoAll, playVideoType } from "@/app/Type/video";

export default function Play({
  params,
}: {
  params: Promise<{ playId: string }>;
}) {
  const [vidId, setVidId] = useState<string>("");
  const [video, setVideo] = useState<playVideoType | null>(null);
  const [vidCard, setVidCard] = useState<listVideoAll[]>([]);

  useEffect(() => {
    async function fetchParams() {
      try {
        const resolvedParams = await params;
        setVidId(resolvedParams.playId);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (vidId) {
      playVideo(vidId)
        .then((response) => {
          setVideo(response.data); // Set the object directly
        })
        .catch((error) => {
          console.error("Error fetching video data:", error);
        });
    }
  }, [vidId]);

  useEffect(() => {
    listVideo()
      .then((response) => {
        setVidCard(response.data);
      })
      .catch((error) => {
        console.error("Error fetching video list:", error);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center">
        <div className="flex flex-col lg:flex-row overflow-hidden">
          {/* Left Section - Videoplayer */}
          <div className="flex-1 p-4 sm:p-8 lg:ml-20">
            <div className="px-4 sm:px-10">
              <div className="flex flex-col lg:flex-row justify-start">
                {video && ( // Render only if video is not null
                  <div className="w-full p-2 sm:p-4">
                    <Videoplayer
                      src={`${apiUrl}/${video.videos.split("\\").pop()}`}
                      poster={`${apiUrl}/${video.thumbnail.split("\\").pop()}`}
                    />
                    <h1 className="text-xl sm:text-2xl lg:text-3xl pt-4 sm:pt-6 font-semibold">
                      {video.title}
                    </h1>
                    <div className="flex justify-between">
                      <div className="flex gap-4 lg:gap-2 pt-2 items-center">
                        <Image
                          src={img2}
                          width={32}
                          height={32}
                          alt="Profile"
                          className="rounded-full"
                        />
                        <div className="ml-4">
                          <p className="font-semibold">{video.displayname}</p>
                          <p className="font-thin">
                            {video.followers} followers
                          </p>
                        </div>
                        <div className="ml-4 flex items-center">
                          <Form action="/">
                            <button
                              type="submit"
                              className="px-6 py-2 font-semibold bg-violet-600 rounded hover:bg-violet-400"
                            >
                              Follow
                            </button>
                          </Form>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <Form action="/">
                          <div className="px-4 py-2 bg-gray-900 rounded-l-lg hover:bg-violet-500">
                            <button type="submit">
                              <Image
                                src={Like}
                                width={16}
                                height={16}
                                alt="like"
                              />
                            </button>
                          </div>
                        </Form>
                        <Form action="/">
                          <div className="px-4 py-2 bg-gray-900 rounded-r-lg hover:bg-violet-500">
                            <button type="submit">
                              <Image
                                src={Dislike}
                                width={16}
                                height={16}
                                alt="dislike"
                              />
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                    <div className="pt-6">
                      <Comment id_video={vidId} />
                    </div>
                  </div>
                )}

                {/* Right Section - Cardpost */}
                <div className="flex justify-center mt-4 lg:mt-0 lg:ml-8">
                  <div className="w-full max-w-sm md:max-w-md lg:w-96">
                    <h1 className="font-semibold text-xl"> May You Like :3</h1>
                    {vidCard.map((item, index) => {
                      const thumbnailUrl = `${apiUrl}/${item.thumbnail.split("\\").pop()}`;
                      return (
                        <div key={index} className="flex items-center">
                          <Cardpost
                            id_vid={item.id_vid}
                            thumbnail={thumbnailUrl}
                            title={item.title}
                            displayname={item.displayname}
                            photo={item.photo}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
