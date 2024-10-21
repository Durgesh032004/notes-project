const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const clearBtn = document.querySelector(".clear-btn");
const searchBox = document.querySelector(".search-box");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    addEventListenersToNotes();
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function addEventListenersToNotes() {
    let notes = document.querySelectorAll(".input-box");
    notes.forEach(note => {
        const deleteBtn = note.querySelector("img");
        deleteBtn.addEventListener("click", function () {
            note.remove();
            updateStorage();
        });

        note.onkeyup = function () {
            updateStorage();
        };

        document.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                document.execCommand("insertLineBreak");
                event.preventDefault();
            }
        });
    });
}

createBtn.addEventListener("click", () => {
    let note = document.createElement("div");
    note.className = "input-box";
    note.setAttribute("contenteditable", "true");

    let noteHeader = document.createElement("div");
    noteHeader.className = "note-header";

    let title = document.createElement("input");
    title.className = "note-title";
    title.setAttribute("placeholder", "Title...");

    let img = document.createElement("img");
    img.src = "images/delete.png";

    let colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.className = "color-picker";

    let timestamp = document.createElement("div");
    timestamp.className = "timestamp";
    let date = new Date().toLocaleString();
    timestamp.textContent = `Created: ${date}`;

    noteHeader.appendChild(title);
    noteHeader.appendChild(colorPicker);
    noteHeader.appendChild(img);
    note.appendChild(noteHeader);
    note.appendChild(timestamp);

    notesContainer.appendChild(note);

    addEventListenersToNotes();
    updateStorage();
});

// Clear all notes
clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all notes?")) {
        notesContainer.innerHTML = "";
        updateStorage();
    }
});

// Search notes
searchBox.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const notes = document.querySelectorAll(".input-box");

    notes.forEach(note => {
        const title = note.querySelector(".note-title").value.toLowerCase();
        if (title.includes(query)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
});

// Update color of the note background
notesContainer.addEventListener("input", function (e) {
    if (e.target.classList.contains("color-picker")) {
        const note = e.target.closest(".input-box");
        note.style.backgroundColor = e.target.value;
        updateStorage();
    }
});
