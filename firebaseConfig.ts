// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyAbWMiSh2SM1nd7u78BzJ9rxuNGDgVL3nc",
  authDomain: "seahawkstoday-4de05.firebaseapp.com",
  projectId: "seahawkstoday-4de05",
  storageBucket: "seahawkstoday-4de05.appspot.com",
  messagingSenderId: "228986297769",
  appId: "1:228986297769:web:71ed08b87923171f3038b8",
  measurementId: "G-9DELCKMHRL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
