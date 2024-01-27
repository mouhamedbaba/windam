import { db } from "@/config/firebase";
import { AuthContext } from "@/context/authContext";
import { ChatContext } from "@/context/chatContext";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc  } from "firebase/firestore";
import React, { useContext } from "react";
import { toast } from "react-toastify";


export const SingleChat = ({user, setuserprop, setusernameprop}) => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);



    const handleSelect = async () => {

      //check whether the group(chats in firestore) exists, if not create
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
  
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
          //create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              // photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
            
          }).then((res) => {
            // toast('ok')
          }).catch((err) => {
            toast('nope')
            console.log(err);
          })
  

    dispatch({ type: "CHANCE_USER", payload: user });

        }
      } catch (err) {
        console.log(err);
      }
  
      setuserprop([])
      setusernameprop('')
    };


  
  return (
    <li onClick={handleSelect} className="hover:bg-slate-200 px-2 dark:hover:bg-slate-900 flex justify-between gap-x-6 py-5 cursor-pointer w-full" >
      <div className="flex min-w-0 gap-x-4">
        <div
          className="h-12 w-12 flex-none rounded-full bg-gray-500 animate-pulse"
          // src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          // alt=""
        ></div>
        <div className="min-w-0 flex-auto">
          <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-100">
            {user.displayName}
            {
              user.uid === currentUser.uid && (
                <span className="ml-2 inline-flex items-center rounded-full bg-slate-600 px-2.5 py-0.5 text-xs font-medium text-slate-100 dark:bg-slate-700 dark:text-slate-300">You</span>
              )
            }
          </div>
            {
              user.uid === currentUser.uid ? (
                <div className="mt-1 truncate text-xs leading-5 text-gray-500">
                  message your self
                </div>
              ) :(
                <div className="mt-1 truncate text-xs leading-5 text-gray-500">
                chat with {user.displayName}

                </div>
              )
            }

        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <div className="mt-1 text-xs leading-5 text-gray-500">
          <time dateTime="2023-01-23T13:23Z">10:27 AM</time>
        </div>
        <div className="mt-1 text-xs leading-5 text-gray-500">
          <div className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full  dark:border-gray-900">
            1
          </div>
        </div>
      </div>
    </li>
  );
};
