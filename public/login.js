// const os = require('os');
// const path = require('path');
// const fs = require('fs');
// const tmp = require('tmp');

// const tempDir = os.tmpdir();
// const tempFile = path.join(tempDir, 'test/temp.txt');

const konta = [
    sewaskal = {
        login: "raiden",
        username: "Sewaskal",
        pass: ""
    },
    rudy = {
        login: "rudy",
        username: "Dareg Viggo",
        pass: ""
    },
    henryk = {
        login: "henryk",
        username: "Henryk Materson",
        pass: ""
    },
    baldMan = {
        login: "łysy",
        username: "jebać cwela lysego rudego",
        pass: ""
    }
]


function Login()
{
    let nazwa = document.getElementById('loginInput').value;
    let haslo = document.getElementById('passwordInput').value;

    CheckUser({nazwa, haslo});
}

function CheckUser(data)
{
    konta.forEach(element => {
        if (data.nazwa == element.login && data.haslo == element.pass)
        {
            console.log("gud");
            window.fs.writeFileSync('username.txt', element.username)
            document.getElementById('status').innerHTML = "Przenoszenie na główną stronę...";
            document.getElementById('status').style.color = 'green';
            window.location.href = 'http://localhost:4000/';
        }
    });
}