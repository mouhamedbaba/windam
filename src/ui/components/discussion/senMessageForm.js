import React, { useContext, useState } from "react";
import { ChatContext } from "@/context/chatContext";
import { AuthContext } from "@/context/authContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/config/firebase";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

export const SendMessageForm = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [file, setFile] = useState(null);
  const [downloadurl, setDownloadurl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSend = async () => {
    setText("");
    if (text === "" && file === null) {
      return;
    }

    // Fonction pour gérer l'envoi du message
    const handleSendMessage = async (downloadURL = null) => {
      console.log(downloadURL);

      // Le reste de votre code ici, en utilisant downloadURL comme nécessaire
      // ...
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          photoURL: currentUser.photoURL,
          read: false,
          file: downloadURL ? downloadURL : null,
        }),
      })
        .then(() => {
          setText("");
        })
        .catch((err) => {});
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
          hasFile: downloadURL ? true : false,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [data.chatId + ".lastMessage"]: {
          text,
          hasFile: downloadURL ? true : false,
        },
        [data.chatId + ".read"]: false,
        [data.chatId + ".date"]: serverTimestamp(),
      }).then((res) => {
        // toast.success("Message sent")
      }).catch((err) => {
        toast.error("Message not sent")
        // console.log(err);
      });
    };

    if (file !== null) {
      setIsUploading(true);
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        // Gérer les états du téléchargement si nécessaire
      }, (error) => {
        // Gérer les erreurs du téléchargement si nécessaire
      }, () => {
        // Téléchargement terminé, obtenir l'URL de l'image
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setDownloadurl(downloadURL);
          setFile(null);

          // Maintenant, vous pouvez utiliser downloadURL comme nécessaire, par exemple, le stocker dans votre état.
          handleSendMessage(downloadURL);
        });
      });
    } else {
      // Si aucun fichier, appelez directement la fonction handleSendMessage
      handleSendMessage();
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <div className={`${data.user?.uid ? "flex" : "hidden"} gap-1 h-16 relative`}>
    {
      file && (
        <div
        className="absolute h-fit max-h-96 w-fit max-w-full bg-slate-900 dark:bg-slate-900 rounded-xl bottom-16 overflow-hidden"
        >
        <img 
        src={URL.createObjectURL(file)}
        alt="background"
        className="object-cover h-full w-full"
        />
        </div>
      )
    }

      <div className="bg-white dark:bg-slate-800 h-full rounded-xl grow ">
        <div className="flex gap-1  justify-center items-center h-full py-1 px-6 ">
        <label htmlFor="file" className="cursor-pointer">
        <input type="file" id="file"  className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 950 950"
            xmlSpace="preserve"
            className="w-5 h-5 fill-slate-900 dark:fill-slate-300"
          >
            <g>
              <path
                d="M857.7,141.3c-30.1-30.1-65.1-53.5-104.3-69.4c-37.8-15.3-77.7-23.2-118.7-23.2c-40.9,0-80.9,7.7-118.7,22.9
		c-39.1,15.8-74.2,38.9-104.3,68.8L73.1,478.3C49.3,501.9,30.9,529.4,18.3,560.2C6.2,589.9,0,621.3,0,653.6
		C0,685.7,6.1,717,18.1,746.7c12.4,30.7,30.7,58.2,54.3,81.899c23.6,23.7,51.2,42,81.9,54.5c29.7,12.101,61.1,18.2,93.3,18.2
		c32.2,0,63.6-6.1,93.3-18.1c30.8-12.5,58.399-30.8,82.1-54.4l269.101-268c17.3-17.2,30.6-37.3,39.699-59.7
		c8.801-21.6,13.2-44.5,13.2-67.899c0-48.2-18.8-93.2-52.899-127c-34-34.2-79.2-53.1-127.301-53.3c-48.199-0.1-93.5,18.6-127.6,52.7
		L269.6,473.3c-8.5,8.5-13.1,19.7-13.1,31.601c0,11.899,4.6,23.199,13.1,31.6l0.7,0.7c17.4,17.5,45.8,17.5,63.3,0.1l168-167.5
		c35.1-34.8,92.1-35,127.199-0.399c16.9,16.8,26.101,39.3,26.101,63.399c0,24.3-9.4,47.101-26.5,64.101l-269,268
		c-0.5,0.5-0.9,0.899-1.2,1.5c-29.7,28.899-68.9,44.699-110.5,44.5c-41.9-0.2-81.2-16.5-110.6-46c-14.7-15-26.1-32.5-34-52
		C95.5,694,91.7,674,91.7,653.6c0-41.8,16.1-80.899,45.4-110.3c0.4-0.3,0.7-0.6,1.1-0.899l337.9-337.8c0.3-0.3,0.6-0.7,0.899-1.1
		c21.4-21,46.3-37.4,74-48.5c27-10.8,55.4-16.2,84.601-16.2c29.199,0,57.699,5.6,84.6,16.4c27.9,11.3,52.9,27.8,74.3,49.1
		c21.4,21.4,37.9,46.4,49.2,74.3c10.9,26.9,16.4,55.4,16.4,84.6c0,29.3-5.5,57.9-16.5,85c-11.301,28-28,53.2-49.5,74.8l-233.5,232.8
		c-8.5,8.5-13.2,19.7-13.2,31.7s4.7,23.2,13.1,31.6l0.5,0.5c17.4,17.4,45.8,17.4,63.2,0L857.5,586.9
		C887.601,556.8,911,521.7,926.9,482.6C942.3,444.8,950,404.9,950,363.9c0-40.9-7.8-80.8-23.1-118.5
		C911.101,206.3,887.8,171.3,857.7,141.3z"
              />
            </g>
          </svg>
          </label>
          <div className=" h-full grow">
            <input
              type="text"
              placeholder="Type a message"
              autoFocus
              onKeyDown={handleKey}
              value={text}
              className="bg-transparent h-full w-full outline-none px-3 dark:text-white"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <svg
            className="h-6 w-6 fill-slate-900 dark:fill-slate-300 cursor-pointer"
            fill="#000000"
            viewBox="0 0 56 56"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              toast.warning("Not implemented yet, comming soon...");
            }}
          >
            <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z M 21.1796 25.8672 C 22.5624 25.8672 23.7109 24.6484 23.7109 22.9375 C 23.7109 21.2266 22.5624 20.0078 21.1796 20.0078 C 19.8202 20.0078 18.6952 21.2266 18.6952 22.9375 C 18.6952 24.6484 19.8202 25.8672 21.1796 25.8672 Z M 34.8905 25.8672 C 36.2733 25.8672 37.4218 24.6484 37.4218 22.9375 C 37.4218 21.2266 36.2733 20.0078 34.8905 20.0078 C 33.5077 20.0078 32.3827 21.2266 32.3827 22.9375 C 32.3827 24.6484 33.5077 25.8672 34.8905 25.8672 Z M 27.9999 39.2968 C 33.6483 39.2968 37.1874 35.2890 37.1874 33.7656 C 37.1874 33.4609 36.9530 33.3203 36.7187 33.5078 C 35.0077 34.9375 32.1249 36.3437 27.9999 36.3437 C 23.8514 36.3437 20.8983 34.8437 19.2577 33.5312 C 19.0234 33.3203 18.7890 33.4609 18.7890 33.7656 C 18.7890 35.2890 22.3280 39.2968 27.9999 39.2968 Z" />
          </svg>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 h-full rounded-xl px-3 cursor-not-allowed opacity-50" 
      onClick={() => toast.warning("This is not my level yet 😁")}
      >
        <div className="h-full flex justify-center items-center ">
          <svg
            
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 47.964 47.965"
            xmlSpace="preserve"
            className="w-4 h-4 fill-slate-900 dark:fill-slate-300"
          >
            <g>
              <g>
                <path
                  d="M23.982,35.268c5.531,0,10.033-4.635,10.033-10.332V10.333C34.015,4.635,29.513,0,23.982,0
			c-5.532,0-10.032,4.635-10.032,10.333v14.604C13.951,30.633,18.451,35.268,23.982,35.268z M29.22,24.938
			c0,2.974-2.35,5.395-5.238,5.395s-5.238-2.42-5.238-5.395V10.333c0-2.974,2.35-5.395,5.238-5.395s5.238,2.42,5.238,5.395V24.938z"
                />
                <path
                  d="M40.125,29.994c0-1.361-1.222-2.469-2.72-2.469c-1.5,0-2.721,1.107-2.721,2.469c0,4.042-3.621,7.329-8.074,7.329h-5.257
			c-4.453,0-8.074-3.287-8.074-7.329c0-1.361-1.221-2.469-2.721-2.469c-1.499,0-2.719,1.107-2.719,2.469
			c0,6.736,6.014,12.221,13.424,12.266v0.766h-5.944c-1.499,0-2.72,1.107-2.72,2.47s1.221,2.47,2.72,2.47h17.325
			c1.5,0,2.721-1.107,2.721-2.47s-1.221-2.47-2.721-2.47h-5.942V42.26C34.111,42.215,40.125,36.73,40.125,29.994z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div
        className="bg-red-600 h-full rounded-xl  px-3 opacity-70 hover:opacity-100 focus:opacity-100 hover:py-0 cursor-pointer transition duration-500"
        onClick={handleSend}
      >
        <div className="h-full flex justify-center items-center">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            id="send-alt"
            className="icon glyph h-4 w-4"
            fill=""
            stroke=""
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                fill="#ffffff"
                d="M21.88,4.73,16.2,20.65A2,2,0,0,1,14.3,22h0a2,2,0,0,1-1.9-1.31l-2.12-5.52,1.54-1.54,2.49-2.49a1,1,0,1,0-1.42-1.42l-2.49,2.49L8.82,13.76,3.31,11.63a2,2,0,0,1,0-3.83L19.27,2.12a2,2,0,0,1,2.61,2.61Z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
