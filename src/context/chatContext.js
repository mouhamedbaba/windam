import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./authContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
const {currentUser} = useContext(AuthContext)

const INITIAL_STATE = {
    chatId:"null",
    user:{}
}

const chatReducer = (state, action) =>{
    switch (action.type) {
        case "CHANGE_USER":
            console.log("action.payload ==>", action.payload);
            console.log("currentUser.uid ==>", currentUser.uid);
            console.log("state.user ==>", state.user);
            return {
                user:action.payload,
                chatId : 
                 currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid
            }
    
        default:
            return state
    }
}

    const  [state, dispatch ] = useReducer(chatReducer, INITIAL_STATE)
  return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};