'use client'

import { useDebounceValue } from 'usehooks-ts'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const page = () => {

  const [username, setUsername]=useState("")
  const [usernameMessage, setUsernameMessage]=useState("")
  const [isCheckingUsername, setisCheckingUsername]=useState(false)
  const [isSubmitting , setIsSubmitting]=useState(false);
  const deboncingUsername=useDebounceValue(username,300)

  return (
    <div>
      
    </div>
  )
}

export default page
