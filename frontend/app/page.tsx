'use client'
import CreateChat from "@/components/CreateChat";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import SearchChat from "@/components/SearchChat";
import UserAccountNav from "@/components/UserAccountNav";
import { useAuth } from "@/hooks";
import { useWatchAuth } from "@/hooks/use-watch-auth";
import Image from "next/image";

export default function Home() {
  useWatchAuth();
  const {user} = useAuth();
  return (
    <main className="flex min-h-screen flex-col items-center py-10 bg-background ">
      <Navbar /> 
      <MaxWidthWrapper className="flex-1 flex flex-row justify-center gap-x-5 py-6  ">
        {/* Left side to create try and search a new chat */}
        <div>
          <CreateChat /> 
        </div>
        {/* Right side to try and join a chat  */}
        <div>
          <SearchChat /> 
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
