'use client'
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useJoinChat } from '@/hooks';
import { Icons } from './icons';
interface SearchChatProps {

};

function SearchChat({ }: SearchChatProps) {
    const { register, onSubmit, isLoading, errors } = useJoinChat();
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={"ghost"} className="border ">
                    Join
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join the chat</DialogTitle>
                    <DialogDescription>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, animi?
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input
                            id="id"
                            disabled={isLoading}
                            placeholder='Chat ID'
                            {...register('id')}
                        />
                        {
                            errors.id && (
                                <h1 className='font-medium text-red-500 text-sm my-2'>{errors?.id?.message}</h1>
                            )
                        }
                    </div>
                    <Button disabled={isLoading} type="submit" size="sm" className="px-3">
                        {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : ("Join")
                        }
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SearchChat;