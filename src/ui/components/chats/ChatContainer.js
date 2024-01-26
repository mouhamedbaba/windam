import React, { useContext, useEffect, useState, useRef } from "react";
import { SingleChat } from "./sigleChat";
import { AuthContext } from "@/context/authContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import { ChatContext } from "@/context/chatContext";
import { ChatPulse } from "./chatPulse";

export const ChatContainer = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setIsLoading(true);

    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        console.log("chats", chats);
        setIsLoading(false);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANCE_USER", payload: user });
  };

  return (
    <div className="bg-white dark:bg-slate-800 h-full rounded-3xl overflow-hidden pb-10 relative">
      <div className="py-3 h-full">
        <h1 className="text-base font-semibold text-gray-700 dark:text-gray-200 sm:truncate ms-1 sm:tracking-tight fixed px-3">
          Chats
        </h1>
        <div className="mt-10 h-full rounded-sm">
          <ul
            role="list"
            className="divide-y divide-gray-100 dark:divide-gray-700 overflow-auto h-full"
          >
            {!isLoading ? (
              Object.keys(chats).length === 0 ? (
                <div className="flex justify-center items-center h-full px-3">
                <div className="">
                  <img src ="/assets/svg/nochat.jpg" />
                  <h1 className="text-center font-semibold">Pas encore de discussions, explorer l'app et trouver des amis </h1>
                  </div>
                </div>
              ) : (
                Object.entries(chats)
                  ?.sort((a, b) => b[1].date - a[1].date)
                  .map((chat) => (
                    <li
                      className="hover:bg-slate-200 px-2 dark:hover:bg-slate-900 flex justify-between gap-x-6 py-5 cursor-pointer"
                      key={chat[0]}
                      onClick={() => handleSelect(chat[1].userInfo)}
                    >
                      <div className="flex min-w-0 gap-x-4">
                        {chat[1].userInfo?.photoURL ? (
                          <img
                            className="h-12 w-12 flex-none rounded-full"
                            src={chat[1].userInfo?.photoURL}
                            alt="User Avatar"
                          />
                        ) : (
                          <div className="h-12 w-12 flex-none rounded-full bg-gray-500 animate-pulse"></div>
                        )}
                        <div className="min-w-0 flex-auto">
                          <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-100">
                            {chat[1].userInfo?.displayName}
                          </div>
                          <div className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {chat[1].lastMessage?.text
                              ? chat[1].lastMessage?.text
                              : "Commencer une discussion"}
                          </div>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <div className="mt-1 text-xs leading-5 text-gray-500">
                          <time dateTime="2023-01-23T13:23Z">10:27 AM</time>
                        </div>
                        <div className="mt-1 text-xs leading-5 text-gray-500">
                          <div className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full dark:border-gray-900">
                            1
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
              )
            ) : (
              <>
                <ChatPulse />
                <ChatPulse />
                <ChatPulse />
                <ChatPulse />
                <ChatPulse />
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 rounded-b-3xl bg-gradient-to-b from-transparent to-white dark:to-slate-900"></div>
    </div>
  );
};
