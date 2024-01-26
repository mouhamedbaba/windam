import { db } from '@/config/firebase';
import { ChatContext } from '@/context/chatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Message } from './message';

export const DiscussionContainer = () => {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) =>{
      doc.exists() && setMessages(doc.data().messages)
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
    <div className="h-full px-5 py-2 overflow-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  </div>
);

}
