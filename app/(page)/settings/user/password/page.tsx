'use client'

import { userPassUpdate } from "@/app/Hook/user";
import { FormEvent, useEffect, useState } from "react"

export default function UpdatePassword(){
    const [user_id, setUserId] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState<string | null>(null);
    const [password, setPassword] = useState<string>("");
    const [confPassword, setConfPassword] = useState<string>("");
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userid = localStorage.getItem('userid');
        if(!token){
            window.location.href = "/login";
        }
        setUserId(userid);
        setIsLogin(token)
    },[])

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();

        if(!user_id || !isLogin){
            window.location.href = '/login'
            return;
        }
        if(password !== confPassword){
            window.location.href = "/login";
        }

        const formData = new FormData();
        formData.append('password',password);

        try{
            const response = await userPassUpdate(user_id, formData, isLogin);
            if(response){
                window.location.href = `/profile/main/${user_id}`;
            }
        }catch(e){
            console.error("Error Update Data ! Reason = ", e)
        }
    }
    return(
        <div className="min-h-screen">
      <div className="ml-10 lg:ml-20">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
          <form
            onSubmit={handleUpdate}
            className="flex flex-col w-full max-w-md"
          >
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-2 border border-gray-300 bg-black rounded"
              required
            />
            <input
              type="password"
              placeholder="Confim Password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              className="mb-4 p-2 border border-gray-300 bg-black rounded"
              required
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