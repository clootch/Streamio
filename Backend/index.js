const { app, BrowserWindow } = require('electron')
const { exec } = require('child_process');


const path = require('path')
const electron = require('electron');
const ipc = electron.ipcMain;

let mainWindow;

function createWindow () {
const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    contextIsolation: false,
    nodeIntegration: true
    }
})

win.loadFile('index.html')
win.webContents.openDevTools({mode: 'detach'});
}

app.whenReady().then(() => {
createWindow()


// CALLS PYTHON FILE HERE
exec('python ./Backend/Main.py', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});
// 

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
    }
})

ipc.on('click', () => {
    console.log("CLICKED!!!!");
})

})

app.on('window-all-closed', () => {
if (process.platform !== 'darwin') {
    app.quit()
}
})