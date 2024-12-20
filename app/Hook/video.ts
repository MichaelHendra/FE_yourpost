const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function userVideoList(id:string) {
    const response = await fetch(`${apiUrl}/videos/video-list/user/${id}`,{
        method: 'GET',
        headers:{
            'Content-Type' : 'application/json'
        },
    });
    const data = await response.json();
    return data.data;
}