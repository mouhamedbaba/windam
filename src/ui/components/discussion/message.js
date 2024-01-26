import { AuthContext } from '@/context/authContext'
import { ChatContext } from '@/context/chatContext'
import React, { useContext, useEffect, useRef } from 'react'

export const Message = ({ message }) => {

    const {currentUser } = useContext(AuthContext)
    const {data } = useContext(ChatContext)

    const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  
  return (
    <div
    ref={ref}
     className={` ${message.senderId === currentUser.uid ? "ownmessagebox" : "elsemessagebox"} `}>
    <div className="flex flex-col justify-end items-end pb-5">
      {
        message.senderId !== currentUser.uid ? (
          <div
          className="h-10 w-10 flex-none rounded-full bg-gray-500 animate-pulse"
          // src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          // alt=""
        ></div>
        ) : (
          <></>
        )
      }
    </div>
    <div>
      <div className={` ${message.senderId === currentUser.uid ? "ownmessageboxchat" : "elsemessageboxchat"}`}>
        {message.text}
      </div>
      <div className="bg-slate-400 max-w-60  mt-1 rounded-lg overflow-hidden max-h-96">
        <img
          className="cursor-pointer hover:opacity-100 opacity-90 "
          src="/assets/img/templatess.jpg"
          alt=""
        />
      </div>
      <span className={` ${message.senderId === currentUser.uid ? "ownmessageboxdate" : "elsemessageboxdate"}`}>
        5:12 PM
      </span>
    </div>
  </div>
  )
}
