import apiClient from "../Api/apiClient";


export async function ListComment(id:string) {
    const response = await apiClient.get(`/comment/${id}`);
    return response.data;
}

export async function postComment(id:string, formData:FormData) {
    const response = await apiClient.post(`/comment/store/${id}`, formData);
    return response.data;
}

export async function updateComment(id:string, formData:FormData) {
    const response = await apiClient.put(`/comment/update/${id}`, formData)
    return response.data;
}

export async function deleteComment(id:string) {
    const response = await apiClient.delete(`/comment/delete/${id}`)
    return response.data;
}