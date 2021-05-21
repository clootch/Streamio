const electron = require('electron');
const ipc = electron.ipcRenderer;


closeButton.addEventListener('click', () => {
    ipc.send('close');
})

maximizeButton.addEventListener('click', () => {
    ipc.send('maximize');
})

minimizeButton.addEventListener('click', () => {
    ipc.send('minimize');
})

settingsButton.addEventListener('click', () => {
    ipc.send('settings');
    if(settingsMenu.style.visibility == "visible")
        settingsMenu.style.visibility = "hidden";
    else
        settingsMenu.style.visibility = "visible";
})