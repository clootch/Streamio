const electron = require('electron');
const ipc = electron.ipcRenderer;

but.addEventListener('click', () => {
    ipc.send('click');
});