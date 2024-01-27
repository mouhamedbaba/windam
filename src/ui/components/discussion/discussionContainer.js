import { db } from '@/config/firebase';
import { ChatContext } from '@/context/chatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Message } from './message';

export const DiscussionContainer = () => {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext);
  const [isLoading , setIsLoading] = useState(false)

  useEffect(()=>{
    setIsLoading(true)
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) =>{
      doc.exists() && setMessages(doc.data().messages)
      setIsLoading(false)
    }) 
  return () =>{
    unSub()
  }
  }, [data.chatId])

  console.log(messages);
// ...
  if (data){
    
  }

return (
  <div className="bg-white dark:bg-slate-800 h-full rounded-xl py-2 overflow-hidden relative">
    {
      data.user?.uid ? (
        
    <div className="h-full px-5 py-2 overflow-auto">
      {
        isLoading ? (
          <>
          <div className="flex justify-center date mb">
          <div className="box-date  w-20 h-6 bg-gray-500 rounded-3xl px-3 py-1 animate-pulse">
            
          </div>
        </div>
        <div className="flex justify-end chat mb-1">
          <div>
            <div className="box-chat  rounded-l-3xl rounded-t-3xl  px-4 py-2 bg-gray-600  w-80 mt-3  h-10 animate-pulse">
             
            </div>
            <span className="  flex justify-end ">
              <div className="bg-gray-300 h-4 w-20 mt-1 rounded-sm animate-pulse"></div>
            </span>
          </div>
        </div>
        <div className="flex justify-start chat mb-1 gap-x-2">
          <div className="flex flex-col justify-end items-end pb-5">
            <div
              className="h-10 w-10 flex-none rounded-full bg-gray-500 animate-pulse"
            ></div>
          </div>
          <div>
            <div className="box-chat   rounded-r-3xl rounded-t-3xl  px-4 py-2 bg-slate-300  h-10 w-60">
              
            </div>
            <div className="bg-slate-400 w-60  mt-1 rounded-lg animate-pulse h-32">
              
            </div>
            <span className="flex justify-start ">
            <div className="bg-gray-300 h-4 w-20 mt-1 rounded-sm animate-pulse"></div>
            </span>
          </div>
        </div>
        <div className="flex justify-end chat mb-1">
          <div>
            <div className="box-chat  rounded-l-3xl rounded-t-3xl  px-4 py-2 bg-gray-600  w-80   h-10 animate-pulse">
             
            </div>
            <span className="  flex justify-end ">
              <div className="bg-gray-300 h-4 w-20 mt-1 rounded-sm animate-pulse"></div>
            </span>
          </div>
        </div>
        <div className="flex justify-start chat mb-1 gap-x-2">
          <div className="flex flex-col justify-end items-end pb-5">
            <div
              className="h-10 w-10 flex-none rounded-full bg-gray-500 animate-pulse"
            ></div>
          </div>
          <div>
            <div className="box-chat   rounded-r-3xl rounded-t-3xl  px-4 py-2 bg-slate-300  h-10 w-60">
              
            </div>
            
            <span className="flex justify-start ">
            <div className="bg-gray-300 h-4 w-20 mt-1 rounded-sm animate-pulse"></div>
            </span>
          </div>
        </div>
        </>
        ) : (
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        )
      }
    </div>
      ) : (
        <div className="flex justify-center items-center h-full px-3">
                    <div className="">
                      <img src="/assets/svg/nochat.jpg" />
                      <h1 className="text-center font-semibold">
                       Clicker sur un messgaes pour l'ouvrir{" "}
                      </h1>
                    </div>
                  </div>
      )
    }
  </div>
);

}
