import apiClient from "../Api/apiClient";

export async function followUser(id:string,user_follow:string) {
    const response = await apiClient.post(`/follow/following/get/${id}`,{user_follow})
    return response.data;
}

export async function follow(formData:FormData, auth:string) {
    const response = await apiClient.post('/follow/following', formData,{
        headers:{
            'Authorization' : `Bearer ${auth}`
        }
    })
    return response.data;
}

export async function unfollow(formData:FormData, auth:string) {
    const response = await apiClient.post(`/follow/unfollow`, formData, {
        headers:{
            'Authorization' : `Bearer ${auth}`
        }
    })
    return response.data;
}