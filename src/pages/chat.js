import React, { useContext, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { auth, db } from '@/config/firebase';

import { ChatContainer } from "@/ui/components/chats/ChatContainer";
import { DiscussionContainer } from "@/ui/components/discussion/discussionContainer";
import { ProfileBar } from "@/ui/components/discussion/profileBar";
import { SendMessageForm } from "@/ui/components/discussion/senMessageForm";
import { SearchBar } from "@/ui/components/search/searchBar";
import { Seo } from "@/ui/components/seo/seo";
import { Sidebar } from "@/ui/components/sidebar/sidebar";
import { AuthContext } from '@/context/authContext';
import { ChatContext } from '@/context/chatContext';
import { doc, getDoc, getDocs } from 'firebase/firestore';

const Wrapper = ({ children }) => {

    return (
        <div className="flex flex-col h-full gap-2">
            {children}
        </div>
    );
};

const Chat = () => {
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const router = useRouter();


   
  


    // Utiliser useEffect pour vérifier si currentUser est présent au chargement du composant
    useEffect(() => {
        
        if (!currentUser) {
            // Rediriger vers la page d'authentification
            router.push('/auth/login');
        }
        console.log("currentUser.uid ==>", currentUser);

        const fetchChatData = async () => {
            if (currentUser?.uid) {
                try {
        
                    console.log("currentUser.uid ==>", currentUser);
                    
                    const user = await getDoc(doc(db, "users", currentUser.uid))
        
                    const lastuserchatwithme_id = user.data().lastuserchatwithme
        
                    if (lastuserchatwithme_id) {
                      console.log("state.chatId ==>", lastuserchatwithme_id);
                      try {
                        const user = await getDoc(doc(db, "users", lastuserchatwithme_id));
                        console.log("user data authcontxt ==>", user.data());
                        console.log("user authcontxt ==>", user);
            
                        dispatch({ type: "CHANGE_USER", payload: user.data() })
                        // 
                      } catch (error) {
                        console.error("Erreur lors de la récupération du chat :", error);
                      }
                    }
                } catch (error) {
                    console.log("Error getting document:", error);
                }
            }
          };


        fetchChatData();

    }, [currentUser]);



    if (!currentUser) {
        // Si l'utilisateur n'est pas connecté, la redirection se fait dans useEffect
        return null;
    }

    return (
        <div className="px-2 container lg:px-24 mx-auto p-5 h-screen">
            <Wrapper>
                <div className="h-full flex gap-2">
                    {/* aside */}
                    <div className="w-1/12 hidden">
                        <Sidebar />
                    </div>
                    {/* end aside */}

                    {/* chats */}
                    <div className="md:w-3/12 w-full flex flex-col gap-3 pb-10">
                            <SearchBar />
                            <ChatContainer />
                    </div>
                    {/* end chats */}

                    {/* chat */}
                    <div className="w-8/12 h-full hidden ">
                        <Wrapper>
                            <ProfileBar />
                            <DiscussionContainer />
                            <SendMessageForm />
                        </Wrapper>
                    </div>
                    {/* chat */}
                </div>
            </Wrapper>
        </div>
    );
};

export default Chat;
