import {z} from "zod"

export const verifySchema = z.object({

    code:z.string().length(6,{message:"code length must be 6"})
})