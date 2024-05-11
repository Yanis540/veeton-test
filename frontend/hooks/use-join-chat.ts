import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {toast} from "sonner"
import axios, { AxiosError } from "axios";
import { SERVER_URL } from "@/env";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod"
import { useForm } from "react-hook-form";
type DataResponse = {
    chat_id :string
}
const joinChatSchema =  z.object({
    id:z.string()
})
type JoinChatSchema = z.infer<typeof joinChatSchema>
interface useJoinChatMutation  {
    data ?: any
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,JoinChatSchema, unknown>
}

export const useJoinChat = ()=>{
    const { register, handleSubmit,reset,
        formState: { errors }, } = useForm<JoinChatSchema>({
        resolver: zodResolver(joinChatSchema),
    });
    const router = useRouter()

    const {data,mutate,isPending:isLoading,error}:useJoinChatMutation = useMutation({
        mutationKey:["api","chat","get"],
        mutationFn:async({id})=>{
            const response= await axios.get(`${SERVER_URL}/api/chat/get?id=${id}`); 
            const data = await response.data ; 
            return data ; 
        },
        onSuccess : (data:DataResponse)=>{
            router.push(`/chat/${data?.chat_id}`)
        },
        onError:(err:any)=>{
            if(err instanceof AxiosError && err?.response?.data?.error?.message)
                toast.error(`${err.response.data.error.message}`)
            else 
                toast.error(`Unknown error occured`)
        }
    })
 

    const onSubmit = handleSubmit((data)=>{
        // use mutate 
        mutate(data)
    })

    return {
        onSubmit, register,
        data,isLoading,error,errors
    }
}