



import { SERVER_URL } from "@/env"
import { useAuth } from "@/hooks"
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useEffect, useMemo } from "react"
import { toast } from "sonner"

type DataResponse = {
    user ? :User
}
interface useWatchAuthMutation  {
    data ?: DataResponse
    isPending : boolean 
    error : any

}

export const useWatchAuth = ()=>{
    const {user,set_user} = useAuth()
    const {data,isPending:isLoading,error}:useWatchAuthMutation = useQuery({
        queryKey:["api","user","get"],
        queryFn:async()=>{
            const user_id = 1
            const response= await axios.get(`${SERVER_URL}/api/user/get?id=${user_id}`); 
            const data = await response.data ; 
            return data ; 
        },
        refetchInterval:5*60*1000

    })
   
    useEffect(()=>{
        if(!error || !user?.id)
            return 
    
        toast.error(`${error?.message}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[error,user?.id])
    // ! Might cause an error ???? 
    useEffect(()=>{
        if(data?.user){
            set_user(data?.user)
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data?.user])



    return {
        data,isLoading,
        error : (error as AxiosError)?.response?.data?(error as AxiosError)?.response?.data as any : error
    }
}

