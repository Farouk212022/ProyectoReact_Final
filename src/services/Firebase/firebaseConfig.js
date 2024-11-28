import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnijkwW4Bq360dsOemwrvRHDRkxGfQTpE",
  authDomain: "proyectotarea-63970.firebaseapp.com",
  projectId: "proyectotarea-63970",
  storageBucket: "proyectotarea-63970.firebasestorage.app",
  messagingSenderId: "526518705343",
  appId: "1:526518705343:web:69dd947eec409b01b63a0a",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
