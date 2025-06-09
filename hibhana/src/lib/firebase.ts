import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2eXeIVbQFA7-gZIYNg5r1duLNLMOlTdQ",
  authDomain: "hibhana-8f747.firebaseapp.com",
  projectId: "hibhana-8f747",
  storageBucket: "hibhana-8f747.appspot.com",
  messagingSenderId: "508136752024",
  appId: "1:508136752024:web:dummyappidfordemo" // Replace with actual appId if needed
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 