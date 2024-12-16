import "next-auth"
import session from './../../node_modules/next-auth/core/routes/session.d';
import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface User{
        _id?: string;
        isVerified? :boolean;
        isAcceptingMesage?:boolean;
        username:string
    } 
    interface Session{
        user:{
            _id?: string;
        isVerified? :boolean;
        isAcceptingMesage?:boolean;
        username:string

        } & DefaultSession['user']
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        isVerified? :boolean;
        isAcceptingMesage?:boolean;
        username:string
    }
}