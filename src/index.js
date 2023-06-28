import './style.css'
import 'bootstrap';

import video from '../src/assets/welcome.mp4';
import james from '../src/assets/removeme.mp4'

import db from './utils/firebaseConnection.js'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"

//Load Images
import img1 from '../src/assets/logo.png'
import img2 from '../src/assets/bilionarios.jpeg';
import img3 from '../src/assets/medico.jpeg';
import img4 from '../src/assets/ChatGPT_logo.svg.png';
import img5 from '../src/assets/LogoCopilotSemFundo.png';
import img6 from '../src/assets/StableDiffAltaSemFundo.png';
import img7 from '../src/assets/Synthesia.png';
import img8 from '../src/assets/logoICMCBranca.png'

import background from '../src/assets/5040007.jpg'

const welcome = document.querySelector('.welcome');
welcome.style.backgroundImage = `url(${background})`;

const imgs = document.querySelectorAll('img');
const imgsArray = Array.from(imgs);

const imageUrls = [img1, img8, img2, img3, img4, img5, img6, img7];

imgsArray.splice(4, 1); // Remove o quirto elemento do array

imgsArray.forEach((img, index) => {
    img.src = imageUrls[index];
});


const boxOpen = () => {
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            const oldClass = box.children[1].classList;
            if (oldClass.contains('show')) {
                box.children[1].classList.remove('show');
            } else {
                box.children[1].classList.add('show');
            }
        });
    });
};

let toggle = false;
/* Call this function to add events, first parameter: text, second parameter: 
event name, third parameted: year */
const toggleBox = (text, eventName, eventYear) => {
    const html = `
    <div class="timeline-item ">
            <div class="content box ${toggle ? "right" : ""}">
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
    toggle = !toggle
}

/* is called when the site is load, and should be responsabel
to get all events from databse */
const getBoxes = async () => {
    try {
        const q = query(collection(db, 'posts'), orderBy('eventYear', 'asc'));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const { text, eventName, eventYear } = doc.data();
                toggleBox(text, eventName, eventYear);
            });
            boxOpen()
        });
    } catch (err) {
        console.log(err);
    }
};

const handleVideo = () => {
    const button = document.querySelector('.js-animated-button');

    button.addEventListener('click', () => {
        const modalContainer = document.getElementById('modalContainer');

        const html = `
        <div id="modalContainer" class="d-flex align-items-center justify-content-center">
        <div class="video-container">
            <video id="myVideo" src="${video}" controls></video>
            <button class="close-button btn btn-light">Close</button>
        </div>
        </div>   
        `;

        modalContainer.innerHTML = html;
        modalContainer.classList.add('show');

        const closeButton = modalContainer.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            modalContainer.classList.remove('show');
        });
    });
}

const handleOurVideo = () => {
    const videoContainer = document.querySelector('.video-nosso-container')

    const html = `
    <video src="${james}" autoplay controls></video>
    `

    videoContainer.innerHTML = html
}

const buttonListennier = () => {
    document.addEventListener('DOMContentLoaded', function () {
        const scrollToTopBtn = document.querySelector('.scroll-to-top');

        // Exibir ou ocultar o botão de rolagem ao rolar a página
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 100) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        // Rolar para o topo ao clicar no botão
        scrollToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const scrollDuration = 800;
            const scrollStep = -window.scrollY / (scrollDuration / 15);

            const scrollInterval = setInterval(function () {
                if (window.scrollY !== 0) {
                    window.scrollBy(0, scrollStep);
                } else {
                    clearInterval(scrollInterval);
                }
            }, 15);
        });
    });
}

const handlePerson = () => {
    const newImgButton = document.querySelector('#gerarNovaImagem');

    newImgButton.addEventListener('click', () => {
        const img = document.querySelector('#person');

        if (img) {
            const randomNumber = Math.floor(Math.random() * 1000000); // Gera um número aleatório entre 0 e 999999
            const imageUrl = `https://thispersondoesnotexist.com/?random=${randomNumber}`;

            const newImg = document.createElement('img');
            newImg.src = imageUrl;
            newImg.id = 'person'
            newImg.alt = "Essa pessoa não existe";

            img.parentNode.replaceChild(newImg, img);
        }
    });
};

const sotreCuriosity = (titulo, texto, c) => {
    const curiosityjs = document.querySelector(`.curiostiyjs-${c}`);
    const html = `
                <h1>${titulo}</h1>
                <p>${texto}</p>
                `

    curiosityjs.innerHTML = html;
}

const handleCuriosity = () => {
    let c = 0
    try {
        const q = query(collection(db, 'curiosidade'));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const { texto, titulo } = doc.data();
                c++
                sotreCuriosity(titulo, texto, c);
            });
        });
    } catch (err) {
        console.log(err);
    }
}

buttonListennier()
handleVideo()
getBoxes()
handlePerson()
handleOurVideo()
handleCuriosity()
