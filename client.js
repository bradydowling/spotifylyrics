var ipcRenderer = require("electron").ipcRenderer;

var infoSection = document.getElementById("info");
infoSection.textContent = "Loading...";

ipcRenderer.on("lyrics", (event, data) => {
    infoSection.innerHTML = data;
});