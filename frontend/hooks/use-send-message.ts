import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import {z} from "zod"
import { SERVER_URL } from "@/env";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuth } from "./use-auth";
import { useChat } from "./use-chat";
type DataResponse = {
    message :Message
}

const sendMessageSchema =  z.object({
    content:z.string()
})
type SendMessageSchema = z.infer<typeof sendMessageSchema>
interface useJoinChatMutation  {
    data ?: any
    isPending : boolean 
    error : unknown 
    mutate : UseMutateFunction<any, unknown,SendMessageSchema, unknown>
}
export const useSendMessage = (chat_id : string)=>{
    const { register, handleSubmit,reset,
        formState: { errors }, } = useForm<SendMessageSchema>({
        resolver: zodResolver(sendMessageSchema),
    });
    const {user} = useAuth();
    const {add_message} = useChat()
    const {data,mutate,isPending:isLoading,error}:useJoinChatMutation = useMutation({
        mutationKey:["api","chat","chat"],
        mutationFn:async({content})=>{
            const response= await axios.post(`${SERVER_URL}/api/chat/send/message`,{chat_id,content,user_id:user?.id!}); 
            const data = await response.data ; 
            return data ; 
        },
        onSuccess : (data:DataResponse)=>{
            add_message(data?.message!)
            reset();
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
        register,onSubmit,
        errors,
    }
}