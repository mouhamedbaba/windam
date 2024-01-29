import { db } from "@/config/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { ChatPulse } from "./chatPulse";
import { AuthContext } from "@/context/authContext";
import { ChatContext } from "@/context/chatContext";
import { toast } from "react-toastify";

export const AllUsers = ({
  isUsersCollapses,
  handleCollapseUsers,
  handleCollapseSidebar,
}) => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [isLoading, setIsaloading] = useState(true);
  const [isAllusersCollapsed, setIsAllusersCollapsed] = useState(false);
  const [isHanldeSelectLoading, setIsHanldeSelectLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      // Utilisation de la fonction setUsers avec une fonction pour garantir la dernière valeur de users
      setUsers(() => querySnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    } finally {
      setIsaloading(false);
    }
  };
  useEffect(() => {
    isUsersCollapses && getAllUsers();
    setIsAllusersCollapsed(isUsersCollapses);
  }, [isUsersCollapses]);

  const handleSelect = async (user) => {
    setIsHanldeSelectLoading(true);
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            // photoUrl: user.photoUrl,
          },
          [combinedId + ".date"]: serverTimestamp(),
        })
          .then((res) => {
            //
          })
          .catch((err) => {
            //
          });
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }
      await updateDoc(doc(db, "users", currentUser.uid), {
        lastuserchatwithme: user.uid,
      });
      dispatch({ type: "CHANGE_USER", payload: user });
      handleCollapseUsers();
    } catch (err) {
      console.log(err);
      toast.error("une erreur s'est prduite");
    } finally {
      setIsHanldeSelectLoading(false);
    }
  };

  return (
    <div
      className={`${
        !isAllusersCollapsed && "hidden"
      } h-full w-full end-0 absolute z-10 slide-left bg-white dark:bg-slate-800 rounded-xl overflow-hidden pb-12`}
    >
      <div className="p-3  flex justify-between flex-row">
        <h1 className="text-base font-semibold text-gray-700 dark:text-gray-200 ">
          users
        </h1>
        <button
          onClick={handleCollapseUsers}
          className="text-gray-700 hover:text-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z"
              className="fill-gray-700"
            />
          </svg>
        </button>
      </div>

      <ul
        role="list"
        className="divide-y divide-gray-200 dark:divide-gray-700 overflow-auto h-full relative"
      >
        {isHanldeSelectLoading && (
          <div className="absolute h-full w-full flex justify-center items-center ">
        <svg  className="fill-slate-800 dark:fill-white h-20 w-20 animate-spin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"/>
        </g>
    </svg>
        </div>
        )}
        {!isLoading ? (
          users.map((user) => (
            <>
              <li
                key={user.uid} // Ajout d'une clé unique pour chaque utilisateur
                onClick={() => handleSelect(user)}
                className="hover:bg-slate-200 px-2 dark:hover:bg-slate-800 flex justify-between gap-x-6 py-5 cursor-pointer w-full"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="h-12 w-12 flex-none rounded-full bg-gray-500  overflow-hidden">
                    {user?.photoURL ? (
                      <img src={user?.photoURL} className="object-fit" />
                    ) : (
                      <img src={user?.photoUrl} className="object-fit" />
                    )}
                  </div>
                  <div className="min-w-0 flex-auto">
                    <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-100">
                      {user.displayName}
                      {user.uid === currentUser.uid && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-slate-600 px-2.5 py-0.5 text-xs font-medium text-slate-100 dark:bg-slate-700 dark:text-slate-300">
                          Vous
                        </span>
                      )}
                    </div>
                    {user.uid === currentUser.uid ? (
                      <div className="mt-1 truncate text-xs leading-5 text-gray-500">
                        Envoyer un message à vous-même
                      </div>
                    ) : (
                      <div className="mt-1 truncate text-xs leading-5 text-gray-500">
                        Discuter avec {user.displayName}
                      </div>
                    )}
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
            </>
          ))
        ) : (
          <>
            <ChatPulse />
            <ChatPulse />
            <ChatPulse />
            <ChatPulse />
            <ChatPulse />
            <ChatPulse />
            <ChatPulse />
            <ChatPulse />
          </>
        )}
      </ul>
    </div>
  );
};
