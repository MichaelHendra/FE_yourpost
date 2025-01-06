'use client'
import { userData, userUpdate } from "@/app/Hook/user";
import { FormEvent, useEffect, useState } from "react"

export default function EditProfile () {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState<string | null>(null);
    const [displayname, setDisplayname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [banner, setBanner] = useState<File |null>(null);

    useEffect(() =>{
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('userid');
        if(!token){
            const login = '/login'
            window.location.href = login
        }else{
            setUserId(user);
            setIsLogin(token);
        }
    },[]);

    useEffect(() => {
        if(!userId) return;
            userData(userId)
            .then((response)=>{
                setDisplayname(response.data.displayname)
                setEmail(response.data.email)
            }).catch((e)=>{
                console.error("Error fetching user data:", e);
            })
    }, [userId]);

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!userId || !isLogin) {
            window.location.href = "/login";
            return;
        }
        const formData = new FormData();
        formData.append('displayname',displayname);
        formData.append('email', email);

        if(photo){
            formData.append('photo', photo);
        }
        if(banner){
            formData.append('banner', banner);
        }
        try{
            const response = await userUpdate(userId,formData,isLogin);
            if (response) {
                window.location.href = `/profile/main/${userId}`;
              }
        }catch(e){
            console.error('Error Update Data ! Reason = ',e)
        }
    }

    return(
        <div className="min-h-screen">
      <div className="ml-10 lg:ml-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
          <form onSubmit={handleUpdate} className="flex flex-col w-full max-w-md">
            <input
              type="text"
              placeholder="Display Name"
              value={displayname}
              onChange={(e) => setDisplayname(e.target.value)}
              className="mb-4 p-2 border border-gray-300 bg-black rounded"
              required
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-2 border border-gray-300 bg-black rounded"
              required
            />  
            <label className="mb-2">Photo</label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              accept="image/*"
              className="mb-4"
            />
            
            <label className="mb-2">Banner</label>
            <input
              type="file"
              onChange={(e) => setBanner(e.target.files?.[0] || null)}
              accept="video/*"
              className="mb-4"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
    )
}