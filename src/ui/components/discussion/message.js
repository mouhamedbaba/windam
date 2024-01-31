import { AuthContext } from "@/context/authContext";
import { ChatContext } from "@/context/chatContext";
import { formatTime } from "@/utils/formatTime";
import React, { useContext, useEffect, useRef } from "react";

export const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={` ${
        message.senderId === currentUser.uid
          ? "ownmessagebox"
          : "elsemessagebox"
      } mt-2`}
    >
      <div className="flex flex-col justify-end items-end pb-2">
        {message.senderId !== currentUser.uid &&
          (message.photoURL ? (
            <img
              className="h-10 w-10  rounded-full bg-gray-500"
              src={message.photoURL}
              alt=""
            ></img>
          ) : (
            <img
              className="h-10 w-10  rounded-full bg-gray-500"
              src="https://img.freepik.com/vecteurs-premium/icone-profil-utilisateur-dans-style-plat-illustration-vectorielle-avatar-membre-fond-isole-concept-entreprise-signe-autorisation-humaine_157943-15752.jpg?w=740"
              alt=""
            ></img>
          ))}
      </div>
      <div>
      {
        (message.text !== "" && !message.file ) &&  (
          <div
          className={` ${
            message.senderId === currentUser.uid
              ? "ownmessageboxchat"
              : "elsemessageboxchat"
          } `}
        >
          {message.text}
          <span
            className={` ${
              message.senderId === currentUser.uid
                ? "ownmessageboxdate"
                : "elsemessageboxdate"
            } text-xs   flex justify-end ms-8`}
          >
            <time dateTime={message.date && message.date.toDate()}>
              {message.date && formatTime(message.date)}
            </time>
            {message.senderId === currentUser.uid && (
              <svg
                className={` ${
                  message.read ? "fill-blue-600" : "fill-gray-600"
                }  w-4 h-4 ms-2  `}
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <title>double-check</title>
                <g id="Page-1" strokeWidth="1" fillRule="evenodd">
                  <g id="add" transform="translate(43.973345, 142.401162)">
                    <path
                      d="M29.3866437,92.7988498 L118.095989,177.108171 L140.695,144.951 L171.978,174.67 L124.596148,242.098499 L-2.84217094e-14,123.732159 L29.3866437,92.7988498 Z M391.905232,0 L426.814745,24.5310087 L273.929481,242.098499 L149.333333,123.732159 L178.719977,92.7988498 L267.429322,177.108171 L391.905232,0 Z M242.571899,0 L277.481411,24.5310087 L221.567,104.101 L190.298,74.375 L242.571899,0 Z"
                      id="Combined-Shape"
                    ></path>
                  </g>
                </g>
              </svg>
            )}
          </span>
        </div>
        )
      }

        {message.file && (
          <div className={`border-8 border-gray-600 rounded-xl  overflow-hidden bg-gray-600 ${
            message.senderId === currentUser.uid ? " rounded-br-none  " : " rounded-bl-none"} `}>
          <div className="bg-slate-400 w-fit max-w-full md:max-w-96   overflow-hidden h-fit max-h-96 object-center">
            <img
              className="cursor-pointer hover:opacity-100 opacity-90 transition-all h-full w-full  "
              src={message.file}
              alt=""
            />
          </div>
          {
            message.text !== "" && (
              
              <div className="caption text-lg font-semibold text-white flex justify-end ms-8 " >
              {message.text}
              </div>
            )
          }
          </div>
        )}
      </div>
    </div>
  );
};
