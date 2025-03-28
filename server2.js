const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

console.log(wss.address());

wss.on('connection', ws => {
    console.log('Nowe połączenie!');

    ws.on('sendMessage', (data) => {
        console.log('Otrzymano wiadomosc od klienta:', data);
        // Wysyłanie wiadomości do wszystkich klientów
        io.emit('receiveMessage', data);
    });

    ws.on('close', () => console.log('Połączenie zamknięte'));
});