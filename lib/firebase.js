// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCas1UoFEMCGZyCeUIziLVm7M2bWrhpt8s",
    authDomain: "adopt-me-8052e.firebaseapp.com",
    projectId: "adopt-me-8052e",
    storageBucket: "adopt-me-8052e.appspot.com",
    messagingSenderId: "124287669833",
    appId: "1:124287669833:web:88cf71c977373349771198",
    measurementId: "G-Y6EG6B30K7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
