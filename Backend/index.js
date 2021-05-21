const { app, BrowserWindow } = require('electron')
const { exec } = require('child_process');
const path = require('path')
const electron = require('electron');
const ipc = electron.ipcMain;

let mainWindow;

app.whenReady().then(() => {
    //Add icon: __dirname + './Images/icon.png
    //When we have an icon
    mainWindow = new BrowserWindow({width: 1080, height: 720, frame: false, webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
    }});
    mainWindow.loadFile(`index.html`);
    
    //Dev tools
    mainWindow.webContents.openDevTools({mode: 'detach'});


    // CALLS PYTHON FILE HERE
    exec('python ./Backend/Main.py', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
    // 

    //ipc handler for js
    ipc.on('close', () => {
        console.log("Clicked close");
        mainWindow.close();
    })

    ipc.on('maximize', () => {
        console.log("Clicked maximize");
        if(mainWindow.isMaximized())
            mainWindow.unmaximize();
        else
            mainWindow.maximize();
    })

    ipc.on('minimize', () => {
        console.log("Clicked minimize");
        mainWindow.minimize();
    })

    ipc.on('settings', () => {
        console.log("Clicked settings");
    })

    mainWindow.on('closed', ()=>{
        mainWindow = null;
    })

})

