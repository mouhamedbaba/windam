import { Html, Head, Main, NextScript } from "next/document";
import { useEffect, useState } from "react";



export default function Document() {
 const [theme, setItem ] = useState()
 useEffect(() =>{
    const theme = localStorage.getItem('theme')
    console.log(theme);
 },[])
  return (
    <Html lang="en" id="theme" >
      <Head />
      <body className="max-h-screen overflow-auto md:overflow-hidden dark:bg-slate-900 bg-slate-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
