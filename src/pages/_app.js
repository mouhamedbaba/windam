import { AuthContextProvider } from "@/context/authContext";
import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    < AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  
  );
}
