// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVIA8q00nJR9JsxoUR1nfygh7akKAZRxo",
    authDomain: "historia-42500.firebaseapp.com",
    projectId: "historia-42500",
    storageBucket: "historia-42500.appspot.com",
    messagingSenderId: "378383654485",
    appId: "1:378383654485:web:ef739884885e2b7126bedc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default db;
export { auth, provider }