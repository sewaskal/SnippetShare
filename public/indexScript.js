let chat = document.getElementById('chat');
let serverStatusMenu = document.getElementById('serverStatus');
let serverStatusVisible = true;

class Message {
    constructor(sender, content) {
        this.sender = sender;
        this.content = content;
    }

    CreateMessage() {
        let date = new Date();

        let n = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

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
        time.innerHTML = date.toLocaleTimeString();
        time.className = 'time';

        // header.appendChild(subj);
        // header.appendChild(copyBtn);
        header.appendChild(time);

        let content = document.createElement('p');
        content.id = 'content';
        content.innerText = this.content;

        message.appendChild(header);
        message.appendChild(content);

        return message;
    }
}

function Exit() {
    window.close();
}

function SendClientMessage() {
    let sender = "";
    if (!window.fs.existsSync('test.txt'))
        sender = document.getElementById('username').value;
    else
        sender = window.fs.readFileSync('username.txt', 'utf8');

    let message = document.getElementById('userInput');

    window.fs.writeFileSync('username.txt', document.getElementById('username').value, err => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
    });

    if (message.value.length <= 0) {
        console.log('Nie możesz wysłać pustej wiadomości!');
        return;
    }

    if (sender.length <= 0) {
        console.log('Musisz podać swój nick!');
        if (!serverStatusVisible)
            ToggleUserMenu();

        return;
    }

    //      ==============
    let date = new Date();

    let n = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    let messageDiv = document.createElement('div');
    messageDiv.className = 'message';

    let header = document.createElement('p');
    header.id = 'header';
    header.innerText = sender;

    let subj = document.createElement('span');
    let copyBtn = document.createElement('button');
    let time = document.createElement('span');

    subj.innerHTML = "Code";
    copyBtn.innerHTML = "Kopiuj";
    time.innerHTML = date.toLocaleTimeString();
    time.className = 'time';

    // header.appendChild(subj);
    // header.appendChild(copyBtn);
    header.appendChild(time);

    let content = document.createElement('p');
    content.id = 'content';

    if (message.value == ":troll:")     // https://emojicombos.com/dot-ascii-art
        content.innerHTML = "⠀⠀⠀⠀⠀⠀⢀⣤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⢤⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⢀⡼⠋⠀⣀⠄⡂⠍⣀⣒⣒⠂⠀⠬⠤⠤⠬⠍⠉⠝⠲⣄⡀⠀⠀\n⠀⠀⠀⢀⡾⠁⠀⠊⢔⠕⠈⣀⣀⡀⠈⠆⠀⠀⠀⡍⠁⠀⠁⢂⠀⠈⣷⠀⠀\n⠀⠀⣠⣾⠥⠀⠀⣠⢠⣞⣿⣿⣿⣉⠳⣄⠀⠀⣀⣤⣶⣶⣶⡄⠀⠀⣘⢦⡀\n⢀⡞⡍⣠⠞⢋⡛⠶⠤⣤⠴⠚⠀⠈⠙⠁⠀⠀⢹⡏⠁⠀⣀⣠⠤⢤⡕⠱⣷\n⠘⡇⠇⣯⠤⢾⡙⠲⢤⣀⡀⠤⠀⢲⡖⣂⣀⠀⠀⢙⣶⣄⠈⠉⣸⡄⠠⣠⡿\n⠀⠹⣜⡪⠀⠈⢷⣦⣬⣏⠉⠛⠲⣮⣧⣁⣀⣀⠶⠞⢁⣀⣨⢶⢿⣧⠉⡼⠁\n⠀⠀⠈⢷⡀⠀⠀⠳⣌⡟⠻⠷⣶⣧⣀⣀⣹⣉⣉⣿⣉⣉⣇⣼⣾⣿⠀⡇⠀\n⠀⠀⠀⠈⢳⡄⠀⠀⠘⠳⣄⡀⡼⠈⠉⠛⡿⠿⠿⡿⠿⣿⢿⣿⣿⡇⠀⡇⠀\n⠀⠀⠀⠀⠀⠙⢦⣕⠠⣒⠌⡙⠓⠶⠤⣤⣧⣀⣸⣇⣴⣧⠾⠾⠋⠀⠀⡇⠀\n⠀⠀⠀⠀⠀⠀⠀⠈⠙⠶⣭⣒⠩⠖⢠⣤⠄⠀⠀⠀⠀⠀⠠⠔⠁⡰⠀⣧⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠲⢤⣀⣀⠉⠉⠀⠀⠀⠀⠀⠁⠀⣠⠏⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠛⠒⠲⠶⠤⠴⠒⠚⠁⠀⠀"
    else
        content.innerText = message.value;

    messageDiv.appendChild(header);
    messageDiv.appendChild(content);
//      ==============


    window.socket.emit('sendMessage', {
        sender: sender,
        content: content.innerText,
        time: new Date().toLocaleTimeString()
    });

    message.value = '';
    chat.scrollIntoView();
}

window.socket.on('receiveMessage', (data) => {
    let newMessage = new Message(data.sender, data.content).CreateMessage();
    chat.appendChild(newMessage);
    newMessage.scrollIntoView();
});

window.socket.on('connected', (socket) => {
    let newMessage = new Message("System", "Host się połączył 🔥").CreateMessage();
    chat.appendChild(newMessage);
    chat.scrollIntoView();
});

window.socket.on('disconnect', () => {
    let newMessage = new Message("System", "Host się rozłączył").CreateMessage();
    chat.appendChild(newMessage);
    chat.scrollIntoView();
});

function ToggleUserMenu() {
    serverStatusVisible = !serverStatusVisible;

    if (serverStatusVisible) {
        serverStatusMenu.style.display = 'block';
    } else {
        serverStatusMenu.style.display = 'none';
    }
}
