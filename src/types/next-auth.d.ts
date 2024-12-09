import "next-auth"

declare module 'next-auth' {
    interface user{
        _id?: string;
        isVerified? :boolean;
        isAcceptingMesage?:boolean;
        userName:string
    } 
}