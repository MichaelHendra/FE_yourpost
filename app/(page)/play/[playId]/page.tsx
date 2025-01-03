"use client";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import Cardpost from "@/app/Component/Cardpost";
import Videoplayer from "@/app/Component/Videoplayer";
import img2 from "@/public/pp.jpg";
import Comment from "@/app/Component/Comment";
// import Like from "@/public/icons/like.png";
// import Dislike from "@/public/icons/dislike.png";
import { playVideo, listVideo } from "@/app/Hook/video";
import { listVideoAll, playVideoType } from "@/app/Type/video";
import { follow, followUser, unfollow } from "@/app/Hook/follow";

export default function Play({
  params,
}: {
  params: Promise<{ playId: string }>;
}) {
  const [vidId, setVidId] = useState<string>("");
  const [video, setVideo] = useState<playVideoType | null>(null);
  const [vidCard, setVidCard] = useState<listVideoAll[]>([]);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<string>("");
  const [popupLogin, setPopupLogin] = useState<string | null>(null);
  const closePopLogin = () => setPopupLogin(null);
  const [follow_id, setFollowId] = useState<string | null>(null);

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

  useEffect(() => {
    const user_follow = localStorage.getItem("userid");
    if (!video) return;
    if (!user_follow) return;
    const userFollowingTo = video?.id_user;
  
    followUser(userFollowingTo, user_follow)
      .then((response) => {
        console.log("Full Response:", response);
  
        if (!response.data || response.data.length === 0) {
          console.log("No followers found.");
          setIsFollowing(false);
        } else {
          const firstRecord = response.data[0]; // Assuming response.data is an array
          console.log("First Record:", firstRecord);
          setFollowId(firstRecord?.id_follow || null); // Safely access id_follow
          console.log("id_follow:", firstRecord?.id_follow);
          setIsFollowing(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching Follower data:", error);
      });
  }, [video, setFollowId]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(token);
    } else {
      return;
    }
  }, []);

  const handleFollow = async(e:FormEvent) => {
    e.preventDefault();
    const user_follow = localStorage.getItem("userid");
    const userFollowingTo = video?.id_user;
    if (!isLogin) {
      setPopupLogin(
        "Want To Follow This Profile ? Login To Follow This Profile"
      );
    }
    if (!user_follow) return;
    if (!userFollowingTo) return;
    const formData = new FormData();
    formData.append('user_follow', user_follow)
    formData.append('following_to', userFollowingTo)
    try{
      const response = await follow(formData);
        if(!response.data || response.data.length === 0){
        setIsFollowing(false);
        console.error('Failed To Follow Follow')
      }else{
        setIsFollowing(true);
      }
    }catch(e){
      console.error("Error Follow Profile:", e);
    }
  };

  const hanldeUnFollow = async (e:FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      setPopupLogin(
        "Want To Follow This Profile ? Login To Follow This Profile"
      );
    }
    const userFollowingTo1 = video?.id_user;

    if(!follow_id) return;
    if (!userFollowingTo1) return;

    const formData = new FormData();
    formData.append('id_follow', follow_id);
    formData.append('following_to', userFollowingTo1)

    try{
      const response = await unfollow(formData);
      if(!response.data || response.data.length === 0){
        setIsFollowing(false);
        console.log(response.data);
      }else{
        console.log("Success To Unfollow");
      }
    }catch(e){
      console.error('Error Unfollow Profile', e)
    }

  };

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
                        <Link href={`/profile/main/${video.id_user}`}>
                          <div className="ml-4">
                            <p className="font-semibold">{video.displayname}</p>
                            <p className="font-thin">
                              {video.followers} followers
                            </p>
                          </div>
                        </Link>
                        <div className="ml-4 flex items-center">
                          {!isFollowing ? (
                            <button
                              onClick={handleFollow}
                              className="px-6 py-2 font-semibold bg-violet-600 rounded hover:bg-violet-400"
                            >
                              Follow
                            </button>
                          ) : (
                            <button
                              onClick={hanldeUnFollow}
                              className="px-6 py-2 font-semibold bg-violet-600 rounded hover:bg-violet-400"
                            >
                              UnFollow
                            </button>
                          )}
                        </div>
                      </div>
                      {/* <div className="flex items-center justify-center">
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
                      </div> */}
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
                      const thumbnailUrl = `${apiUrl}/${item.thumbnail
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
            </div>
          </div>
        </div>
      </div>
      {popupLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-black p-6 rounded shadow-lg text-center`}>
            <h2 className="text-2xl mb-4">{popupLogin}</h2>
            <div className="flex justify-center gap-4">
              <Link
                href="/login"
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
              >
                Login
              </Link>
              <button
                onClick={closePopLogin}
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
