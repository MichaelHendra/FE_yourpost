import Link from "next/link"
export default function DashHeading(){
    return(
        <div className="px-10 lg:px-20 ">
            <div className="flex gap-2">
            <Link href="/settings/" className="px-6 py-2 bg-violet-700 hover:bg-violet-500">Dashboard</Link>
            <Link href="/settings/user/" className="px-6 py-2 bg-violet-700 hover:bg-violet-500">Profile</Link>
            <Link href="/settings/video/" className="px-6 py-2 bg-violet-700 hover:bg-violet-500">Video</Link>
            </div>
        </div>
    )
}