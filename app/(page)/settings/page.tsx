import DashHeading from "@/app/Component/DashHeading";

export default function Settings() {
  return (
      <div className="min-h-screen">
        <div className="pb-4">
          <DashHeading />
        </div>
      <div className="mx-10 lg:mx-20">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-violet-500 rounded">
            <h1 className="text-2xl">Total Followers</h1>
            <div className="border-b"></div>
            <div className="p-10 flex justify-center items-center">
              <h1 className="font-bold text-4xl">69</h1>
            </div>
          </div>
          <div className="p-4 bg-violet-500 rounded">
            <h1 className="text-2xl">Total Video</h1>
            <div className="border-b"></div>
            <div className="p-10 flex justify-center items-center">
              <h1 className="font-bold text-4xl">69</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
