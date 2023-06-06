import './admin.css';

import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { auth, provider } from '../utils/firebaseConnection.js';
import db from '../utils/firebaseConnection.js';


onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuário já está logado
        if (user.email === "bruno.gvolpee@gmail.com") {
            loadPage();
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            window.alert("You are not authorized to access this page.");
        }
    } else {
        // Usuário não está logado, exibe o popup de login
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;

                if (user.email === "bruno.gvolpee@gmail.com") {
                    loadPage();
                    localStorage.setItem("user", JSON.stringify(user));
                } else {
                    window.alert("You are not authorized to access this page.");
                }
            })
            .catch(e => {
                window.alert("Erro ao logar, tente novamente mais tarde");
                console.log(e);
            });
    }
});

const loadPage = () => {
    document.querySelector("body").style.display = "block";
    const storeButton = document.querySelector("#storeButton");

    //Events listenners
    storeButton.addEventListener('click', (e) => storeBox(e))

    /* is called when the admin clicks the add button function */
    // TODO: add snapshot
    const storeBox = async (e) => {
        e.preventDefault();
        const text = document.querySelector("#text").value;
        const eventName = document.querySelector("#eventName").value;
        const eventYear = document.querySelector("#eventYear").value;

        try {
            await addDoc(collection(db, "posts"), {
                text,
                eventName,
                eventYear
            });
            window.alert('Evento adicionado com sucesso!')
        } catch (err) {
            window.alert("Erro ao adicionar evento, tente novamente mais tarde");
        }
    };
}
