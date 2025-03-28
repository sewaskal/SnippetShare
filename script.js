let chat = document.getElementById('chat');
let serverStatusMenu = document.getElementById('serverStatus');
let serverStatusVisible = false;

const io = require('socket.io');

const socket = io();

function Exit()
{
    window.close();
}

function SendClientMessage()
{
    let sender = "Jane Doe";
    let message = document.getElementById('userInput');

    if (message.value.length <= 0)
    {return;}

    let newMessage = new Message(sender, message.value).CreateMessage();
    chat.appendChild(newMessage);

    socket.emit('sendMessage', {
        sender: sender,
        content: message.value,
        time: new Date().toLocaleTimeString()
    });

    message.value = '';
    chat.scrollIntoView();
}

class Message
{
    constructor(sender, content)
    {
        this.sender = sender;
        this.content = content;
    }

    CreateMessage()
    {
        let date = new Date();

        let message = document.createElement('div');
        message.className = 'message';

        let header = document.createElement('p');
        header.id = 'header';
        header.innerText = this.sender;

        let subj = document.createElement('span');
        let copyBtn = document.createElement('button');
        let time = document.createElement('span');

        subj.innerHTML = "Code";
        copyBtn.innerHTML = "Kopiuj";
        time.innerHTML = date.getHours("00") + ":" + date.getMinutes("00");
        time.className = 'time';

        header.appendChild(subj);
        header.appendChild(copyBtn);
        header.appendChild(time);

        let content = document.createElement('p');
        content.id = 'content';
        content.innerText = this.content;

        message.appendChild(header);
        message.appendChild(content);

        return message;
    }
}

socket.on('receiveMessage', (data) => {
    let newMessage = new Message(data.sender, data.content).CreateMessage();
    chat.appendChild(newMessage);
    chat.scrollIntoView();
});

function ToggleServerStatusMenu()
{
    serverStatusVisible = !serverStatusVisible;

    if (serverStatusVisible)
    {
        serverStatusMenu.style.display = 'block';
    }
    else
    {
        serverStatusMenu.style.display = 'none';
    }
}