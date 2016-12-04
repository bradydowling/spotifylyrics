var ipcRenderer = require("electron").ipcRenderer;

var lyricSection = document.getElementById("lyrics");
lyricSection.textContent = "Loading...";

ipcRenderer.on("lyrics", (event, songDetails) => {
    lyricSection.innerHTML = songDetails.lyrics;
    document.getElementById("artist").textContent = songDetails.artist;
    document.getElementById("title").textContent = songDetails.title;
});