import './admin.css';

import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore"

import { auth, provider } from '../utils/firebaseConnection.js';
import db from '../utils/firebaseConnection.js';


const whiteList = []

try {
    const q = query(
        collection(db, 'users'),
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        window.alert("Emails não encontrado");
    }

    querySnapshot.forEach((doc) => {
        const { email } = doc.data();
        whiteList.push(email);
    });
} catch (err) {
    window.alert("Erro ao encontrar evento, tente novamente mais tarde");
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuário já está logado
        if (whiteList.includes(user.email)) {
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

                if (whiteList.includes(user.email)) {
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
    const findButton = document.querySelector("#findButton");
    const deleteButton = document.querySelector("#deleteButton");
    const updateButton = document.querySelector("#updateButton");

    const updateButtonCurisity = document.querySelector("#updateButtonCurisity");
    const findButtonCurisity = document.querySelector("#findButtonCuriosity");

    const adminMailButton = document.querySelector("#adminMailButton");

    //Events listenners
    storeButton.addEventListener('click', (e) => storeBox(e))
    findButton.addEventListener('click', (e) => findBox(e))
    deleteButton.addEventListener('click', (e) => deleteBox(e))
    updateButton.addEventListener('click', (e) => updateBox(e))

    updateButtonCurisity.addEventListener('click', (e) => updateCuriosity(e));
    findButtonCurisity.addEventListener('click', (e) => findCuriosity(e));

    adminMailButton.addEventListener('click', (e) => handleAdminMail(e));

    /* is called when the admin clicks the add button function */
    // TODO: add snapshot
    const storeBox = async (e) => {
        e.preventDefault();
        const text = document.querySelector("#text").value;
        const eventName = document.querySelector("#eventName").value;
        const eventYear = parseInt(document.querySelector("#eventYear").value);

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

    const findBox = async (e) => {
        e.preventDefault();
        const search = document.querySelector("#search").value;

        try {
            const q = query(
                collection(db, 'posts'),
                where('eventName', '==', search)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                window.alert("Evento não encontrado");
                return;
            }

            querySnapshot.forEach((doc) => {
                const { text, eventName, eventYear } = doc.data();
                document.querySelector("#textUpdate").value = text;
                document.querySelector("#eventNameUpdate").value = eventName;
                document.querySelector("#eventYearUpdate").value = eventYear;
            });
        } catch (err) {
            window.alert("Erro ao encontrar evento, tente novamente mais tarde");
        }
    };

    const deleteBox = async (e) => {
        e.preventDefault();
        const search = document.querySelector("#search").value;

        try {
            const q = query(
                collection(db, 'posts'),
                where('eventName', '==', search),
            );

            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                window.alert("Nenhum evento encontrado com o nome pesquisado.");
                return;
            }

            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });

            window.alert('Evento deletado com sucesso!');
        } catch (err) {
            window.alert("Erro ao deletar evento, tente novamente mais tarde");
        }
    }

    const updateBox = async (e) => {
        e.preventDefault();
        const textUpdate = document.querySelector("#textUpdate").value;
        const eventNameUpdate = document.querySelector("#eventNameUpdate").value;
        const eventYearUpdate = parseInt(document.querySelector("#eventYearUpdate").value);
        const search = document.querySelector("#search").value;

        try {
            const q = query(
                collection(db, 'posts'),
                where('eventName', '==', search)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                window.alert("Evento não encontrado");
                return;
            }

            querySnapshot.forEach((doc) => {
                updateDoc(doc.ref, {
                    text: textUpdate,
                    eventName: eventNameUpdate,
                    eventYear: eventYearUpdate
                });
            });

            window.alert('Evento atualizado com sucesso!');
        } catch (err) {
            window.alert("Erro ao atualizar evento, tente novamente mais tarde");
        }
    };


    const findCuriosity = async (e) => {
        e.preventDefault();
        const search = document.querySelector("#searchCurisity").value;

        try {
            const q = query(
                collection(db, 'curiosidade'),
                where('titulo', '==', search)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                window.alert("Evento não encontrado");
                return;
            }

            querySnapshot.forEach((doc) => {
                const { titulo, texto } = doc.data();
                document.querySelector("#textCuriosity").value = texto;
                document.querySelector("#titleCuriosity").value = titulo;
            });
        } catch (err) {
            window.alert("Erro ao encontrar evento, tente novamente mais tarde");
        }
    }
    const updateCuriosity = async () => {
        const textCuriosity = document.querySelector("#textCuriosity").value;
        const titleCuriosity = document.querySelector("#titleCuriosity").value;
        const search = document.querySelector("#searchCurisity").value;

        try {
            const q = query(
                collection(db, 'curiosidade'),
                where('titulo', '==', search)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                window.alert("Evento não encontrado");
                return;
            }

            querySnapshot.forEach((doc) => {
                updateDoc(doc.ref, {
                    texto: textCuriosity,
                    titulo: titleCuriosity
                });
            });

            window.alert('Evento atualizado com sucesso!');
        } catch (err) {
            window.alert("Erro ao atualizar evento, tente novamente mais tarde");
        }
    }

    const handleAdminMail = async (e) => {
        e.preventDefault();
        const adminMail = document.querySelector("#adminMail").value;

        try {
            await addDoc(collection(db, "users"), {
                email: adminMail,
            });
            window.alert('Evento adicionado com sucesso!')
        } catch (err) {
            window.alert("Erro ao adicionar evento, tente novamente mais tarde");
        }
    }
}
