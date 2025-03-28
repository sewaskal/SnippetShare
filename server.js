const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const ip = require('ip');
const WebSocket = require('ws');


const port = 8080;

var address = "localhost";
// address = ip.address(); 


app.use(express.static('public'));


const server = http.createServer(app);
// const io = socketIo(server);
const io = new WebSocket.Server({ server });


io.on('connection', (socket) => {

    console.log('Nowy klient polaczony');

    // Odbieranie wiadomości od klienta
    socket.on('message', (data) => {
        console.log('Otrzymano wiadomosc od klienta: ', data);

        // Wysyłanie wiadomości do wszystkich klientów
        io.emit('newMessage', data);
    });

    // Obsługuje rozłączenie
    socket.on('close', () => {
        console.log('Klient rozlaczony');
    });
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Witaj w lokalnym serwerze!' });
});

server.listen(port, () => {
    console.log(`Serwer dziala na http://${address}:${port}`);
});