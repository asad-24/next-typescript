import {z} from "zod"

export const messageSchema = z.object({

    content:z.string()
    .min(10,{message:"message min 10 charachters"})
    .max(300,{message:"message max 300 charachters"}),
    
})