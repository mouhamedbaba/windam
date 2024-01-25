import React from "react";
import { SingleChat } from "./sigleChat";

export const ChatContainer = () => {
  return (
    <div className="bg-white dark:bg-slate-800  h-full rounded-3xl overflow-hidden pb-10 relative">
      <div className="py-3 h-full  ">
        <h1 className="text-base  font-semibold  text-gray-700 dark:text-gray-200 sm:truncate ms-1 sm:tracking-tight fixed px-3">
          Chats
        </h1>
        <div className="mt-10 h-full rounded-sm">
          <ul
            role="list"
            className="divide-y divide-gray-100 dark:divide-gray-700 overflow-auto h-full"
          >
           {/* <SingleChat />
           <SingleChat />
           <SingleChat />
           <SingleChat />
           <SingleChat />
           <SingleChat />
           <SingleChat />
           <SingleChat /> */}
          </ul>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 rounded-b-3xl   bg-gradient-to-b from-transparent to-white dark:to-slate-900"></div>
    </div>
  );
};
