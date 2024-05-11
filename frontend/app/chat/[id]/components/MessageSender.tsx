'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import React from 'react';
import { Icons } from '@/components/icons';

interface MessageSenderProps {
    user : UserDetails
};

function MessageSender({user:chatUser}:MessageSenderProps) {
    const handleClick = ()=>{
    }
    return (
    <Tooltip>
        <TooltipTrigger asChild>
            <Avatar className="w-8 h-8 cursor-pointer" onClick={handleClick} >
                <AvatarImage src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"} alt="" />
            </Avatar>
        </TooltipTrigger>
        <TooltipContent side="top" className="border-gray-700">
        
                <h3 className="text-sm md:text-md font-semibold capitalize">{chatUser?.name}</h3>
            
        </TooltipContent>
    </Tooltip>
 
    );
};

export default MessageSender;