import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyC4szkhWhyOP8kqo1ZSkiyH_yFEnYjQ5Eo",
  authDomain: "windam-24666.firebaseapp.com",
  projectId: "windam-24666",
  storageBucket: "windam-24666.appspot.com",
  messagingSenderId: "665059327901",
  appId: "1:665059327901:web:a398dd87353ad6842eb974"
};


const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app);
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
export const gitHubProvider = new GithubAuthProvider()

// 