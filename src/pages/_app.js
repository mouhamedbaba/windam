import { AuthContextProvider } from "@/context/authContext";
import { ChatContextProvider } from "@/context/chatContext";
import "@/styles/globals.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    // Récupérer le thème depuis le localStorage au chargement de la page
    const savedTheme = localStorage.getItem('theme');
    console.log("savedTheme ==>", savedTheme);

    // Si un thème est enregistré, mettre à jour la classe de la balise <html>
    if (savedTheme) {
      document.documentElement.className = savedTheme;
    }
  }, []);
  

  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </ChatContextProvider>
    </AuthContextProvider>
  );
}
