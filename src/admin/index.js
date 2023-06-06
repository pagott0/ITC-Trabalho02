import './admin.css';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../utils/firebaseConnection.js';
import db from '../utils/firebaseConnection.js';

signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;

        if (user.email === "bruno.gvolpee@gmail.com") {
            loadPage();
        } else {
            window.alert("You are not authorized to access this page.");
        }
    })
    .catch(e => {
        window.alert("Erro ao logar, tente novamente mais tarde");
        console.log(e);
    });

const loadPage = () => {
    document.querySelector("body").style.display = "block";

    /* is called when the admin clicks the add button function */
    // TODO: add snapshot
    const addBox = async (text, eventName, eventYear) => {
        try {
            await addDoc(collection(db, "posts"), {
                text,
                eventName,
                eventYear
            });
        } catch (err) {
            window.alert("Erro ao adicionar evento, tente novamente mais tarde");
        }
    };
}