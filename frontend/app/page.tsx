'use client'
import { useWatchAuth } from "@/hooks/use-watch-auth";
import Image from "next/image";

export default function Home() {
  useWatchAuth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <h2>HI</h2>
    </main>
  );
}
