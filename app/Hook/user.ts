import { Credentials,LoginResponse,regisCredentials,regisResponse } from "../Type/user";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(credentials: regisCredentials): Promise<regisResponse> {
    const response = await fetch(`${apiUrl}/register`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },

        body: JSON.stringify(credentials)
    });
    return response.json();
}

export async function loginUser(credentials: Credentials): Promise<LoginResponse> {
    const response = await fetch(`${apiUrl}/login`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    return response.json();
}