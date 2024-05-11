import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';
import { useCreateChat } from '@/hooks';
interface CreateChatProps {

};

function CreateChat({}:CreateChatProps) {
    const {create} = useCreateChat();
    const handleClick = ()=>{
        create()
    }
    return (
    <Button onClick={handleClick}>Create Chat</Button>
      
    );
};

export default CreateChat;