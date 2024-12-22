const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function listVideo() {
    const response = await fetch(`${apiUrl}/videos/`,{
        method: 'GET',
        headers:{
            'Content-Type' : 'application/json'
        },
    })
    const data = await response.json();
    return data.data;
}
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
export async function playVideo(id_vid:string) {
    const response = await fetch(`${apiUrl}/videos/${id_vid}`,{
        method: 'GET',
        headers:{
            'Content-Type' : 'application/json'
        },
    });
    const data = await response.json();
    return data.data;
}