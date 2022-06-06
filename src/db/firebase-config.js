import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCc08h5Eq2Y7aV5DrKAWPiFRoP0AZBnrZ4",
    authDomain: "project1-cf10b.firebaseapp.com",
    projectId: "project1-cf10b",
    storageBucket: "project1-cf10b.appspot.com",
    messagingSenderId: "797476282327",
    appId: "1:797476282327:web:a120c0af770aada244b592"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth=getAuth(app)