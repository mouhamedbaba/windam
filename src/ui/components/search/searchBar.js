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

export const SearchBar = ({ handleCollapseSidebar }) => {
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
        <button
          className="h-10  w-10 rounded-full flex justify-center items-center "
          onClick={handleCollapseSidebar}
        >
          <svg
            viewBox="0 0 24 24"
            className="stroke-slate- fill-none"
            xmlns="http://www.w3.org/2000/svg"
          >
                        <path
              d="M19 3.32001H16C14.8954 3.32001 14 4.21544 14 5.32001V8.32001C14 9.42458 14.8954 10.32 16 10.32H19C20.1046 10.32 21 9.42458 21 8.32001V5.32001C21 4.21544 20.1046 3.32001 19 3.32001Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 3.32001H5C3.89543 3.32001 3 4.21544 3 5.32001V8.32001C3 9.42458 3.89543 10.32 5 10.32H8C9.10457 10.32 10 9.42458 10 8.32001V5.32001C10 4.21544 9.10457 3.32001 8 3.32001Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 14.32H16C14.8954 14.32 14 15.2154 14 16.32V19.32C14 20.4246 14.8954 21.32 16 21.32H19C20.1046 21.32 21 20.4246 21 19.32V16.32C21 15.2154 20.1046 14.32 19 14.32Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 14.32H5C3.89543 14.32 3 15.2154 3 16.32V19.32C3 20.4246 3.89543 21.32 5 21.32H8C9.10457 21.32 10 20.4246 10 19.32V16.32C10 15.2154 9.10457 14.32 8 14.32Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
