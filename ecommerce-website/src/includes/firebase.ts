// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAb3oHb2Pqos-s95MyKES6mc0RYUqVPMn8",
  authDomain: "ecommerce-website-91cba.firebaseapp.com",
  projectId: "ecommerce-website-91cba",
  storageBucket: "ecommerce-website-91cba.appspot.com",
  messagingSenderId: "23362426185",
  appId: "1:23362426185:web:54cd1b3749ca7497c0f698",
  measurementId: "G-6SXQ5CMB5G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const categories = collection(db, "Categories");
const discounts = collection(db, "discounts");
const advertisements = collection(db, "advertisements");
const bestDeals = collection(db, "bestDeals");
const brands = collection(db, "brands");
const services = collection(db, "services");
const products = collection(db, "products");
const headPhons = collection(db, "headPhons");
const cart = collection(db, "cart");
const storage = getStorage(app);

export {
  app,
  analytics,
  auth,
  db,
  storage,
  categories,
  discounts,
  advertisements,
  bestDeals,
  brands,
  services,
  products,
  headPhons,
  cart,
};
