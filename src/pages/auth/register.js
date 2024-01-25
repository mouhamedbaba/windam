import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth, googleProvider } from "@/config/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      console.log(data.user);
      await setDoc(doc(db, "users", data.user.uid), {
        uid: data.user.uid,
        email: email,
        displayName,
      });
      await setDoc(doc(db, "userChats", data.user.uid), {});
      console.log(data);
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
 await signInWithRedirect(auth, googleProvider).then(res=>{
        console.log("res.user", res.user);
        const cerdentials = GoogleAuthProvider.credentialFromResult(res);
        console.log("cerdentials", cerdentials);
        setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email: res.user.email,
          displayName:res.user.displayName,
          photoUrl : res.user.photoURL
        });
        setDoc(doc(db, "userChats", data.user.uid), {});
        console.log(data);
        router.push("/chat");
      }).catch (error =>{
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
      }) 
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">S'inscrire</h1>

      <form onSubmit={handleSubmit}>
      <div className="mb-4">
            
            <label htmlFor="name" className="block text-sm font-semibold mb-1">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
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
          className="bg-blue-500 w-full text-white py-2 px-4 rounded-md"
        >
          {isLoading ? "chargement..." : "s'inscrire"}
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
    </div>
  );
};

export default Register;
