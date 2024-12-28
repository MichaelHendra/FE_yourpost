import apiClient from "../Api/apiClient";
import { Credentials,LoginResponse,regisCredentials,regisResponse, userDataResponse } from "../Type/user";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// export async function registerUser(credentials: regisCredentials): Promise<regisResponse> {
//     const response = await fetch(`${apiUrl}/auth/register`,{
//         method: 'POST',
//         headers: {
//             'Content-Type' : 'application/json'
//         },

//         body: JSON.stringify(credentials)
//     });
//     return response.json();
// }


// export async function loginUser(credentials: Credentials): Promise<LoginResponse> {
//     const response = await fetch(`${apiUrl}/auth/login`,{
//         method: 'POST',
//         headers:{
//             'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     });
//     return response.json();
// }

// export async function userData(id:string): Promise<userDataResponse> {
//     const response = await fetch(`${apiUrl}/auth/user/${id}`,{
//         method: 'GET',
//         headers:{
//             'Content-Type' : 'application/json'
//         },
//     });
//     const data = await response.json();
//     return data.data;
// }
export async function registerUser(credentials: regisCredentials): Promise<regisResponse> {
    const response = await apiClient.post<regisResponse>("/auth/register", credentials);
    return response.data;
}

export async function loginUser(credentials: Credentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/login",credentials);
    return response.data;
}
export async function userData(id:string): Promise<userDataResponse> {
    const response = await apiClient.get<userDataResponse>(`/auth/user/${id}`);
    return response.data;
    
}