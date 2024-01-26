import React, { useState, useContext } from "react";
import { SingleChat } from "../chats/sigleChat";
import { collection, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { AuthContext } from "@/context/authContext";

export const SearchBar = () => {
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
        <button className="h-10 bg-red-600 w-10 rounded-full flex justify-center items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              fill="white"
              d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
            ></path>
          </svg>
        </button>
      </div>
      {
        users.length > 0 && <div className="min-w-96 max-w-60 shadow-2xl py-2 absolute bg-slate-100 rounded-xl z-10">
        <ul
          role="list"
          className="divide-y divide-gray-100 dark:divide-gray-700 overflow-auto h-full"
        > 
          {users.map((user) => (
            <SingleChat key={user.uid} user={user} setuserprop={setUsers} setusernameprop={setUsername} />
          ))}
        </ul>
      </div>
      }
      
    </div>
  );
};
