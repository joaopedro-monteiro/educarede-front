import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7pwIhD5nanSpLLQdd6RYXbEAndMQJZgI",
    authDomain: "tickets-7246a.firebaseapp.com",
    projectId: "tickets-7246a",
    storageBucket: "tickets-7246a.appspot.com",
    messagingSenderId: "558818316484",
    appId: "1:558818316484:web:104bd727a36a0b7ac73991",
    measurementId: "G-Y51TB9MT68"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, analytics };
