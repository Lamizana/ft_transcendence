function loadTournament() {


    function pongTournament(p1name, p2name, p3name, p4name, player) {

        var mainPlayer = p1name;
        var presskeylanguage;
        var wait1;
        var wait2;
        var waitingNextGame;

        if (language == "fr" || language == "FR") {
            presskeylanguage = "Appuyez sur une touche"
            wait1 = "En attente du joueur 1"
            wait2 = "En attente du joueur 2"
            waitingNextGame = "Fin du match"

        } else if (language == "es" || language == "ES") {
            presskeylanguage = "Presione cualquier tecla para comenzar"
            wait1 = "Esperando al jugador 1"
            wait2 = "Esperando al jugador 2"
            waitingNextGame = "Fin del partido"

        } else if (language == "en" || language == "EN") {
            presskeylanguage = "Press any key to begin"
            wait1 = "Waiting for player 1"
            wait2 = "Waiting for player 2"
            waitingNextGame = "Match over"
        }


        var gamenumber = 0;
        if (gamenumber == 0) {

            var btns = document.createElement("div");
            btns.id = "btn"
            document.getElementById("btns").appendChild(btns);
            var left1 = document.createElement("button");
            var right1 = document.createElement("button");
            left1.id = 'left1'
            left1.classList = "btn btn-success"
            right1.id = 'right1'
            right1.classList = "btn btn-success"
            left1.innerHTML = '<'
            right1.innerHTML = '>'
            btns.appendChild(left1);
            btns.appendChild(right1);


            var left2 = document.createElement("button");
            var right2 = document.createElement("button");
            left2.id = 'left2'
            right2.id = 'right2'
            left2.classList = "btn btn-success"
            right2.classList = "btn btn-success"
            left2.innerHTML = '<'
            right2.innerHTML = '>'
            btns.appendChild(left2);
            btns.appendChild(right2);
        }

        var Game = {

            initialize: function () {
                this.canvas = document.querySelector('canvas');

                // if (window.location.pathname == '/pong/') {
                    this.context = this.canvas.getContext('2d');
                    // Gestion de la taille du pong en fonction de la taille de lecran:
                    if (window.innerWidth <= 320)
                    {
                        this.canvas.width  = 600;
                        this.canvas.height = 428;
                    }
                    else if (window.innerWidth <= 375 && window.innerWidth > 320)
                    {
                        this.canvas.width  = 700 ;
                        this.canvas.height = 500;
                    }
                    else if (window.innerWidth <= 500 && window.innerWidth > 375)
                    {
                        this.canvas.width  = 800;
                        this.canvas.height = 571;
                    }
                    else if (window.innerWidth <= 1430 && window.innerWidth > 500)
                    {
                        this.canvas.width  = 1000;
                        this.canvas.height = 714;
                    }
                    else if (window.innerWidth >= 1440)
                    {
                        this.canvas.width  = 1400;
                        this.canvas.height = 1000;
                    }
                    else
                    {
                        this.canvas.width  = window.innerWidth;
                        this.canvas.height = window.innerHeight;
                    }

                    this.canvas.style.width = (this.canvas.width / 2) + 'px';
                    this.canvas.style.height = (this.canvas.height / 2) + 'px';
                    this.player = Paddle.new.call(this, "left", 150 * this.canvas.width / 1400, (this.canvas.height / 2) - 35, 18 * this.canvas.width / 1400, 180 * this.canvas.height / 1000);
                    this.opponent = Paddle.new.call(this, "Player2", this.canvas.width - (150 * this.canvas.width / 1400), (this.canvas.height / 2) - (35 * this.canvas.height / 1000), 18 * this.canvas.width / 1400, 180 * this.canvas.height / 1000);
                    this.ball = Ball.new.call(this);
                    this.running = this.over = false;
                    this.turn = this.opponent;
                    this.timer = this.round = 0;
                    this.color = '#888888';
                    // console.log("start")

                    
                    if (gamenumber == 1) {
                        p1name = p3name
                        p2name = p4name
                        var names = p1name + " VS " + p2name
                        document.querySelectorAll("h1").forEach(function (item) {
                            item.textContent = names;
                        });
                    }

                    if (gamenumber == 2) {
                        var names = winner1 + " VS " + winner2
                        document.querySelectorAll("h1").forEach(function (item) {
                            item.textContent = names;
                        });
                    }
                    gamenumber++;

                    Pong.menu();
                    Pong.listen();

            },

            newgame: function () {
                // console.log(this.over)
                if (this.over != 2) {
                    Pong = Object.assign({}, Game);
                    Pong.initialize();
                }
            },

            endGameMenu: function (text) {
                Pong.context.font = '45px Courier New';
                Pong.context.fillStyle = this.color;
                Pong.context.fillRect(
                    (Pong.canvas.width / 2 - 350 * this.canvas.height / 1000),
                    (Pong.canvas.height / 2 - 48 * this.canvas.height / 1000),
                    700 * this.canvas.height / 1000,
                    100 * this.canvas.height / 1000
                );
                Pong.context.fillStyle = '#ffffff';
                Pong.context.fillText(text,
                    (Pong.canvas.width / 2),
                    (Pong.canvas.height / 2 + 15),
                    this.canvas.width - (300 * this.canvas.height / 1000)
                );
                setTimeout(function () {
                    Pong.newgame();
                }, 3000);
            },

    

            menu: function () {
                Pong.draw();
                this.context.font = '50px Courier New';
                this.context.fillStyle = this.color;
                this.context.fillRect(
                    (this.canvas.width / 2 - 350 * this.canvas.height / 1000),
                    (this.canvas.height / 2 - 48 * this.canvas.height / 1000),
                    700 * this.canvas.height / 1000,
                    100 * this.canvas.height / 1000
                );
                this.context.fillStyle = '#ffffff';

                if (Pong.player.playerState === 0 && Pong.opponent.playerState === 0)
                    this.context.fillText(presskeylanguage,
                        (this.canvas.width / 2),
                        (this.canvas.height / 2 + 15),
                        this.canvas.width - (400 * this.canvas.height / 1000)
                    );
                else if (Pong.player.playerState === 0 && Pong.opponent.playerState === 1)
                    this.context.fillText(wait1,
                        (this.canvas.width / 2),
                        (this.canvas.height / 2 + 15),
                        this.canvas.width - (400 * this.canvas.height / 1000)
                    );
                else if (Pong.player.playerState === 1 && Pong.opponent.playerState === 0)
                    this.context.fillText(wait2,
                        (this.canvas.width / 2),
                        (this.canvas.height / 2 + 15),
                        this.canvas.width - (400 * this.canvas.height / 1000)
                    );
            },

            // Update all objects (move the player, opponent, ball, increment the score, etc.)
            update: function () {
                if (!this.over) {
                    if (this.ball.x <= 0) Pong._resetTurn.call(this, this.opponent, this.player);
                    if (this.ball.x >= this.canvas.width - this.ball.width) Pong._resetTurn.call(this, this.player, this.opponent);


                    if (this.ball.y <= 0) this.ball.speedy *= -1;
                    if (this.ball.y >= this.canvas.height - this.ball.height) this.ball.speedy *= -1;

                    this.ball.x += this.ball.speed;
                    this.ball.y += this.ball.speedy;
                    this.player.y += this.player.speed;
                    this.opponent.y += this.opponent.speed;
                    // On new serve (start of each turn) move the ball to the correct side
                    // and randomize the direction to add some challenge.
                    if (Pong._turnDelayIsOver.call(this) && this.turn) {
                        if (this.turn === this.player)
                            this.ball.speed = (-7 * this.canvas.height / 1000);
                        else
                            this.ball.speed = (7 * this.canvas.height / 1000);
                        this.ball.speedy = 0;
                        this.ball.x = (this.canvas.width / 2) - 9,
                            this.ball.y = (this.canvas.height / 2) - 9,
                            this.turn = null;
                    }

                    // If the player collides with the bound limits, update the x and y coords.
                    if (this.player.y <= 0) this.player.y = 0;
                    else if (this.player.y >= (this.canvas.height - this.player.height)) this.player.y = (this.canvas.height - this.player.height);



                    // Handle opponent (AI) wall collision
                    if (this.opponent.y >= this.canvas.height - this.opponent.height) this.opponent.y = this.canvas.height - this.opponent.height;
                    else if (this.opponent.y <= 0) this.opponent.y = 0;

                    if (this.ball.x - this.ball.width <= this.player.x && this.ball.x >= this.player.x - this.player.width) {
                        if (this.ball.y <= this.player.y + this.player.height && this.ball.y + this.ball.height >= this.player.y) {

                            this.ball.speedy = (-(this.player.y - this.ball.y + (this.player.height / 2)) / 10);

                            this.ball.speed = (12 ** 2) - ((this.ball.speedy) ** 2);
                            this.ball.speedy = this.ball.speedy * (this.canvas.height / 1000);
                            if (this.ball.speed < 0)
                                this.ball.speed = Math.sqrt(-this.ball.speed) * (this.canvas.height / 1000);
                            else
                                this.ball.speed = Math.sqrt(this.ball.speed) * (this.canvas.height / 1000);
                        }
                    }
                    if (this.ball.x - this.ball.width <= this.opponent.x && this.ball.x >= this.opponent.x - this.opponent.width) {
                        if (this.ball.y <= this.opponent.y + this.opponent.height && this.ball.y + this.ball.height >= this.opponent.y) {

                            this.ball.speedy = (-(this.opponent.y - this.ball.y + (this.opponent.height / 2)) / 10);

                            this.ball.speed = (12 ** 2) - ((this.ball.speedy) ** 2);
                            this.ball.speedy = this.ball.speedy * (this.canvas.height / 1000);
                            if (this.ball.speed < 0)
                                this.ball.speed = -Math.sqrt(-this.ball.speed) * (this.canvas.height / 1000);
                            else
                                this.ball.speed = -Math.sqrt(this.ball.speed) * (this.canvas.height / 1000);
                        }
                    }
                }

                // Handle the end of round transition
                // Check to see if the player won the round.
                if (this.player.score === 3 || this.opponent.score === 3) {
                    endgame(this.player.score, this.opponent.score, p1name, p2name, gamenumber, mainPlayer, player)
                    this.over = true;
                    setTimeout(function () { Pong.endGameMenu(waitingNextGame); }, 1000);
                    return;
                }
            },

            // Draw the objects to the canvas element
            draw: function () {
                // Clear the Canvas
                this.context.clearRect(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                );

                // Set the fill style to black
                this.context.fillStyle = this.color;

                // Draw the background
                this.context.fillRect(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                );

                // Set the fill style to white (For the paddles and the ball)
                this.context.fillStyle = '#ffffff';

                // Draw the Player
                this.context.fillRect(
                    this.player.x,
                    this.player.y,
                    this.player.width,
                    this.player.height
                );

                // Draw the opponent
                this.context.fillRect(
                    this.opponent.x,
                    this.opponent.y,
                    this.opponent.width,
                    this.opponent.height
                );

                // Draw the Ball
                if (Pong._turnDelayIsOver.call(this)) {
                    this.context.fillRect(
                        this.ball.x,
                        this.ball.y,
                        this.ball.width,
                        this.ball.height
                    );
                }

                // Draw the net (Line in the middle)
                this.context.beginPath();
                this.context.setLineDash([7, 15]);
                this.context.moveTo((this.canvas.width / 2), this.canvas.height - 140);
                this.context.lineTo((this.canvas.width / 2), 140);
                this.context.lineWidth = 10;
                this.context.strokeStyle = '#ffffff';
                this.context.stroke();

                // Set the default canvas font and align it to the center
                this.context.font = '50px Courier New';
                this.context.textAlign = 'center';
                this.context.fillText(
                    this.player.score.toString(),
                    (this.canvas.width / 2) - 300 * this.canvas.height / 1000,
                    200 * this.canvas.height / 1000
                );
                this.context.fillText(
                    this.opponent.score.toString(),
                    (this.canvas.width / 2) + 300 * this.canvas.height / 1000,
                    200 * this.canvas.height / 1000
                );

                // Change the font size for the center score text
                this.context.font = '30px Courier New';

                // Draw the winning score (center)
                this.context.fillText(

                    "",
                    (this.canvas.width / 2),
                    35
                );

                // Change the font size for the center score value
                this.context.font = '40px Courier';

                // Draw the current round number
                this.context.fillText(
                    "",
                    (this.canvas.width / 2),
                    100
                );
            },

            loop: function () {
                Pong.update();
                Pong.draw();
                if (!Pong.over) requestAnimationFrame(Pong.loop);
            },

            listen: function () {


                document.addEventListener("click", (e) => {
                    const { target } = e;
                    if (!target.matches("a")) {
                        return;
                    }
                    Pong.over = 1;
                });


                //--------------------------------------------------------------------------------------------------------

                var mousedownID = undefined;
                
                window.oncontextmenu = function() {
                    if (event.button != 2 && !(event.clientX == event.clientY == 1)) {
                        event.preventDefault();
                    }
                }

                function mousedownl1() {
                    if (Pong.running === false) {
                        Pong.player.playerState = 1;
                        if (Pong.opponent.playerState == 1) {
                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);
                        Pong.player.speed = (-8 * Pong.canvas.height / 1000);
                        }
                    }
                    else { Pong.player.speed = (-8 * Pong.canvas.height / 1000); }
                }
                left1.addEventListener("mousedown", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl1, 20);});
                left1.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.player.speed = 0;
                });
                left1.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl1, 20); });
                left1.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.player.speed = 0;
                });


                function mousedownl2() {
                    if (Pong.running === false) {
                        Pong.player.playerState = 1;
                        if (Pong.opponent.playerState == 1)
                        {
                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);
                        Pong.player.speed = (8 * Pong.canvas.height / 1000);
                        }

                    }
                    else { Pong.player.speed = (8 * Pong.canvas.height / 1000); }
                }
                right1.addEventListener("mousedown", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl2, 20); });
                right1.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.player.speed = 0;
                });
                right1.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl2, 20); });
                right1.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.player.speed = 0;
                });


                    function mousedownl3() {
                        if (Pong.running === false) {
                            Pong.opponent.playerState = 1;
                            if (Pong.player.playerState == 1)
                            {
                            Pong.running = true;
                            window.requestAnimationFrame(Pong.loop);
                            Pong.opponent.speed = (-8 * Pong.canvas.height / 1000);
                            }
                        }
                        else { Pong.opponent.speed = (-8 * Pong.canvas.height / 1000); }
                    }
                    left2.addEventListener("mousedown", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl3, 20); });
                    left2.addEventListener("mouseup", function () {
                        clearInterval(mousedownID);
                        mousedownID = undefined;
                        Pong.opponent.speed = 0;
                    });
                    left2.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl3, 20); });
                    left2.addEventListener("touchend", function () {
                        clearInterval(mousedownID);
                        mousedownID = undefined;
                        Pong.opponent.speed = 0;
                    });


                    function mousedownl4() {
                        if (Pong.running === false) {
                            Pong.opponent.playerState = 1;
                            if (Pong.player.playerState == 1)
                            {
                            Pong.running = true;
                            window.requestAnimationFrame(Pong.loop);
                            Pong.opponent.speed = (8 * Pong.canvas.height / 1000);
                            }
                        }
                        else { Pong.opponent.speed = (8 * Pong.canvas.height / 1000); }
                    }
                    right2.addEventListener("mousedown", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl4, 20); });
                    right2.addEventListener("mouseup", function () {
                        clearInterval(mousedownID);
                        mousedownID = undefined;
                        Pong.opponent.speed = 0;
                    });
                    right2.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl4, 20); });
                    right2.addEventListener("touchend", function () {
                        clearInterval(mousedownID);
                        mousedownID = undefined;
                        Pong.opponent.speed = 0;
                    });
                
                // --------------------------------------------------------------------------------------------


                document.addEventListener('keydown', function (key) {

                // Handle the 'Press any key to begin' function and start the game.
                if (Pong.running === false) {
                    if ((key.keyCode === 87 || key.keyCode === 83))
                        Pong.player.playerState = 1;
                    if ((key.keyCode === 38 || key.keyCode === 40))
                        Pong.opponent.playerState = 1;
                    Pong.menu();
                    if (Pong.player.playerState === 1 && Pong.opponent.playerState === 1) {
                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);

                    }
                }

                // Handle up arrow and w key events
                if (key.keyCode === 87) Pong.player.speed = (-8 * Pong.canvas.height / 1000);
                if (key.keyCode === 38) Pong.opponent.speed = (-8 * Pong.canvas.height / 1000);

                // Handle down arrow and s key events
                if (key.keyCode === 83) Pong.player.speed = (8 * Pong.canvas.height / 1000);
                if (key.keyCode === 40) Pong.opponent.speed = (8 * Pong.canvas.height / 1000);
            });


        // Stop the player from moving when there are no keys being pressed.
        // document.addEventListener('keyup', function (key) { Pong.player.move = DIRECTION.IDLE; });
        document.addEventListener('keyup', function (key) {

            if (key.keyCode === 87 || key.keyCode === 83) Pong.player.speed = 0;
            if (key.keyCode === 38 || key.keyCode === 40) Pong.opponent.speed = 0;
        });

    },

    // Reset the ball location, the player turns and set a delay before the next round begins.
    _resetTurn: function(winner, loser) {
        this.ball = Ball.new.call(this, this.ball.speed);
        this.turn = loser;
        this.timer = (new Date()).getTime();

        winner.score++;
    },

    // Wait for a delay to have passed after each turn.
    _turnDelayIsOver: function() {
        return ((new Date()).getTime() - this.timer >= 1000);
    }
};

var Pong = Object.assign({}, Game);
Pong.initialize();
    }

var winner1
var winner2
async function endgame(p1score, p2score, p1name, p2name, gamenumber, mainPlayer, player) {

    if (gamenumber == 1) {

        if (p1score > p2score) {
            console.log('le gagnant est : ' + p1name + " contre " + p2name);
            winner1 = p1name;
        }
        else {
            console.log('le gagnant est : ' + p2name + " contre " + p1name);
            winner1 = p2name;
        }
    }

    if (gamenumber == 2) {

        if (p1score > p2score) {
            console.log('le gagnant est : ' + p1name + " contre " + p2name);
            winner2 = p1name;
        }
        else {
            console.log('le gagnant est : ' + p2name + " contre " + p1name);
            winner2 = p2name;
        }
    }

    var finalWinner = ""
    var second = ""
    if (gamenumber == 3) {

        if (p1score > p2score) {
            console.log('le gagnant est : ' + winner1 + " contre " + winner2);
            finalWinner = winner1
            second = winner2
        }
        else {
            console.log('le gagnant est : ' + winner2 + " contre " + winner1);
            finalWinner = winner2
            second = winner1

        }

        console.log(finalWinner + "  " + second + "  " + mainPlayer)
        var position = 0;
        if (mainPlayer == finalWinner)
            position = 1;
        else if (mainPlayer == second)
            position = 2;
        else
            position = 3;

        const searchplayer = await fetch(`/game/tournament/${id}/`)
        const data = await searchplayer.json()
        //console.log(data)

        if (data.tourPos === null)
            data.tourPos = []
        data.tourPos.push(position)
        if (data.tourAll === null)
            data.tourAll = []
        data.tourAll.push('4')

        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const endgame = {
            method: "PUT",
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tourPos: data.tourPos,
                tourAll: data.tourAll,
            }),
            credentials: "same-origin"
        }
        // console.log(endgame)
        const postgame2 = await fetch(`/game/tournament/${data.id}/`, endgame)

        function delay(time) {
            document.querySelectorAll("h1").forEach(function (item) {
                item.textContent = "WINNER IS " + finalWinner;
            });
            return new Promise(resolve => setTimeout(resolve, time));
        }
        delay(4000).then(() => document.querySelectorAll("h1").forEach(function (item) {
            urlLocationHandler();
        }));

    }
    return;
}


    //------------------------------------------------------------------------------------------------------------------



document.querySelectorAll("#Tournaments").forEach(function (item) {
    item.addEventListener('click', function () {
        // console.log('Tournaments')
        document.querySelectorAll("#btnCreateSolo").forEach(function (item) { item.style.display = "none"; });
        document.querySelectorAll("#btnCreate2Player").forEach(function (item) { item.style.display = "none"; });
        document.querySelectorAll("#btnCreate4Player").forEach(function (item) { item.style.display = "none"; });
        document.querySelectorAll("#Tournaments").forEach(function (item) { item.style.display = "none"; });

        //1 ajout des 4 noms
        add4names();

    });
});

function add4names() {

    var box = document.createElement("div");
    box.id = "tournamentInput"
    // box.style="display:flex;"

    var player;
    if (language == "fr" || language == "FR") {
        player = "joueur"
        play = "Jouer";
    } else if (language == "es" || language == "ES") {
        player = "jugador"
        play = "jugar"

    } else {
        player = "player"
        play = "Play"
    }


    for (var i = 1; i < 5; i++) {

        const name = document.createElement("input");
        name.classList = "col-md-10 mb-7 form-control";
        if (i == 1)
            name.value = nickname;
        else
            name.value = player + " " + i;
        name.classList.add(player + i);
        name.id = player + i;
        name.appendChild(document.createTextNode(""));
        box.appendChild(name);
        document.getElementById("forNames").appendChild(box);
    }

    const btn = document.createElement("button");
    btn.classList = "col-md-10 mb-7 btn btn-primary";
    // btn.value = "player4";
    btn.type = "submit";
    btn.id = "idtournament";
    btn.appendChild(document.createTextNode(play));
    box.appendChild(btn);
    document.getElementById("forNames").appendChild(box);

    document.getElementById("idtournament").addEventListener('click', function (event) {

        // console.log("clikeddd");
        var input = document.getElementById(player + '1');
        var p1name = input.value;

        var input = document.getElementById(player + '2');
        var p2name = input.value;

        var input = document.getElementById(player + '3');
        var p3name = input.value;

        var input = document.getElementById(player + '4');
        var p4name = input.value;

        //? save les usernames
        //? check doublon
        if (p1name == p2name || p1name == p3name || p1name == p4name || p2name == p3name || p2name == p4name || p3name == p4name) {

            // console.log("two same input")
            //?make btn red
            var x = document.getElementById("idtournament");
            x.classList += " btn-danger";
            function delay(time) {
                return new Promise(resolve => setTimeout(resolve, time));
            }
            delay(400).then(() => x.classList = "col-md-10 mb-3 btn btn-primary");


        } else if (p1name && p2name && p3name && p4name) {
            // console.log("ok devrais fonctionner")
            
            startTournament(p1name, p2name, p3name, p4name);
        } else {
            // console.log("empty input")
            //?make btn red
            var x = document.getElementById("idtournament");
            x.classList += " btn-danger";
            function delay(time) {
                return new Promise(resolve => setTimeout(resolve, time));
            }
            delay(400).then(() => x.classList = "col-md-10 mb-3 btn btn-primary");
        }
    });


    function startTournament(p1name, p2name, p3name, p4name) {

            //? erase inputs and btn
            for (var i = 1; i < 5; i++) {

                var x = document.getElementById(player + i);
                x.style.display = "none";
            }
            var x = document.getElementById("idtournament");
            x.style.display = "none";

            // shows who against who
            var names = p1name + " VS " + p2name
            document.querySelectorAll("h1").forEach(function (item) {
                item.textContent = names;
            });


            document.querySelector('canvas').style = "padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block;"
            //start tournament
            pongTournament(p1name, p2name, p3name, p4name, player);

        }
    }
}
