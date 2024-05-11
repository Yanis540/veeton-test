import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ChatState {
  chat?:  Chat
  messages : Message[]
  set_chat: (chat?: Chat) => void
  add_message: (message?: Message) => void
  set_messages: (messages?: Message[]) => void
}

const useChat =  create<ChatState>(
    (set:any,get:any)=>({
        chat : undefined, 
        messages :[],
        set_chat : (chat?:Chat)=>set((prev:ChatState)=>{
            return {...prev,chat:chat}
        }),
        add_message : (message?:Message)=>set((prev:ChatState)=>{
            if(!prev?.chat)
                return  prev
            return {...prev,messages:[...prev.messages,message]}
        }),
        
        set_messages : (messages?:Message[])=>set((prev:ChatState)=>{
            if(!prev?.chat)
                return  prev
            return {...prev,messages:messages}
        }),
        
    }), 
        
)



export {
    useChat
}