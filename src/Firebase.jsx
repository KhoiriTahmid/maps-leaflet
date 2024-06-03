// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNVpNJiMUJ04qe_jX66OWEw0foCFD6qIw",
  authDomain: "leaflet-map-11bfc.firebaseapp.com",
  projectId: "leaflet-map-11bfc",
  storageBucket: "leaflet-map-11bfc.appspot.com",
  messagingSenderId: "85666206589",
  appId: "1:85666206589:web:94bd71a930553d45937214",
  measurementId: "G-11EQ322RLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);