import './style.css'

import db from './utils/firebaseConnection.js'
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore"
let toggle = false;

/* Call this function to add events, first parameter: text, second parameter: 
event name, third parameted: year */
const toggleBox = (text, eventName, eventYear) => {
    const html = `
    <div class="timeline-item ">
            <div class="content ${toggle ? "right" : ""}">
                <h2>${eventName}</h2>
                <p>${text}</p>
            </div>
            <div class="timeline-icon">${eventYear}</div>
        </div>
    `


    const timeline = document.querySelector(".timeline");
    const element = document.createElement("div");
    element.innerHTML = html;
    timeline.appendChild(element);
    toggle = !toggle;
}

/* is called when the site is load, and should be responsabel
to get all events from databse */
const getBoxes = async () => {
    try {
        const q = query(collection(db, 'posts'), orderBy('eventYear', 'asc'))
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const { text, eventName, eventYear } = doc.data()
                toggleBox(text, eventName, eventYear)
            })
        }, [])
    } catch (err) {
        //TODO: exibir msg de erro
        console.log(err)
    }
}

getBoxes()
console.log(111232132)