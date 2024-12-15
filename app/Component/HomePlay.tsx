import Image from "next/image";
import img1 from "@/public/1.png";
import Allpost from "./Allpost";

export default function HomePlay() {
  return (
    <div>
      <div className="flex overflow-hidden">
        <div className="flex-1 p-8 pl-20 ">
          <div className="px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-8xl">Play Video Do You like</h1>
                <p className="text-xl text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum fugit incidunt minus similique consequatur sequi
                  expedita dolorem aliquid nesciunt aspernatur. Neque atque ipsa
                  provident delectus, distinctio ipsum rem voluptas repudiandae?
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image src={img1} width={1024} height={720} alt="sangatxd" />
              </div>
            </div>
          </div>
          <div className="pt-20">
            <Allpost />
          </div>
        </div>
      </div>
    </div>
  );
}
