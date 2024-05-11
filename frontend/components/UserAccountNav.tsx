'use client'
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import Link from 'next/link';
import {useAuth} from '@/hooks';

import { Avatar, AvatarImage } from './ui/avatar';

interface UserAccountNavProps {
};

function UserAccountNav({}:UserAccountNavProps) {
    const {user,} = useAuth();
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className='overflow-visible'>
            <Avatar className="w-8 h-8 rounded-full">
                <AvatarImage src={"https://github.com/shadcn.png"} alt="" />
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background text-foreground w-60" align="end">
            <div className="flex flex-row items-center justify-between gap-2 p-2 ">
                <div className="flex flex-col space-y-0.5 leading-none cursor-pointer">
                    <p className="font-medium text-sm text-foreground ">{user?.name}</p>
                </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href='/profile' className="cursor-pointer">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={()=>{}}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    );
};

export default UserAccountNav;