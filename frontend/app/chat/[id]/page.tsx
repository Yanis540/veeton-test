'use client'
import { Icons } from '@/components/icons';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Navbar from '@/components/Navbar';
import { useChat, useGetChat, useWatchAuth } from '@/hooks';
import { useParams } from 'next/navigation';
import React from 'react';
import Message from './components/Message';
import { IoIosInformationCircle } from "react-icons/io";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import ChatHeader from './components/ChatHeader';
import ChatFooter from './components/ChatFooter';


interface ChatPageProps {

};

function ChatPage({ }: ChatPageProps) {
    const params = useParams();
    useWatchAuth();
    const { data,isLoading, isClientSide, error } = useGetChat(params.id! as string);
    const {chat,messages} = useChat();
    if (error) return (
        <main className="flex h-screen flex-col items-center bg-background ">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center">
                An unknown error occured
            </div>
        </main>
    )
    if (isLoading || !isClientSide) return (
        <main className="flex h-screen flex-col items-center bg-background  ">
            <Navbar />
            <Icons.spinner className="h-10 w-10 animate-spin text-primary" />
        </main>
    )
    return (
        <main className="flex h-screen flex-col  bg-background ">
            <Navbar />
            <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] w-full bg-background overflow-y-hidden">
                <div className="flex-1 flex flex-col h-full  relative  w-full border border-gray-600">
                    {/* Header */}
                    <ChatHeader  />
                    {/* Body */}
                    <div className="flex-1 flex flex-col  items-start p-4  text-foreground relative overflow-y-auto ">
                        <div className='flex flex-col w-full space-y-4 '>
                            {
                                messages?.map((message, i) => (
                                    <Message key={message.id + " " + i} message={message} />
                                ))
                            }
                        </div>
                    </div>
                    {/* Footer */}
                    <ChatFooter /> 
                </div>
            </div>
        </main>
    );
};

export default ChatPage;