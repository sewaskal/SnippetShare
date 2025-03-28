const WebSocket = require('ws');
const readline = require('readline')

const ws = new WebSocket('ws://localhost:8080'); // IP serwera w sieci

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

ws.on('open', () => {
    console.log('Połączono!');
    ws.emit('message', "Łazap");
});

ws.on('message', message => {
    console.log(`Serwer powiedział: ${message}`);
});