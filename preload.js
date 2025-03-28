const { contextBridge } = require('electron');
const { io } = require('socket.io-client');
const socket = io('http://localhost:4000');
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

const websocket = new WebSocket('ws://localhost:8080');

contextBridge.exposeInMainWorld('socket', {
    on: (event, callback) => socket.on(event, callback),  // Poprawiona funkcja nasłuchu
    emit: (event, data) => socket.emit(event, data)       // Opcjonalnie: wysyłanie eventów
});

contextBridge.exposeInMainWorld('ws', {
    addEventListener: (event, callback) => websocket.addEventListener(event, callback),
    on: (event, callback) => websocket.on(event, callback),
    send: (data) => websocket.send(data) // WebSocket używa `send()` zamiast `emit()`
});

contextBridge.exposeInMainWorld('fs', {
    readFileSync: (path) => fs.readFileSync(path, 'utf8'),  // Odczyt pliku synchronicznie
    readDirSync: (path) => fs.readdirSync(path),            // Odczyt katalogu synchronicznie
    writeFileSync: (path, data) => fs.writeFileSync(path, data),  // Zapis pliku synchronicznie
    existsSync: (path) => fs.existsSync(path)               // Sprawdzenie istnienia pliku
});
