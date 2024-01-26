import { AuthContextProvider } from "@/context/authContext";
import { ChatContextProvider } from "@/context/chatContext";
import "@/styles/globals.css";
import { SwithTeme } from "@/ui/components/SwithTeme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <SwithTeme />
        <ToastContainer />
        <Component {...pageProps} />
      </ChatContextProvider>
    </AuthContextProvider>
  );
}
