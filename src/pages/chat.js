import React from 'react'
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { auth } from '@/config/firebase';

import { ChatContainer } from "@/ui/components/chats/ChatContainer";
import { DiscussionContainer } from "@/ui/components/discussion/discussionContainer";
import { ProfileBar } from "@/ui/components/discussion/profileBar";
import { SendMessageForm } from "@/ui/components/discussion/senMessageForm";
import { SearchBar } from "@/ui/components/search/searchBar";
import { Seo } from "@/ui/components/seo/seo";
import { Sidebar } from "@/ui/components/sidebar/sidebar";

const Chat = () => {
    const router = useRouter()
const LogOut = async() =>{
    await signOut(auth).then(() => {
        toast('sucess')
        router.push('auth/login')
      }).catch((error) => {
        // An error happened.
      });
}
  return (
    <div className="px-2 container   lg:px-24 mx-auto p-5 h-screen">


<div className="h-full flex gap-2">
          {/* asside */}
          <div className="w-1/12">
            <Sidebar />
          </div>
          {/* end asside */}

          {/* chats */}
          <div className=" w-3/12 h-full">
            <div className="flex flex-col h-full gap-2">
             <SearchBar />
              <ChatContainer />
            </div>
          </div>
          {/* end  chats */}

          {/* chat */}
          <div className="w-8/12 h-full">
            <div className="flex flex-col h-full gap-2">
              <ProfileBar />

              <DiscussionContainer />

              <SendMessageForm />
            </div>
          </div>
          {/* chat */}
        </div>
    </div>
  )
}

export default Chat