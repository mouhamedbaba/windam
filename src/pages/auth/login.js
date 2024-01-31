import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth, googleProvider } from "@/config/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { Seo } from "@/ui/components/seo/seo";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/chat");
    } catch (error) {
      setIsLoading(false);
      toast.error("Invalid Credentials");
    }
  };

  const handleGoogleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signInWithPopup(auth, new GoogleAuthProvider());
      const userDocRef = doc(db, "users", res.user.uid);
      const userChatsDocRef = doc(db, "userChats", res.user.uid);

      // Vérifier si les documents existent avant de les créer
      const userDocSnapshot = await getDoc(userDocRef);
      const userChatsDocSnapshot = await getDoc(userChatsDocRef);

      if (!userDocSnapshot.exists()) {
        setDoc(userDocRef, {
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          photoUrl: res.user.photoURL,
        });
      }

      if (!userChatsDocSnapshot.exists()) {
        setDoc(userChatsDocRef, {});
      }

      // Rediriger vers la page de chat
      router.push("/chat");
    } catch (error) {
      // Gérer spécifiquement les erreurs de connexion avec Google
      console.error(
        "Erreur lors de la connexion avec Google:",
        error.code,
        error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Seo title="Login" description="Login to your account" />
    <div className="relative">
    {
      isLoading && (
        <div className="absolute h-full w-full flex justify-center items-center ">
        <svg  className="fill-slate-800 dark:fill-slate-50 h-16 w-16 animate-spin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z"/>
        </g>
    </svg>
        </div>
      )
    }
    <div className="max-w-md mx-auto container p-6 mt-16 md:bg-white md:dark:bg-slate-800 dark:text-white rounded-md md:shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Se Connecter</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent  w-full border border-slate-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:focus:border-blue-900"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-1"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent  w-full border border-slate-300 dark:border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:focus:border-blue-900"
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700  w-full text-white py-2 px-4 rounded-md font-semibold h-10 "
        >
        Se connecter
        
        </button>
      </form>
      <hr className="my-6" />
      <p className="text-center ">Ou se connecter avec </p>
      <div className="my-4 flex justify-between gap-4 w-full">
        <button
          type="button"
          className="mt-2 w-full bg-red-600 font-medium text-white py-2 px-4 rounded-md"
          onClick={handleGoogleRegister}
        >
          {/* <FontAwesomeIcon icon={faGoogle} className="mr-2" /> */}
          Google
        </button>

        <button
          type="button"
          className="mt-2 w-full bg-black md:bg-gray-900 font-medium text-white py-2 px-4 rounded-md"
        >
          {/* <FontAwesomeIcon icon={faGithub} className="mr-2" /> */}
          GitHub
        </button>
      </div>
      <Link
        href="/auth/register"
        className="text-blue-500 flex justify-center font-bold"
      >
        S'incrire
      </Link>
    </div>
    </div>
    </>
  );
};

export default Login;
