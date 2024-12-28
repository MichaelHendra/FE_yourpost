import DashHeading from "@/app/Component/DashHeading";
import Image from "next/image";
import img1 from "@/public/1.png";
import Link from "next/link";

export default function videoSetting() {
  return (
    <div className="min-h-screen">
      <div className="pb-4">
        <DashHeading />
      </div>
      <div className="ml-10 lg:ml-20 ">
        <div className="flex justify-between">
          <h1 className="text-4xl">List Videos</h1>
          <Link
            href="/settings/video/store"
            className="px-6 py-2 bg-violet-700 hover:bg-violet-500 rounded mr-4"
          >
            Add Videos
          </Link>
        </div>
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b border-slate-600">Thumbnail</th>
                <th className="border-b border-slate-600">Title</th>
                <th className="border-b border-slate-600">Description</th>
                <th className="border-b border-slate-600">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">
                  <div className="flex justify-center items-center gap-4">
                    <div>
                      <Image
                        src={img1}
                        width={128}
                        height={128}
                        alt="thumbnail"
                        className="rounded-2xl mt-4"
                      />
                    </div>
                  </div>
                </td>
                <td className="text-center">SangatXD</td>
                <td className="text-center">asd</td>
                <td className="text-center">
                  <div className="flex justify-center gap-4">
                    <Link
                      href="/settings/video/edit"
                      className="px-6 py-2 bg-blue-700 hover:bg-blue-500 rounded"
                    >
                      Edit
                    </Link>
                    <Link
                      href="/settings/video/edit"
                      className="px-6 py-2 bg-red-700 hover:bg-red-500 rounded"
                    >
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
