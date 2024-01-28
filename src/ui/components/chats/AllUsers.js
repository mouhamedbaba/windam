import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { ChatPulse } from "./chatPulse";
import { AuthContext } from "@/context/authContext";

export const AllUsers = ({ isUsersCollapses, handleCollapseUsers }) => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsaloading] = useState(true);
  const [isAllusersCollapsed, setIsAllusersCollapsed] = useState(false);

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

  const handleSelect = () => {};

  return (
    <div
      className={`${
        !isAllusersCollapsed && "hidden"
      } h-full w-5/6 end-0 absolute z-10 slide-left bg-white dark:bg-slate-950 rounded-xl`}
    >
      <div className="p-3  flex justify-between flex-row">
        <h1 className="text-base font-semibold text-gray-700 dark:text-gray-200 ">
          users
        </h1>
        <button
          onClick={handleCollapseUsers}
          className="text-gray-700 hover:text-gray-600 dark:text-gray-200 dark:hover:text-white"
        >
          Clik me !
        </button>
      </div>
      <ul
      role="list"
      className="divide-y divide-gray-200 dark:divide-gray-700 overflow-auto h-full "
    >
      {!isLoading ? ( 
        users.map((user) => (



          <li
      key={user.uid} // Ajout d'une clé unique pour chaque utilisateur
      onClick={handleSelect}
      className="hover:bg-slate-200 px-2 dark:hover:bg-slate-800 flex justify-between gap-x-6 py-5 cursor-pointer w-full"
    >
      <div className="flex min-w-0 gap-x-4">
        <div
          className="h-12 w-12 flex-none rounded-full bg-gray-500 animate-pulse"
        ></div>
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

          
        ))
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
  );
};
