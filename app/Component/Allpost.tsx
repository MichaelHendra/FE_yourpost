"use client";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useState, useEffect } from "react";
import Cardpost from "./Cardpost";
import { listVideo } from "../Hook/video";

export default function Allpost() {
  const [video, setVideo] = useState<any[]>([]);

  useEffect(() => {
    listVideo()
      .then((data) => {
        setVideo(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="px-10">
      <div className="overflow-hidden">
        <p className="text-2xl py-4">Recent video</p>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {video.map((item, index) => {
            const thumbnailUrl = `${apiUrl}/uploads/thumbnails/${item.thumbnail
              .split("\\")
              .pop()}`;
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
