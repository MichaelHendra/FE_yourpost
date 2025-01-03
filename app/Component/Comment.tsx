import { FormEvent, useEffect, useState, useRef } from "react";
import { allComment } from "../Type/comment";
import {
  deleteComment,
  ListComment,
  postComment,
  updateComment,
} from "../Hook/comment";
import orang from "@/public/face.jpg";
import Image from "next/image";

export default function Comment({ id_video }: { id_video: string }) {
  const [user_id, setUserId] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [allComment, setAllComment] = useState<allComment[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const closePopup = () => setPopupMessage(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editPopupId, setEditPopupId] = useState<string | null>(null); // Change here
  const closePopupEdit = () => setEditPopupId(null);
  const [deletePopupId, setDeletePopupId] = useState<string | null>(null);
  const closePopUpDelete = () => setDeletePopupId(null);

  const dropdownRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    ListComment(id_video)
      .then((response) => {
        setAllComment(response.data);
      })
      .catch((err) => {
        console.error("Error Fetch Data = ", err);
      });
  }, [id_video]);

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    if (isLogin == false || !user_id) {
      setPopupMessage("You Must Login First To Comment This Video");
      return;
    }
    const dataForm = new FormData();

    dataForm.append("user_id", user_id);
    dataForm.append("comments", comment);
    dataForm.append("id_vid", id_video);

    try {
      const response = await postComment(id_video, dataForm);
      if (response) {
        setAllComment((prev: allComment[]) => [
          ...prev,
          {
            id_comments: response.data.id_comments,
            displayname: response.data.displayname,
            comments: response.data.comments,
            user_id, // Include user_id
            id_vid: id_video, // Include id_vid
            status: "1", // Or another default value
          },
        ]);
        // Clear the comment input field
        setComment("");
      }
    } catch (e) {
      console.error("Error Post Comment:", e);
    }
  };

  const handleUpdateComment = async (e: FormEvent) => {
    e.preventDefault();
    if (editPopupId === null) return;
    const dataForm = new FormData();
    dataForm.append("comments", comment);

    try {
      const response = await updateComment(editPopupId, dataForm);
      if (response) {
        setAllComment((prev) =>
          prev.map((item) =>
            item.id_comments === response.data.id_comments
              ? { ...item, comments: response.data.comments }
              : item
          )
        );
        setComment("");
        setEditPopupId(null);
      }
    } catch (e) {
      console.error("Error Updating Comment = ", e);
    }
    closePopupEdit();
  };

  const handleDeleteComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!deletePopupId) return;
    deleteComment(deletePopupId)
      .then(() => {
        setAllComment(
          allComment.filter(
            (allComment) => allComment.id_comments !== deletePopupId
          )
        );
        closePopUpDelete();
      })
      .catch((e) => {
        console.error("Error fetching video data:", e);
      });
  };

  const toggleMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current[openMenuId || ""]?.contains(
          event.target as Node
        ) === false
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  return (
    <div>
      <div className="flex justify-between">
      <div>{allComment.length} Comments</div>
        <div>Newest</div>
      </div>
      <form onSubmit={handleComment}>
        <div className="pt-2 flex">
          <input
            type="text"
            id="comment"
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
            <div key={index}>
              <div className="pt-4">
                <div className="flex justify-between">
                  <div className=" flex">
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
                  {user_id === item.user_id ? (
                    <div
                      className="relative"
                      ref={(el) => {
                        dropdownRef.current[item.id_comments] = el;
                      }}
                    >
                      <button
                        onClick={() => toggleMenu(item.id_comments)}
                        aria-expanded={openMenuId === item.id_comments}
                      >
                        ...
                      </button>
                      {openMenuId === item.id_comments && (
                        <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg w-40">
                          <ul className="py-1 text-sm">
                            <li>
                              <button
                                onClick={() => {
                                  setEditPopupId(item.id_comments); // Set the ID of the comment to edit
                                  setComment(item.comments); // Set the comment text for editing
                                }}
                                className="flex items-center w-full px-4 py-1 hover:bg-gray-700"
                              >
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                className="flex items-center w-full px-4 py-1 hover:bg-gray-700"
                                onClick={() => {
                                  setDeletePopupId(item.id_comments);
                                }}
                              >
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className="relative"
                      ref={(el) => {
                        dropdownRef.current[item.id_comments] = el;
                      }}
                    >
                      <button
                        onClick={() => toggleMenu(item.id_comments)}
                        aria-expanded={openMenuId === item.id_comments}
                      >
                        ...
                      </button>
                      {openMenuId === item.id_comments && (
                        <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg w-40">
                          <ul className="py-1 text-sm">
                            <li>
                              <button
                                className="flex items-center w-full px-4 py-1 hover:bg-gray-700"
                                onClick={() => {
                                  console.log("Delete clicked");
                                }}
                              >
                                Report
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
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

      {editPopupId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-black p-6 rounded shadow-lg text-center`}>
            <h2 className="text-2xl mb-4">Edit Comment</h2>
            <form onSubmit={handleUpdateComment}>
              <input
                type="text"
                id="comment"
                value={comment} // Use the comment state for the input value
                onChange={(e) => setComment(e.target.value)}
                className="bg-gray-50 border-b-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
                placeholder="Comment"
                required
              />
              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
                >
                  Submit
                </button>
                <button
                  onClick={closePopupEdit}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deletePopupId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-black p-6 rounded shadow-lg text-center`}>
            <h2 className="text-2xl mb-4">Delete Tour Comment ?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteComment}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
              >
                Yes
              </button>
              <button
                onClick={closePopUpDelete}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
