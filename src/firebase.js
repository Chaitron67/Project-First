import { initializeApp } from 'firebase/app';
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8fYE1Qn4PYzCSLAOH0NKQeN8dP7nxYdI",
  authDomain: "appointment-booking-syst-f3160.firebaseapp.com",
  projectId: "appointment-booking-syst-f3160",
  storageBucket: "appointment-booking-syst-f3160.appspot.com",
  messagingSenderId: "176053021584",
  appId: "1:176053021584:web:e4dedbb899c86c5e282115"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


