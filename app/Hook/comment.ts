import apiClient from "../Api/apiClient";


export async function ListComment(id:string) {
    const response = await apiClient.get(`/comment/${id}`);
    return response.data;
}

export async function postComment(id:string, formData:FormData, auth:string) {
    const response = await apiClient.post(`/comment/store/${id}`, formData,{
        headers:{
            'Authorization' : `Bearer ${auth}`
        }
    });
    return response.data;
}

export async function updateComment(id:string, formData:FormData, auth:string) {
    const response = await apiClient.put(`/comment/update/${id}`, formData,{
        headers:{
            'Authorization' : `Bearer ${auth}`
        }
    })
    return response.data;
}

export async function deleteComment(id:string, auth:string) {
    const response = await apiClient.delete(`/comment/delete/${id}`,{
        headers:{
            'Authorization' : `Bearer ${auth}`
        }
    })
    return response.data;
}