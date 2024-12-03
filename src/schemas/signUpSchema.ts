import {z} from "zod"

export const usernameVlidation = z
.string()
.min(2,"username must be atleat 2 character")
.max(20, "username maximum length is 20")
.regex(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,"username must not use special chacter")



export const signUpSchema = z.object(

    {
        username: usernameVlidation,
        email:z.string().email({message:"invalid email"}),
        password:z.string().min(6, {message:"password atleast 6 character"}),
        

    }
)