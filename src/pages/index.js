import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/router";
import { useContext, useState } from "react";



export default function Home() {
const router = useRouter()
const { currentUser } = useContext(AuthContext);
const [isLoading, setIsLoading] = useState(true)


const handleSelect = async () => {
  setIsLoading(false)
  await currentUser 
  if (currentUser) {
    router.push('/chat')
  } else {
    router.push('auth/login')
  }
  setIsLoading(false)
}


  return (
    <main
    className={`flex min-h-screen flex-col items-center justify-between p-24 relative`}
    >
    {
      !isLoading && (
        <div className="absolute h-full w-full flex justify-center items-center ">
        <svg  className="fill-slate-800 dark:fill-slate-50 h-32 w-32 animate-spin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"/>
        </g>
    </svg>
        </div>
      )
    }
    <button className="text-xl font-bold px-5 py-1 rounded-md bg-slate-800 dark:bg-slate-50 "
    onClick={handleSelect}
    >Get started</button>
    </main>
  );
}
