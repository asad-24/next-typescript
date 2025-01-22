'use client'

import { useDebounceValue } from 'usehooks-ts'
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { signUpSchema } from '@/schemas/signUpSchema'
import axios,{AxiosError} from "axios"
import { ApiResponse } from '@/types/ApiREsponse'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'


const page = () => {

  const [username, setUsername]=useState("")
  const [usernameMessage, setUsernameMessage]=useState("")
  const [isCheckingUsername, setisCheckingUsername]=useState(false)
  const [isSubmitting , setIsSubmitting]=useState(false);
  const deboncingUsername=useDebounceValue(username,300)
  const { toast } = useToast()

  const router = useRouter();

  //zod umplementation 
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver:zodResolver(signUpSchema),
    defaultValues:{
      username:'',
      email:'',
      password:'',
    }
  })

  useEffect(()=>{
const checkUsernameUnique = async ()=>{
  if(deboncingUsername){
    setisCheckingUsername(true);
    setUsernameMessage('');
    try {
      const username =  await axios.get(`/api/check-username-unique?username=${deboncingUsername}`)
      setUsernameMessage('response.data.message');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      setUsernameMessage(axiosError.response?.data.message ?? "error chekecking usename");
    } finally{
     setisCheckingUsername(false)
    }
  }
}
checkUsernameUnique();
  },[deboncingUsername])

  const onSubmit = async (data: z.infer <typeof signUpSchema> )=>{
setIsSubmitting(true);

try {
  const response = await axios.post<ApiResponse>('/api/sign-up',data)

  toast({
    title :"success",
    description:response.data.message,

  })
  router.replace(`/verify/${username}`)
  setIsSubmitting(false)
} catch (error) {
  console.error("error in signup of user ", error)
  const axiosError = error as AxiosError<ApiResponse>
      let errorMessage= axiosError.response?.data.message 

      toast({
        title:"sinup fail",
        description:errorMessage,
      variant:"destructive",
      })
      setIsSubmitting(false)
}

  }
  return (
    <div className='flex justify-center items-end min-h-screen bg-gray-100'>
      <div className=' w-full max-w-md p-9 space-y-8 bg-white rounded-lg shadow-md'>
      <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to True Feedback
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
              <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default page
