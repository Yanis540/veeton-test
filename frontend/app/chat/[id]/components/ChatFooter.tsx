
import React from 'react';

import { Button } from "@/components/ui/button"




import { FaArrowRight } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { useChat } from '@/hooks';
import { useSendMessage } from '@/hooks/use-send-message';

interface ChatFooterProps {

};

function ChatFooter({ }: ChatFooterProps) {
    const {chat} = useChat();
    const {onSubmit,register} = useSendMessage(chat?.id!); 
  
    return (
        <div className="relative flex flex-col rounded-xl p-2  ">
            <div className="flex-1 " />
                <form onSubmit={onSubmit}className="flex flex-row items-center justify-between relative overflow-hidden bg-background  rounded-lg border-[1px] border-gray-600 ">
                    <div className="flex-1 ">
                        {/* <Label htmlFor="message" className="sr-only">
                            Message
                        </Label> */}
                        <Input
                            id="message"
                            placeholder="Type your message here..."
                            {...register('content')}
                            className="h-full bg-background text-foreground resize-none border-none border-0  shadow-none focus-visible:ring-0"
                        />
                    </div>
                    <div>
                        <Button type="submit" size="sm" className="ml-auto gap-1.5 bg-transparent border-0 border-none ">
                            <FaArrowRight className="text-primary hover:bg-transparent "  />
                        </Button>
                    </div>
                </form>
        </div>
    );
};

export default ChatFooter;