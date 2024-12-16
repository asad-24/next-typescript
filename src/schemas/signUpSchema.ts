import {z} from "zod"

export const usernameValidation = z
.string()
.min(2,"username must be atleat 2 character")
.max(20, "username maximum length is 20")
.regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');



export const signUpSchema = z.object(

    {
        username: usernameValidation,
        email:z.string().email({message:"invalid email"}),
        password:z.string().min(6, {message:"password atleast 6 character"}),
        

    }
)