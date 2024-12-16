import orang from "@/public/face.jpg";
import Image from "next/image";
import Form from "next/form";
export default function Comment() {
  return (
    <div>
      <div className="flex justify-between">
        <div>69 Comments</div>
        <div>Newest</div>
      </div>
      <Form action="/">
        <div className="pt-2 flex">
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border-b-4 border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500"
            placeholder="Comment"
            required
          />
          <button className="px-4 py-2 rounded-r-lg border-b-4 border-violet-700 bg-violet-500 text-white hover:bg-violet-600 dark:border-gray-600 dark:bg-violet-500 dark:hover:bg-violet-600 dark:hover:border-violet-500 focus:outline-none">
            Sent
          </button>
        </div>
      </Form>
      <div className="pt-4">
        <div className="flex">
          <div className="rounded-lg">
            <Image src={orang} width={48} height={48} alt="user" />
          </div>
          <div className="ml-4">
            <div className="flex gap-4">
              <h1>xd</h1>
              <p className="font-thin"> 69 second ago</p>
            </div>
            <div>
              <p>sangatxd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
