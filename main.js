const { app, BrowserWindow, icpMain } = require('electron');
const path = require('path');
const http = require('http');

const ip = require('ip');

const server = require(path.join(__dirname, 'server.js'));
const client = require(path.join(__dirname, 'client.js'));

app.whenReady().then(() => {
    const window = new BrowserWindow({
        width: 800,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        },
        icon: path.join(__dirname, 'img/icon.png'),

        // titleBarStyle: 'hidden',
        // frame: false,
        resizable: false
    });
    // window.loadFile('public/login.html');
    window.loadURL(`http://${"localhost"}:8080/`);
});

http.get(`http://${"localhost"}:8080/`, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Server response:\n', data); // Odpowiedź serwera
    });
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })