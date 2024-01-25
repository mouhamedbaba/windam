import { Html, Head, Main, NextScript } from "next/document";
import { ToastContainer } from 'react-toastify';


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="max-h-screen overflow-hidden dark:bg-slate-900 bg-slate-200">
      <ToastContainer />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
