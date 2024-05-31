// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCG8lhi1S9XJyzUJqJ7aYwzURMISirqBG4",
    authDomain: "trabalho-itc.firebaseapp.com",
    projectId: "trabalho-itc",
    storageBucket: "trabalho-itc.appspot.com",
    messagingSenderId: "594494160568",
    appId: "1:594494160568:web:fd0df63ef78d0175fc3e4d",
    measurementId: "G-XX3VK764S9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default db;
export { auth, provider }