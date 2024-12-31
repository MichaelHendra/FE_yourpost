"use client";
import orang from "@/public/face.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { allComment } from "../Type/comment";
import { ListComment } from "../Hook/comment";
export default function Comment({ id_video }: { id_video: string }) {
  // const [user_id, setUserId] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [allComment, setAllComment] = useState<allComment[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const closePopup = () => setPopupMessage(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // const userId = localStorage.getItem("userid");
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      // setUserId(userId);
    }
  }, []);

  useEffect(() => {
    ListComment(id_video)
      .then((response) => {
        console.log(response);
        setAllComment(response.data);
      })
      .catch((err) => {
        console.error("Error Fetch Data = ", err);
      });
  }, [id_video]);

  const handleComment = () => {
    if (isLogin == false) {
      setPopupMessage("You Must Login First To Comment This Video");
      return;
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <div>69 Comments</div>
        <div>Newest</div>
      </div>
      <form onSubmit={handleComment}>
        <div className="pt-2 flex">
          <input
            type="text"
            id="first_name"
            name={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-gray-50 border-b-4 border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
            placeholder="Comment"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-r-lg border-b-4 border-violet-700 bg-violet-500 text-white hover:bg-violet-600 dark:border-gray-600 dark:bg-violet-500 dark:hover:bg-violet-600 dark:hover:border-violet-500 focus:outline-none"
          >
            Sent
          </button>
        </div>
      </form>
      <div>
        {allComment.map((item, index) => {
          return (
            <div key={index} className="pt-4">
              <div className="flex">
                <div className="rounded-lg">
                  <Image src={orang} width={48} height={48} alt="user" />
                </div>
                <div className="ml-4">
                  <div className="flex gap-4">
                    <h1>{item.displayname}</h1>
                    <p className="font-thin"> 69 second ago</p>
                  </div>
                  <div>
                    <p>{item.comments}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {popupMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-white p-6 rounded shadow-lg text-center`}>
            <h2 className="text-2xl mb-4">{popupMessage}</h2>
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
