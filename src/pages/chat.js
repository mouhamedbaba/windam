import React, { useContext, useEffect } from 'react';
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
import { AuthContext } from '@/context/authContext';

const Wrapper = ({ children }) => {
    return (
        <div className="flex flex-col h-full gap-2">
            {children}
        </div>
    );
};

const Chat = () => {
    const { currentUser } = useContext(AuthContext);
    const router = useRouter();

    // Utiliser useEffect pour vérifier si currentUser est présent au chargement du composant
    useEffect(() => {
        if (!currentUser) {
            // Rediriger vers la page d'authentification
            router.push('/auth/login');
        }
    }, [currentUser]);

    const LogOut = async () => {
        await signOut(auth).then(() => {
            toast.success('Good bay, see you soon ! ');
            router.push('/auth/login');
        }).catch((error) => {
            // Une erreur s'est produite.
        });
    };

    if (!currentUser) {
        // Si l'utilisateur n'est pas connecté, la redirection se fait dans useEffect
        return null;
    }

    return (
        <div className="px-2 container lg:px-24 mx-auto p-5 h-screen">
            <Wrapper>
                <div className="h-full flex gap-2">
                    {/* aside */}
                    <div className="w-1/12">
                        <Sidebar />
                    </div>
                    {/* end aside */}

                    {/* chats */}
                    <div className="w-3/12 h-full">
                        <Wrapper>
                            <SearchBar />
                            <ChatContainer />
                        </Wrapper>
                    </div>
                    {/* end chats */}

                    {/* chat */}
                    <div className="w-8/12 h-full">
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
