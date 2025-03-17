import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC8oMEHhqJPfGNme0g6O0iEkOnz7FkaEX4",
  authDomain: "auth-yt-58cbe.firebaseapp.com",
  projectId: "auth-yt-58cbe",
  storageBucket: "auth-yt-58cbe.firebasestorage.app",
  messagingSenderId: "444269606457",
  appId: "1:444269606457:web:25a7373fa5634eb75c3fe8",
  measurementId: "G-C1RPD78NZ5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithCredential, GoogleAuthProvider };
