  import React, { useContext, useEffect, useState } from "react";

  import { useRouter } from "next/router";
  import { db } from "@/config/firebase";

  import { ChatContainer } from "@/ui/components/chats/ChatContainer";
  import { DiscussionContainer } from "@/ui/components/discussion/discussionContainer";
  import { ProfileBar } from "@/ui/components/discussion/profileBar";
  import { SendMessageForm } from "@/ui/components/discussion/sendMessageForm";
  import { SearchBar } from "@/ui/components/search/searchBar";
  import { Seo } from "@/ui/components/seo/seo";
  import { Sidebar } from "@/ui/components/sidebar/sidebar";
  import { AuthContext } from "@/context/authContext";
  import { ChatContext } from "@/context/chatContext";
  import { doc, getDoc } from "firebase/firestore";
  import { AllUsers } from "@/ui/components/chats/AllUsers";

  const Wrapper = ({ children }) => {
    return <div className="flex flex-col h-full gap-2">{children}</div>;
  };

  const Chat = () => {
    const { currentUser } = useContext(AuthContext);
    const {  data } = useContext(ChatContext);
    const router = useRouter();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isUsersCollapsed, setIsUsersCollapsed] = useState(false);

    const handleCollapseSidebar = () => {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    };

// Dans le composant Chat
const handleCollapseUsers = () => {
  setIsUsersCollapsed(!isUsersCollapsed);
  console.log("isUsersCollapsed ==>", isUsersCollapsed);
};


    useEffect(() => {
      if (!currentUser) {
        router.push("/auth/login");
      }
      console.log("currentUser.uid ==>", currentUser);

      const fetchChatData = async () => {
        if (currentUser?.uid) {
          try {
            console.log("currentUser.uid ==>", currentUser);

            const user = await getDoc(doc(db, "users", currentUser.uid));

            const lastuserchatwithme_id = user.data().lastuserchatwithme;

            if (lastuserchatwithme_id) {
              console.log("state.chatId ==>", lastuserchatwithme_id);
              try {
                const user = await getDoc(
                  doc(db, "users", lastuserchatwithme_id)
                );
                console.log("user data authcontxt ==>", user.data());
                console.log("user authcontxt ==>", user);

                // dispatch({ type: "CHANGE_USER", payload: user.data() });
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
    }, [currentUser, router]);

    if (!currentUser) {
      return null;
    }

    return (
      <>
        <Seo title="chats" description="messaging app" />
      <div className="py-4 mx-4 h-screen">
        <Wrapper>
          <div className="h-full flex gap-2">
            {/* aside */}
            <div className="md:w-1/12 h-full  hidden md:block">
              <Sidebar 
              isSidebarCollapsed={isSidebarCollapsed}
              handleCollapseSidebar={handleCollapseSidebar}
              handleCollapseUsers={handleCollapseUsers}
              
              />
            </div>
            {/* end aside */}

            {/* chats */}
            <div
              className={`${
                data?.user?.uid ? "hidden" : "block"
              } md:w-4/12 lg:w-3/12 w-full md:flex flex-col gap-3 h-full relative`}
            >
            <AllUsers isUsersCollapses={isUsersCollapsed} handleCollapseUsers={handleCollapseUsers} handleCollapseSidebar={handleCollapseSidebar}/>
              <div className="flex flex-col gap-2 h-full w-full">
                <SearchBar handleCollapseSidebar={handleCollapseSidebar}  />
                <ChatContainer />
              </div>
              <div
                className={`${
                  !isSidebarCollapsed
                    ? "slide-right -left-20 md:hidden"
                    : "slide-left md:hidden"
                } absolute  z-20  top-1 h-full pb-12`}
              >
              <Sidebar
                handleCollapseSidebar={handleCollapseSidebar}
                handleCollapseUsers={handleCollapseUsers}
              isSidebarCollapsed={isSidebarCollapsed}

              />
              
              </div>
            </div>
            {/* end chats */}

            {/* chat */}
            <div
              className={`${
                data?.user?.uid ? "block" : "hidden md:block"   
              } md:w-7/12 lg:w-8/12  w-full  h-full`}
            >
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
      </>
    );
  };

  export default Chat;
