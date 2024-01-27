import React, { useState, useContext } from "react";
import { SingleChat } from "../chats/sigleChat";
import {
  collection,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { AuthContext } from "@/context/authContext";

export const SearchBar = ({handleCollapseSidebar}) => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const citiesRef = collection(db, "users");
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(citiesRef, where("displayName", "==", username));

    const querySnapshot = await getDocs(q);
    const foundUsers = [];

    querySnapshot.forEach((doc) => {
      foundUsers.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });

    setUsers(foundUsers);
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="bg-white dark:bg-slate-800 h-24 rounded-3xl relative">
      <div className="py-3 px-4 h-full w-full flex gap-2 items-center">
      <button className="h-10  w-10 rounded-full flex justify-center items-center "
      onClick={handleCollapseSidebar}
      >
          <svg
            viewBox="0 0 24 24"
            className="stroke-white fill-none"
            xmlns="http://www.w3.org/2000/svg"
          >
<path fillRule="evenodd" clipRule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#1C274C"/>
          </svg>
        </button>
        <div className="div grow">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
            onKeyDown={handleKey}
            placeholder="Search"
            className="w-full bg-transparent dark:text-white-100 border border-gray-300 dark:border-gray-600 outline-none px-4 py-2 rounded-3xl"
          />
        </div>
        <button
          className="h-10 bg-gray-600 w-10 rounded-full flex justify-center items-center "
          onClick={handleSearch}
        >
          <svg
            viewBox="0 0 24 24"
            className="stroke-white fill-none"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              className="stroke-white "
              d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="#000000"
              strokeWidth="2"
              strokLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {users.length > 0 && (
        <div className="md:w-96  shadow-2xl py-2 absolute bg-slate-100 rounded-xl z-10 w-full">
          <ul
            role="list"
            className="divide-y divide-gray-100 dark:divide-gray-700 overflow-auto h-full"
          >
            {users.map((user) => (
              <SingleChat
                key={user.uid}
                user={user}
                setuserprop={setUsers}
                setusernameprop={setUsername}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
