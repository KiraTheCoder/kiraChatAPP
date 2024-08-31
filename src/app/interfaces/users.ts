export interface User{
    _id:string;
    name:string
}

export interface Messages{
    userId:string;
    message:any;
    createdAt:any;
}
