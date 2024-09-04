var id;
var nickname;
var email;
var wins;
var loses;
var tourPos;
var tourAll;
var duelMyname;
var duelEnemy;
var duelMe;
var duelThem;
var FriendsId;
var language = 'en';


async function getInfo() {

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const nicknamefetch = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
        }),
        credentials: "same-origin"
    }
    await fetch(`/base/`, nicknamefetch)


    const location = window.location.pathname; // get the url path
    const html = await fetch(location).then((response) => response.text());
    document.querySelector('html').innerHTML = html;


    var yo = document.querySelector('html');
    var scriptt = yo.getElementsByClassName('scipt_data')
    // console.log(scriptt[0].innerHTML)

    var newId = "";
    var i = 11;
    while ((scriptt[0].innerHTML[i]) != '\'') // loop to find id
    {
        newId += scriptt[0].innerHTML[i]
        i++;
    }
    id = newId

    i = scriptt[0].innerHTML.indexOf("language") + 4 + 8 + 1;
    // console.log(scriptt[0].innerHTML[i])

    if (scriptt[0].innerHTML[i] == 'R')
        language = 'fr'
    else if (scriptt[0].innerHTML[i] == 'S')
        language = 'es'
    else
        language = 'en'


    var newnick = "";

    i = scriptt[0].innerHTML.indexOf("nickname") + 4 + 8;
    while ((scriptt[0].innerHTML[i]) != '\'') // loop to find id
    {
        newnick += scriptt[0].innerHTML[i]
        i++;
    }
    nickname = newnick
    urlLocationHandler();
}



async function createnickName(e) {

    e.preventDefault();

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const nick = document.getElementById('id_nickname').value;
    const language = document.getElementById('id_language').value;

    const nickname = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
            nickname: nick,
            language: language,
        }),
        credentials: "same-origin"
    }
    var res = await fetch(`/new_profil/`, nickname)

    if (res.ok == true) {
        document.getElementById('pong_link').click();
        getInfo();
    }

}


async function createRegister(e) {

    e.preventDefault();

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const username = document.getElementById('id_username').value;
    const id_password1 = document.getElementById('id_password1').value;
    const id_password2 = document.getElementById('id_password2').value;

    if (id_password1 != id_password2 || id_password1.length < 8 || id_password2.length < 8 || username.length < 2) {

        //?make btn red
        var z = document.getElementById("btn_register3");
        var y = document.getElementById("btn_register2");
        var x = document.getElementById("btn_register1");
        x.classList += " btn-danger";
        y.classList += " btn-danger";
        z.classList += " btn-danger";
        // console.log(z)
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }
        delay(400).then(() => z.classList = "btn btn-primary", y.classList = "btn btn-primary", x.classList = "btn btn-primary");
    } else {



        const register = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
                username: username,
                password1: id_password1,
                password2: id_password2,
            }),
            credentials: "same-origin"
        }
        var yo = await fetch(`/register/`, register)
        document.getElementById('pong_link').click();

    }
}

async function createLogin(e) {
    e.preventDefault();

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const username = document.getElementById('id_username').value;
    const password = document.getElementById('id_password').value;


    const nickname = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        credentials: "same-origin"
    }
    var res = await fetch(`/login/`, nickname)
    // console.log(res)
    if (res.ok == true) {
        document.getElementById('pong_link').click();
    }

}
