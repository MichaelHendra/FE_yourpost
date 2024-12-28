'use client';
import { videoStore } from "@/app/Hook/video";
import { FormEvent, useState } from "react";

export default function StoreVideo() {
  const [title, setTitle] = useState<string>("");
  const [desc_vid, setDescription] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videos, setVideo] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const id_user = localStorage.getItem("userid");
    if (!id_user) {
      const login = "/login";
      window.location.href = login;
      return;
    }

    if (!thumbnail || !videos) {
      alert("Please upload both thumbnail and video files.");
      return;
    }
    try {
      const response = await videoStore({
        id_user,
        title,
        desc_vid,
        thumbnail,
        videos
      });
      if (response.data) {
        const dashboard = '/settings/video';
        window.location.href = dashboard;
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="ml-10 lg:ml-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
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
            <label className="mb-2">Upload Thumbnail</label>
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              accept="image/*"
              className="mb-4"
              required
            />
            <label className="mb-2">Upload Video</label>
            <input
              type="file"
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
              accept="video/*"
              className="mb-4"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
