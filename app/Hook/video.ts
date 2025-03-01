// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import apiClient from "../Api/apiClient";
import { videoCredential } from "../Type/video";

// export async function listVideo() {
//     const response = await fetch(`${apiUrl}/videos/`,{
//         method: 'GET',
//         headers:{
//             'Content-Type' : 'application/json'
//         },
//     })
//     const data = await response.json();
//     return data.data;
// }
// export async function userVideoList(id:string) {
//     const response = await fetch(`${apiUrl}/videos/video-list/user/${id}`,{
//         method: 'GET',
//         headers:{
//             'Content-Type' : 'application/json'
//         },
//     });
//     const data = await response.json();
//     return data.data;
// }
// export async function playVideo(id_vid:string) {
//     const response = await fetch(`${apiUrl}/videos/${id_vid}`,{
//         method: 'GET',
//         headers:{
//             'Content-Type' : 'application/json'
//         },
//     });
//     const data = await response.json();
//     return data.data;
// }

export async function listVideo(){
    const response = await apiClient.get('/videos/');
    return response.data;
}

export async function playVideo(id_vid:string) {
    const response = await apiClient.get(`/videos/${id_vid}`);
    return response.data;
}
export async function userVideoList(id:string,) {
    const response = await apiClient.get(`/videos/video-list/user/${id}`);
    return response.data;
}
export async function videoStore(credentials: videoCredential, auth:string) {
    const response = await apiClient.post('/videos/store', credentials,{
        headers:{
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${auth}`
        }
    });
    return response.data;
}
export async function editVideo(id: string, formData: FormData, auth:string) {
    const response = await apiClient.put(`/videos/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization' : `Bearer ${auth}`
      },
    });
    return response.data;
  }

  export async function deleteVideo(id: string, auth:string) {
    const response = await apiClient.delete(`/videos/delete/${id}`,{
      headers:{
        'Authorization' : `Bearer ${auth}`
      }
    });
    return response.data;
    
  }