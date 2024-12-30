export type Credentials = {
    email: string,
    password: string
}
export type LoginResponse ={
    userid: string;
    token?: string;
    error?: string;
}

export type regisCredentials = {
    displayname: string;
    email: string;
    password: string;
}

export type regisResponse = {
    displayname?: string;
    email?: string;
    error?: string;
}

export type userDataResponse ={
    displayname?: string;
    followers?: string;
    photo?:string;
    banner?:string;
}

export type editCredentials = {
    displayname: string;
    email: string;
    password: string;
    photo:string;

}
export type editResponse ={
    displayname?: string;
    error?: string;
}

export type profileUser = {
    user_id: string,
    banner : string,
    photo : string,
    displayname: string,
    followers: bigint,
    email: string
}