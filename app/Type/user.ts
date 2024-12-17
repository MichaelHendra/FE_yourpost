export type Credentials = {
    email: string,
    password: string
}
export type LoginResponse ={
    token?: string;
    error?: string;
}

export type regisCredentials = {
    displayname: string;
    email : string;
    password: string;
}

export type regisResponse = {
    displayname?: string;
    email?: string;
    errors: {
        [key:string] : string[];
    }
}