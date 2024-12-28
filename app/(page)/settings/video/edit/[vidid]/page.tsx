'use client';

import { editVideo, playVideo } from "@/app/Hook/video";
import { useState, useEffect, FormEvent } from "react";

export default function VideoEdit({ params }: { params: Promise<{ vidid: string }> }) {
  const [id_vid, setVidId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [desc_vid, setDescription] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videos, setVideo] = useState<File | null>(null);
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
    async function fetchParams() {
      try {
        const resolvedParams = await params;
        setVidId(resolvedParams.vidid);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    }
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (id_vid) {
      playVideo(id_vid)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.desc_vid);
        })
        .catch((error) => {
          console.error("Error fetching video data:", error);
        });
    }
  }, [id_vid]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!id_user) {
      window.location.href = "/login";
      return;
    }
  
    // Create a new FormData instance
    const formData = new FormData();
  
    // Append form fields (text fields)
    formData.append("id_user", id_user);
    formData.append("title", title);
    formData.append("desc_vid", desc_vid);
  
    // Conditionally append the file fields (thumbnail and videos)
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
  
    if (videos) {
      formData.append("videos", videos);
    }
  
    try {
      const response = await editVideo(id_vid, formData); // Send the FormData instance
      if (response) {
        window.location.href = "/settings/video";
      }
    } catch (error) {
      console.error("Error editing video:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="ml-10 lg:ml-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Edit Video</h1>
          <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4 p-2 border border-gray-300 bg-black rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={desc_vid}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4 p-2 border border-gray-300 bg-black rounded"
              required
            />
            
            <label className="mb-2">Upload New Thumbnail</label>
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              accept="image/*"
              className="mb-4"
            />
            
            <label className="mb-2">Upload New Video</label>
            <input
              type="file"
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
              accept="video/*"
              className="mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
