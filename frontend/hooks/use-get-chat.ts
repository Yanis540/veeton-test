import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
import axios, { AxiosError } from "axios";
import { SERVER_URL } from "@/env";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useChat } from "./use-chat";
type DataResponse = {
    chat_id :string
    messages :Message[]
}
const joinChatSchema =  z.object({
    id:z.string()
})
type JoinChatSchema = z.infer<typeof joinChatSchema>
interface useJoinChatMutation  {
    data ?: DataResponse
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,JoinChatSchema, unknown>
}

export const useGetChat = (id:string)=>{
  
    const router = useRouter()
    const {set_chat,set_messages} = useChat()
    const [isClientSide, setIsClientSide] = useState(false);

    const {data,mutate,isPending:isLoading,error}:useJoinChatMutation = useMutation({
        mutationKey:["api","chat","get"],
        mutationFn:async({id})=>{
            const response= await axios.get(`${SERVER_URL}/api/chat/get?id=${id}`); 
            const data = await response.data ; 
            return data ; 
        },
        onSuccess : (data:DataResponse)=>{
            set_chat({id:data?.chat_id} as Chat)
            console.log(data?.messages)
            set_messages(data?.messages!)
        },
        onError:(err:any)=>{
            if(err instanceof AxiosError && err?.response?.data?.error?.message)
                toast.error(`${err.response.data.error.message}`)
            else 
                toast.error(`Unknown error occured`)
        }
    })
    useEffect(()=>{
        mutate({id})
    },[id])
    useEffect(()=>{
        setIsClientSide(true)
    },[])
 


    return {
        data,isLoading,error,isClientSide
    }
}