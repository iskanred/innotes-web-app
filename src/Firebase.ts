// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA9YW5uHURnMumw6vxWTgTXJbskO_Jc7ak",
	authDomain: "innotes-8cf81.firebaseapp.com",
	projectId: "innotes-8cf81",
	storageBucket: "innotes-8cf81.appspot.com",
	messagingSenderId: "548820126447",
	appId: "1:548820126447:web:b121f01e8897457b55e91a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
