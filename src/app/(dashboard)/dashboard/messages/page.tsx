
import React from 'react'
import LandingBackground from "@/components/landing/LandingBackground";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import SidebarChatList from '@/components/SidebarChatList';

const MessagesPage = async () => {

  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const friends = await getFriendsByUserId(session.user.id);

  return (
    <div className='relative min-h-screen bg-[#F3F8FF]'>
      <div className="absolute inset-0 z-10">
        <LandingBackground />
      </div>
      <div className="inline-block bg-gradient-to-r from-[#FF0049] via-[#1D0A42] to-[#0072FA] bg-clip-text text-transparent pt-20 sm:pt-15 md:pt-15 lg:pt-10 pl-4">
        <h1 className="text-3xl font-extrabold">
          Zprávy
        </h1>
      </div>
      <SidebarChatList friends={friends} sessionId={session.user.id} />
    </div>
  )
}

export default MessagesPage
