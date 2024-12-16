import Image from "next/image";
import Cardpost from "../Component/Cardpost";
import Videoplayer from "../Component/Videoplayer";
import pic1 from "@/public/1.png";
import img2 from "@/public/face.jpg";
import Comment from "../Component/Comment";

export default function Play() {
  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center">
        <div className="flex flex-col lg:flex-row overflow-hidden ">
          {/* Left Section - Videoplayer */}
          <div className="flex-1 p-4 sm:p-8 lg:ml-20">
            <div className="px-4 sm:px-10">
              <div className="flex flex-col lg:flex-row justify-start">
                <div className="w-full lg:w-fit p-2 sm:p-4">
                  <Videoplayer src="/vid/vid1.mp4" poster={pic1.src} />
                  <h1 className="text-xl sm:text-2xl lg:text-3xl pt-4 sm:pt-6 font-semibold">
                    sangat XD
                  </h1>
                  <div className="flex justify-between">
                    <div className="flex gap-4 lg:gap-2 pt-2 first-letter:items-center">
                      <Image
                        src={img2}
                        width={32}
                        height={32}
                        alt="Profile"
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <p className="font-semibold">Mr. kurang turu</p>
                        <p className="font-thin">69420 followers</p>
                      </div>
                    </div>
                    <div>
                      <button className="px-6 py-2 font-semibold bg-violet-600 rounded hover:bg-violet-400">
                        Follow
                      </button>
                    </div>
                  </div>
                  <div className="pt-6">
                    <Comment />
                  </div>
                </div>

                {/* Right Section - Cardpost */}
                <div className="flex justify-center mt-4 lg:mt-0 lg:ml-8">
                  <div className="w-full max-w-sm md:max-w-md lg:w-96">
                    <h1 className="font-semibold text-xl"> May You Like :3</h1>
                    <Cardpost />
                    <Cardpost />
                    <Cardpost />
                    <Cardpost />
                    <Cardpost />
                    <Cardpost />
                    <Cardpost />
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
