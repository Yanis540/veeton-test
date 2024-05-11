import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
import axios, { AxiosError } from "axios";
import { SERVER_URL } from "@/env";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
type DataResponse = {
    chat_id :string
}
interface useCreateChatMutation  {
    data ?: any
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,void, unknown>
}

export const useCreateChat = ()=>{
 
    const router = useRouter()

    const {data,mutate,isPending:isLoading,error}:useCreateChatMutation = useMutation({
        mutationKey:["api","chat","create"],
        mutationFn:async()=>{
            const response= await axios.post(SERVER_URL+"/api/chat/create"); 
            const data = await response.data ; 
            return data ; 
        },
        onSuccess : (data:DataResponse)=>{
            toast.success("Created chat ",{}); 
            router.push(`/chat/${data?.chat_id}`)
        },
        onError:(err:any)=>{
            console.log(err)
            if(err instanceof AxiosError && err?.response?.data?.error?.message)
                toast.error(`${err.response.data.error.message}`)
            else 
                toast.error(`Unknown error occured`)
        }
    })
 



    return {
        create:mutate,
        data,isLoading,error
    }
}