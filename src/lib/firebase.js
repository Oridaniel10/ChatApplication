// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: "reactchat-279d7.firebaseapp.com",
//   projectId: "reactchat-279d7",
//   storageBucket: "reactchat-279d7.appspot.com",
//   messagingSenderId: "185101603199",
//   appId: "1:185101603199:web:b780eebbb5ba041ea7ca4a"
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth()                       //getAuth()- function that comes from firebase npm ( line 2)
// export const db = getFirestore()                       //getAuth()- function that comes from firebase npm ( line 3)
// export const storage = getStorage()



// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-279d7.firebaseapp.com",
  projectId: "reactchat-279d7",
  storageBucket: "reactchat-279d7.appspot.com",
  messagingSenderId: "185101603199",
  appId: "1:185101603199:web:b780eebbb5ba041ea7ca4a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user);
  } catch (error) {
    console.error("Error during sign-in with Google:", error);
  }
};
