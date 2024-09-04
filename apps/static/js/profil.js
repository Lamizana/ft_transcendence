async function loadProfil() {

    const searchplayer = await fetch(`/game/score/${id}/`)
    const data = await searchplayer.json()


    duelMyname = data.duelMyname
    duelEnemy = data.duelEnemy
    duelMe = data.duelMe
    duelThem = data.duelThem
    wins = data.wins
    loses = data.loses
    date = data.date

    const tournament = await fetch(`/game/tournament/${id}/`)
    const datatournament = await tournament.json()
    tourPos = datatournament.tourPos
    tourAll = datatournament.tourAll

    // add bootstrap css on django form
    var yo = document.getElementById("id_nickname")
    yo.classList += " form-control";
    var yo = document.getElementById("id_picture")
    yo.classList += " form-control";

    // find winrate (camembert chart) first number in wins
    if ((Number(wins) != 0 || Number(loses) != 0) && (Number(wins) || Number(loses))) {

        let totalGames = Number(wins) + Number(loses);

        let multiplier = (100 / totalGames);
        win = 3.6 * (Number(wins) * multiplier);
        lose = 3.6 * (Number(loses) * multiplier);

        var root = document.querySelector(':root');

        if (Number(wins) < Number(loses)) {
            tmp = win;
            win = lose;
            lose = win;
            root.style.setProperty('--color1', 'rgb(128, 0, 53)')
            root.style.setProperty('--color2', 'rgb(0, 174, 255)')
        } else {
            root.style.setProperty('--color1', 'rgb(0, 174, 255)')
            root.style.setProperty('--color2', 'rgb(128, 0, 53)')
        }

        root.style.setProperty('--win', win + 'deg')
        root.style.setProperty('--lose', lose + 'deg')

    } else {
        document.getElementById("camembert-dot").className = "no-data";
        document.getElementById("camembert-dot").innerHTML += '&#10060';
    }

    // creates html for 1 vs 1
    if (duelMyname && duelMyname.length > 0 && duelMyname != '[]' && duelEnemy != '[]' && duelMyname != 'None' && duelEnemy != 'None') {

        for (var i = 0; i < duelMyname.length; i++) {

            var box = document.createElement("div");
            box.id = "box";

            if (duelMe[i] > duelThem[i])
                box.classList.add('victory');
            else
                box.classList.add('defeat');

            const name1 = document.createElement("div");
            name1.classList.add('name1');

            if (duelMyname[i].length > 8)
                name1.appendChild(document.createTextNode(duelMyname[i].slice(0, 8) + "."));
            else 
                name1.appendChild(document.createTextNode(duelMyname[i]));

            const score = document.createElement("div");
            score.classList.add('score');
            score.appendChild(document.createTextNode(duelMe[i] + ' - ' + duelThem[i]));
            score.appendChild(document.createTextNode("   " + date[i]));

            const name2 = document.createElement("div");
            name2.classList.add('name2');
            if (duelEnemy[i].length > 8)
                name1.appendChild(document.createTextNode(duelEnemy[i].slice(0, 8) + ".")); 
            else 
                name2.appendChild(document.createTextNode(duelEnemy[i]));

            box.appendChild(name1);
            box.appendChild(score);
            box.appendChild(name2);
            document.getElementById("three").insertBefore(box, document.getElementById("box"))
        }

    } else {
        const text = document.createElement("div");
        text.classList.add('no-data');
        text.innerHTML += '&#10060';
        document.getElementById("three").appendChild(text);
    }


    // creates html for tournaments
    if (tourPos && tourPos.length > 0) {

        for (var i = 0; i < tourPos.length; i++) {

            var box = document.createElement("div");
            box.id = "box2";

            if (Number(Number(tourPos[i])) == 1)
                box.classList.add('top1');
            else if (Number(tourPos[i]) == 2)
                box.classList.add('top2');
            else if (Number(tourPos[i]) == 3)
                box.classList.add('top3');
            else if (Number(tourPos[i]) / Number(tourPos[i]) == 1)
                box.classList.add('veryBad');
            else if (Number(tourPos[i]) / Number(tourPos[i]) < 0.5)
                box.classList.add('mid');
            else
                box.classList.add('bad');

            const position = document.createElement("div");

            position.classList.add('position');
            position.appendChild(document.createTextNode(Number(tourPos[i])));

            const total = document.createElement("div");
            total.classList.add('total');
            total.appendChild(document.createTextNode('/ ' + Number(tourAll[i])));

            box.appendChild(position);
            box.appendChild(total);

            document.getElementById("two").appendChild(box);
        }

    } else {
        const text = document.createElement("div");
        text.classList.add('no-data');
        text.lang = 'en';
        text.innerHTML += '&#10060';
        document.getElementById("two").appendChild(text);
    }


    // camembert text
    const div = document.getElementById('result');
    const p = document.createElement('p');
    p.textContent = wins + ' W - ' + loses + ' L';
    div.appendChild(p);
}


// ickname image 
async function updateProfil() {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const nickname = document.getElementById('id_nickname').value;


    //pour gérer l'upload du fichier
    const formData = new FormData();

    // verif nickname n'est pasvide
    if (nickname) {
        formData.append('nickname', nickname);
    }

    const fileInput = document.querySelector('#id_picture');
    if (fileInput.files.length > 0) {
        formData.append('picture', fileInput.files[0]);
    }

    try {
        const response = await fetch(`/game/profil/${id}/`, {
            method: 'PUT',
            headers: {
                "X-CSRFToken": csrftoken,
            },
            body: formData,
            credentials: 'same-origin'
        });

        const data = await response.json();

        //console.log(response)
        if (response.ok) {
            // console.log('Profil mis à jour avec succès');
        } else {
            // console.log('Échec de la mise à jour du profil : ' + data.message);
        }
    } catch (error) {
        // console.error('Erreur:', error);
        // alert('Erreur lors de la mise à jour du profil.');
    }
}

function myForm(e) {
    // console.log("Bouton appuyé");
    e.preventDefault();
    updateProfil();
}



async function changePWD(e) {
    e.preventDefault();

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const oldPassword = document.getElementById('id_old_password').value;
    const newPassword1 = document.getElementById('id_new_password1').value;
    const newPassword2 = document.getElementById('id_new_password2').value;
    
    
    if (newPassword1 != newPassword2 || oldPassword.length < 8 || newPassword1.length < 8 || newPassword2.length < 8){
        
        //?make btn red
        var x = document.getElementById("btn_valider_profil1");
        x.classList += " btn-danger";
        var y = document.getElementById("btn_valider_profil2");
        y.classList += " btn-danger";
        var z = document.getElementById("btn_valider_profil3");
        z.classList += " btn-danger";
        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }
        delay(400).then(() => x.classList = "col-md-10 mb-3 btn btn-primary",  y.classList = "col-md-10 mb-3 btn btn-primary",  z.classList = "col-md-10 mb-3 btn btn-primary");
    }

    const response = await fetch('/change_password/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            old_password: oldPassword,
            new_password1: newPassword1,
            new_password2: newPassword2,
        }),
        credentials: 'same-origin'
    });
    // console.log(response)
    if (response.redirected == true){        
        document.getElementById('pong_link').click();
    }
};

