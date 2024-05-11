import React from 'react';
import { IoIosInformationCircle } from "react-icons/io";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
interface ChatHeaderProps {
    chat_id ? : string
};

function ChatHeader({chat_id}:ChatHeaderProps) {
    return (
        <div className="flex-[0.1] ">
        <div className="flex flex-row items-center justify-between px-5 py-4 border-b-[1px] border-gray-700">
            {/* Left side */}
            <div className="flex-1 flex flex-row items-center gap-x-2 ">
                {/* TODO : modify the picture */}
                <Avatar className="w-8 h-8">
                    <AvatarImage src={"https://github.com/shadcn.png"} alt="" />
                </Avatar>
                <div className="">
                    <h1 className="text-lg font-semibold text-foreground transition-all duration-75">{chat_id}</h1>

                </div>
            </div>
            {/* Right Side */}
            <div className="flex flex-row items-center gap-x-2">

                <IoIosInformationCircle className="h-6 w-6 text-muted-foreground hover:text-primary duration-75 cursor-pointer" />
            </div>
        </div>
    </div>
    );
};

export default ChatHeader;