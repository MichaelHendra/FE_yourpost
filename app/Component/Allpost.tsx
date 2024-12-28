"use client";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import { useState, useEffect } from "react";
import Cardpost from "./Cardpost";
import { listVideo } from "../Hook/video";
import { listVideoAll } from "../Type/video";

export default function Allpost() {
  // Correctly define the type of `video` state as an array
  const [video, setVideo] = useState<listVideoAll[]>([]);

  useEffect(() => {
    listVideo()
      .then((response) => { // Log the entire response
        setVideo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, []);

  return (
    <div className="px-10">
      <div className="overflow-hidden">
        <p className="text-2xl py-4">Recent Videos</p>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {video.map((item, index) => {
            const thumbnailUrl = `${apiUrl}/${item.thumbnail?.split("\\").pop()}`;
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
  );
}