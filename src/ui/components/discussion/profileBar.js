import { ChatContext } from "@/context/chatContext";
import React, { useContext } from "react";

export const ProfileBar = () => {
  const { data, dispatch } = useContext(ChatContext);

  const handleReturnToChats = () => {
    dispatch({ type: "CHANGE_USER", payload: "null" });
  };

  return (
    <div
      className={`${
        data.user?.uid ? "block" : "hidden"
      } bg-white dark:bg-slate-800  h-24 rounded-3xl px-4`}
    >
      <div className="h-full w-full flex flex-row gap-2 justify-center items-center py-4">
        <div className=" grow flex gap-2  ">
          <div className=" grow">
            <div className="flex min-w-0 gap-x-2">
              <button
                onClick={handleReturnToChats}
                className="ms-2 w-8 h-8 rounded-full flex justify-center items-center"
              >
                <svg
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  ariaHidden="true"
                  role="img"
                  className="iconify iconify--emojione-monotone"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M32 2C15.432 2 2 15.432 2 32c0 16.568 13.432 30 30 30s30-13.432 30-30C62 15.432 48.568 2 32 2zm17 35.428H30.307V48L15 32l15.307-16v11.143H49v10.285z"
                    className="fill-slate-400"
                  ></path>
                </svg>
              </button>
              {data.user?.photoURL ? (
                <img
                  className="h-10 w-10 flex-none rounded-full bg-gray-500 hidden md:block"
                  src={data.user?.photoURL}
                  alt=""
                ></img>
              ) : (
                <img
                  className="h-10 w-10 flex-none rounded-full bg-gray-500 hidden md:block"
                  src="https://img.freepik.com/vecteurs-premium/icone-profil-utilisateur-dans-style-plat-illustration-vectorielle-avatar-membre-fond-isole-concept-entreprise-signe-autorisation-humaine_157943-15752.jpg?w=740"
                  alt=""
                ></img>
              )}
              <div className="min-w-0 flex-auto">
                <div className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-100">
                  {data.user?.displayName}
                </div>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1  ">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                  </div>
                  <div className="text-xs leading-5 text-gray-500">Online</div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex min-w-0 gap-x-2 justify-centers items-center hidden">
            <button className="bg-white text-slate-900 border px-5 rounded-2xl font-bold h-full">
              Profile
            </button>
            <button
              className="text-white bg-slate-900 border px-5 rounded-2xl font-bold h-full disabled opacity-15 cursor-not-allowed"
              disabled
            >
              Call
            </button>
          </div>
        </div>
        <div className=" flex gap-2 border-l h-full ms-2  justify-center items-center animate-pulse">
          <div className="me-2 w-10 h-10 rounded-full bg-slate-300"> </div>
        </div>
      </div>
    </div>
  );
};
