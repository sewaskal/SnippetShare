let chat = document.getElementById('chat');
let serverStatusMenu = document.getElementById('serverStatus');
let serverStatusVisible = true;

// content.innerHTML = "⠀⠀⠀⠀⠀⠀⢀⣤⠤⠤⠤⠤⠤⠤⠤⠤⠤⠤⢤⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⢀⡼⠋⠀⣀⠄⡂⠍⣀⣒⣒⠂⠀⠬⠤⠤⠬⠍⠉⠝⠲⣄⡀⠀⠀\n⠀⠀⠀⢀⡾⠁⠀⠊⢔⠕⠈⣀⣀⡀⠈⠆⠀⠀⠀⡍⠁⠀⠁⢂⠀⠈⣷⠀⠀\n⠀⠀⣠⣾⠥⠀⠀⣠⢠⣞⣿⣿⣿⣉⠳⣄⠀⠀⣀⣤⣶⣶⣶⡄⠀⠀⣘⢦⡀\n⢀⡞⡍⣠⠞⢋⡛⠶⠤⣤⠴⠚⠀⠈⠙⠁⠀⠀⢹⡏⠁⠀⣀⣠⠤⢤⡕⠱⣷\n⠘⡇⠇⣯⠤⢾⡙⠲⢤⣀⡀⠤⠀⢲⡖⣂⣀⠀⠀⢙⣶⣄⠈⠉⣸⡄⠠⣠⡿\n⠀⠹⣜⡪⠀⠈⢷⣦⣬⣏⠉⠛⠲⣮⣧⣁⣀⣀⠶⠞⢁⣀⣨⢶⢿⣧⠉⡼⠁\n⠀⠀⠈⢷⡀⠀⠀⠳⣌⡟⠻⠷⣶⣧⣀⣀⣹⣉⣉⣿⣉⣉⣇⣼⣾⣿⠀⡇⠀\n⠀⠀⠀⠈⢳⡄⠀⠀⠘⠳⣄⡀⡼⠈⠉⠛⡿⠿⠿⡿⠿⣿⢿⣿⣿⡇⠀⡇⠀\n⠀⠀⠀⠀⠀⠙⢦⣕⠠⣒⠌⡙⠓⠶⠤⣤⣧⣀⣸⣇⣴⣧⠾⠾⠋⠀⠀⡇⠀\n⠀⠀⠀⠀⠀⠀⠀⠈⠙⠶⣭⣒⠩⠖⢠⣤⠄⠀⠀⠀⠀⠀⠠⠔⠁⡰⠀⣧⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠲⢤⣀⣀⠉⠉⠀⠀⠀⠀⠀⠁⠀⣠⠏⠀\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠛⠒⠲⠶⠤⠴⠒⠚⠁⠀⠀"


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

    if (message.value.length <= 0) {
        console.log('Nie możesz wysłać pustej wiadomości!');
        return;
    }

    if (sender.length <= 0) {
        console.log('Musisz podać swój nick!');
        if (!serverStatusVisible) ToggleUserMenu();
        return;
    }

    let contentText = (message.value == ":troll:")
        ? "⠀⠀⠀⠀⠀⠀⢀⣤⠤⠤⠤⠤⠤⠤⠤⠤⠤⢤⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀\n..."
        : message.value;

    // 1️⃣ Tworzymy wiadomość lokalnie
    let newMessage = new Message(sender, contentText).CreateMessage();
    chat.appendChild(newMessage);
    newMessage.scrollIntoView();

    // 2️⃣ Wysyłamy wiadomość do serwera
    window.ws.send(JSON.stringify({
        sender: sender,
        content: contentText,
        time: new Date().toLocaleTimeString()}
    ));

    console.log(`Wiadomość wysłana: ${contentText}`);

    message.value = '';
}


window.ws.addEventListener('newMessage', event => {
    let data = JSON.parse(event.data);
    let newMessage = new Message(data.sender, data.content).CreateMessage();
    chat.appendChild(newMessage);
    newMessage.scrollIntoView();
});

// window.ws.addEventListener('open', () => {
//     let newMessage = new Message("System", "Host się połączył 🔥").CreateMessage();
//     chat.appendChild(newMessage);
//     chat.scrollIntoView();
// });

// window.ws.addEventListener('close', () => {
//     let newMessage = new Message("System", "Host się rozłączył").CreateMessage();
//     chat.appendChild(newMessage);
//     chat.scrollIntoView();
// });

function ToggleUserMenu() {
    serverStatusVisible = !serverStatusVisible;

    if (serverStatusVisible) {
        serverStatusMenu.style.display = 'block';
    } else {
        serverStatusMenu.style.display = 'none';
    }
}
