import './style.css'
let toggle = false;
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

/* Call this function to add events, first parameter: text, second parameter: event name, third parameted: year */
toggleBox("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Event 1", 1);
toggleBox("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Event 2", 2);
toggleBox("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Event 3", 3);


console.log(111232132)