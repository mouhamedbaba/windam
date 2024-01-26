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
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
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
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">
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
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
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
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 w-full text-white py-2 px-4 rounded-md font-semibold"
        >
          {isLoading ? "chargement..." : "Connexion"}
        </button>
      </form>
      <hr className="my-6" />
      <p className="text-center ">Ou se connecter avec </p>
      <div className="my-4 flex justify-between gap-4 w-full">
        <button
          type="button"
          className="mt-2 w-full bg-red-500 text-white py-2 px-4 rounded-md"
          onClick={handleGoogleRegister}
        >
          {/* <FontAwesomeIcon icon={faGoogle} className="mr-2" /> */}
          Google
        </button>

        <button
          type="button"
          className="mt-2 w-full bg-gray-800 text-white py-2 px-4 rounded-md"
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
  );
};

export default Login;
