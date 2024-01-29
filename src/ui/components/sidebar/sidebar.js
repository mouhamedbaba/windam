import { auth } from "@/config/firebase";
import { AuthContext } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { SwithTeme } from "../SwithTeme";
import { AllUsers } from "../chats/AllUsers";

export const Sidebar = ({ handleCollapseSidebar, handleCollapseUsers }) => {
  const { currentUser } = useContext(AuthContext);
  const [isProfileIfoCollapsed, setIsProfileIfoCollapsed] = useState(true);
  const router = useRouter();
  const LogOut = async () => {
    await signOut(auth)
      .then(() => {
        toast.success("Good bay, see you soon ! ");
        router.push("/auth/login");
      })
      .catch((error) => {
        toast.warning("une errreur c'est produite ");
      });
  };

  const handleCollapse = () => {
    setIsProfileIfoCollapsed(!isProfileIfoCollapsed);
  };

  return (
    <div className="h-full w-full bg-slate-900 md:bg-slate-950 rounded-3xl relative">
      <div className="py-3 px-4 h-full w-full flex flex-col gap-2 items-center">
        <button
          className="h-10  w-10 rounded-full flex justify-center items-center md:hidden"
          onClick={handleCollapseSidebar}
        >
          <svg
            viewBox="0 0 24 24"
            className="stroke-white fill-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle id="primary" cx="12" cy="12" r="10"></circle>
            <path
              id="secondary"
              d="M17,11H11V9.86a1,1,0,0,0-1.5-.69L6.38,11.31a.82.82,0,0,0,0,1.38L9.5,14.83a1,1,0,0,0,1.5-.69V13h6a1,1,0,0,0,0-2Z"
            ></path>
          </svg>
        </button>
        <div className=" my-auto flex rounded-full grow flex-col justify-center  items-center gap-8"
        
        >

          <svg
            className="fill-slate-100 w-8 h-8 cursor-pointer hover:fill-red-500"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {handleCollapseUsers(), handleCollapseSidebar()}}
          >
            <path d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z" />
            <path d="M18 16.5C18 18.433 15.3137 20 12 20C8.68629 20 6 18.433 6 16.5C6 14.567 8.68629 13 12 13C15.3137 13 18 14.567 18 16.5Z" />
            <path d="M7.12205 5C7.29951 5 7.47276 5.01741 7.64005 5.05056C7.23249 5.77446 7 6.61008 7 7.5C7 8.36825 7.22131 9.18482 7.61059 9.89636C7.45245 9.92583 7.28912 9.94126 7.12205 9.94126C5.70763 9.94126 4.56102 8.83512 4.56102 7.47063C4.56102 6.10614 5.70763 5 7.12205 5Z" />
            <path d="M5.44734 18.986C4.87942 18.3071 4.5 17.474 4.5 16.5C4.5 15.5558 4.85657 14.744 5.39578 14.0767C3.4911 14.2245 2 15.2662 2 16.5294C2 17.8044 3.5173 18.8538 5.44734 18.986Z" />
            <path d="M16.9999 7.5C16.9999 8.36825 16.7786 9.18482 16.3893 9.89636C16.5475 9.92583 16.7108 9.94126 16.8779 9.94126C18.2923 9.94126 19.4389 8.83512 19.4389 7.47063C19.4389 6.10614 18.2923 5 16.8779 5C16.7004 5 16.5272 5.01741 16.3599 5.05056C16.7674 5.77446 16.9999 6.61008 16.9999 7.5Z" />
            <path d="M18.5526 18.986C20.4826 18.8538 21.9999 17.8044 21.9999 16.5294C21.9999 15.2662 20.5088 14.2245 18.6041 14.0767C19.1433 14.744 19.4999 15.5558 19.4999 16.5C19.4999 17.474 19.1205 18.3071 18.5526 18.986Z" />
          </svg>
          <svg
            className="fill-red-600 w-8 h-8 cursor-pointer hover:fill-red-500"
            viewBox="0 0 256.00098 256.00098"
            id="Flat"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M232,96.00049a16.01833,16.01833,0,0,0-16-16H184v-32a16.01833,16.01833,0,0,0-16-16H40a16.01833,16.01833,0,0,0-16,16v128a7.99978,7.99978,0,0,0,13.0293,6.22119L72,153.95032l.001,30.05017a16.01833,16.01833,0,0,0,16,16h93.58789l37.38281,30.22119a7.99979,7.99979,0,0,0,13.0293-6.22119ZM189.44727,185.7793a7.99922,7.99922,0,0,0-5.0293-1.77881H88.001l-.001-32h80a16.01833,16.01833,0,0,0,16-16v-40h32l.001,111.24512Z" />
          </svg>
          <SwithTeme />
          <div className=" h-8 w-8">
            <svg
              className="fill-transparent   w-8 h-8 cursor-pointer hover:stroke-red-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                className="stroke-slate-100 hover:stroke-red-500"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className=" h-12 w-12 cursor-pointer" onClick={handleCollapse}>
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt=""
              className="w-full h-full rounded-full"
            />
          ) : (
            <div className="w-fll h-full rounded-full bg-slate-800 p-3">
              <svg
                className="w-fll h-full stroke-slate-100"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z"
                  className="stroke-slate-100"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22"
                  className="stroke-slate-100"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div
        className={`transition duration-1000 ${
          isProfileIfoCollapsed
            ? "hidden transition duration-1000"
            : "block transition duration-1000"
        } bottom-16 md:-right-16 z-30 bg-slate-800 h-80 w-60 absolute p-4 rounded-lg overflow-x-hidden overflow-Y-auto`}
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full relative">
            <img
              src={currentUser?.photoURL}
              alt={currentUser?.displayName}
              className="w-20 h-20 rounded-full relative"
            />
            <div className="absolute edit-profile  right-0 bottom-0 rounded-sm cursor-pointer bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-green-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-center text-slate-100 font-bold mt-2">
            {currentUser?.displayName}
          </p>
          <p className=" text-slate-100 truncate mt-5">{currentUser?.email}</p>
          <div className="flex flex-col  mt-10 h-full">
            <button
              onClick={LogOut}
              className="text-white font-medium py-2  rounded-xl bg-slate-900 mt-10 hover:bg-slate-500 transition  "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
