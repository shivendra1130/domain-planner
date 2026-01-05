import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (verified)
const firebaseConfig = {
    apiKey: "AIzaSyCKUM5RAUPJUCFZ6P4DoxGo3MFpUElkrqs",
    authDomain: "domain-planner.firebaseapp.com",
    projectId: "domain-planner",
    storageBucket: "domain-planner.appspot.com",
    messagingSenderId: "391580337824",
    appId: "1:391580337824:web:5ff136738b29910fe5abc5"
};

// Initialize Firebase ONCE
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
