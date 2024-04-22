// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browser } from "$app/environment";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./firebaseconf";

const app = initializeApp(firebaseConfig);
// Initialize Firebase if app is fully loaded in the
// Browser
if(browser) {
  getAnalytics(app);
}

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);