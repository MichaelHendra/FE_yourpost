'use client'
import { useState } from "react";
export default function StoreVideo() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [thumbnail, setThumnail] = useState<string>("");
  const [enterThumbnail, setEnterThumbnail] = useState(false);
  const [video, setVideo] = useState<string>("");
  const [enterVideo, setEnterVideo] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    
  }

  return (
    <div className="min-h-screen">
      <div className="ml-10 lg:ml-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
          <form className="flex flex-col w-full max-w-md">
            <input
              type="text"
              placeholder="Title"
              className="mb-4 p-2 border border-gray-300 rounded"
              required
            />
            <textarea
              placeholder="Description"
              className="mb-4 p-2 border border-gray-300 rounded"
              required
            />
            <label className="h-full flex flex-col">Upload Thumbnail</label>
            <input type="file" accept="image/*" className="mb-4" required />
            <label className="h-full flex flex-col">Upload Video</label>
            <input type="file" accept="video/*" className="mb-4" required />
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
