var Ball = {
    new: function () {
        return {
            width: 18 * this.canvas.height / 1000,
            height: 18 * this.canvas.height / 1000,
            x: (this.canvas.width / 2) - 9,
            y: (this.canvas.height / 2) - 9,
            speed: 7 * this.canvas.height / 1000,
            speedy: 0
        };
    }
};

var Paddle = {
    new: function (name, x, y, width, height) {
        return {
            width: width,
            height: height,
            x: x,
            y: y,
            score: 0,
            speed: 0,
            playerState: 0,
            name: name
        };
    }
};


function loadPong() {

    var presskeylanguage;
    var wait1;
    var wait2;
    var winnerlanguage;
    var gameoverlanguage;

    if (language == "fr" || language == "FR") {
        presskeylanguage = "Appuyez sur une touche"
        wait1 = "En attente du joueur 1"
        wait2 = "En attente du joueur 2"
        winnerlanguage = "Victoire !"
        gameoverlanguage = "Perdu"

    } else if (language == "es" || language == "ES") {
        presskeylanguage = "Presione cualquier tecla para comenzar"
        wait1 = "Esperando al jugador 1"
        wait2 = "Esperando al jugador 2"
        winnerlanguage = "Victoria !"
        gameoverlanguage = "Juego terminado"

    } else if (language == "en" || language == "EN") {
        presskeylanguage = "Press any key to begin"
        wait1 = "Waiting for player 1"
        wait2 = "Waiting for player 2"
        winnerlanguage = "Victory !"
        gameoverlanguage = "Game Over"
    }


    btnCreateSolo = document.querySelectorAll("#btnCreateSolo").forEach(function (item) {
        item.addEventListener('click', function () {
            // console.log('btnCreateSolo')

            document.querySelectorAll("#btnCreateSolo").forEach(function (item) { item.style.display = "none"; });
            document.querySelectorAll("#btnCreate2Player").forEach(function (item) { item.style.display = "none"; });
            document.querySelectorAll("#btnCreate4Player").forEach(function (item) { item.style.display = "none"; });
            document.querySelectorAll("#Tournaments").forEach(function (item) { item.style.display = "none"; });

            document.querySelector('canvas').style = "padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block;margin-bottom : 5vw;"

            poong("Solo");
        });
    });


    btnCreate2Player = document.querySelectorAll("#btnCreate2Player").forEach(function (item) {
        item.addEventListener('click', function () {
            // console.log('btnCreate2Player')

            document.querySelectorAll("#btnCreateSolo").forEach(function (item) { item.style.display = "none"; });
            document.querySelectorAll("#btnCreate2Player").forEach(function (item) { item.style.display = "none"; });
            document.querySelectorAll("#btnCreate4Player").forEach(function (item) { item.style.display = "none"; });
            document.querySelectorAll("#Tournaments").forEach(function (item) { item.style.display = "none"; });

            document.querySelector('canvas').style = "padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block;margin-bottom : 5vw;"

            poong("MultiLocal");
        });
    });

    function poong(state) {


        // ------------------------------------------------------------------------------------------------
        var btns = document.createElement("div");
        btns.id = "btn"
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

        // console.log(btns);
        document.getElementById("btns").appendChild(btns);
        if (state == 'MultiLocal') {
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
        // ------------------------------------------------------------------------------------------------


        var Game = {
            initialize: function () {
                this.canvas = document.querySelector('canvas');

                if (window.location.pathname == '/pong/') {
                    // if (this.over && this.over == 2)
                    //     return;
                    this.context = this.canvas.getContext('2d');

                    // Gestion de la taille du pong en fonction de la taille de lecran:
                    if (window.innerWidth <= 320) {
                        this.canvas.width = 600;
                        this.canvas.height = 428;
                    }
                    else if (window.innerWidth <= 375 && window.innerWidth > 320) {
                        this.canvas.width = 700;
                        this.canvas.height = 500;
                    }
                    else if (window.innerWidth <= 500 && window.innerWidth > 375) {
                        this.canvas.width = 800;
                        this.canvas.height = 571;
                    }
                    else if (window.innerWidth <= 1430 && window.innerWidth > 500) {
                        this.canvas.width = 1000;
                        this.canvas.height = 714;
                    }
                    else if (window.innerWidth >= 1440) {
                        this.canvas.width = 1400;
                        this.canvas.height = 1000;
                    }
                    else {
                        this.canvas.width = window.innerWidth;
                        this.canvas.height = window.innerHeight;
                    }
                    // Anciennes valeur: "left=150", "Ai=150", "Player2=150".
                    this.canvas.style.width = (this.canvas.width / 2) + 'px';
                    this.canvas.style.height = (this.canvas.height / 2) + 'px';
                    this.player = Paddle.new.call(this, "left", 150 * this.canvas.width / 1400, (this.canvas.height / 2) - 35, 18 * this.canvas.width / 1400, 180 * this.canvas.height / 1000);
                    if (state === "Solo")
                        this.opponent = Paddle.new.call(this, "Ai", this.canvas.width - (150 * this.canvas.width / 1400), (this.canvas.height / 2) - (35 * this.canvas.height / 1000), 18 * this.canvas.width / 1400, 180 * this.canvas.height / 1000);
                    else
                        this.opponent = Paddle.new.call(this, "Player2", this.canvas.width - (150 * this.canvas.width / 1400), (this.canvas.height / 2) - (35 * this.canvas.height / 1000), 18 * this.canvas.width / 1400, 180 * this.canvas.height / 1000);
                    this.ball = Ball.new.call(this);
                    this.running = this.over = false;
                    this.turn = this.opponent;
                    this.timer = this.round = 0;
                    this.color = '#888888';
                    // console.log("start")

                    Pong.menu();
                    Pong.listen();

                }

            },

            newgame: function () {
                //console.log(this.over)
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
                if (state === "Solo") {
                    this.context.fillText(presskeylanguage,
                        (this.canvas.width / 2),
                        (this.canvas.height / 2 + 15),
                        this.canvas.width - (400 * this.canvas.height / 1000)
                    );
                }
                else if (state === "MultiLocal") {
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
                }
            },

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

                    if (this.player.y <= 0) this.player.y = 0;
                    else if (this.player.y >= (this.canvas.height - this.player.height)) this.player.y = (this.canvas.height - this.player.height);
                    if (this.opponent.y >= this.canvas.height - this.opponent.height) this.opponent.y = this.canvas.height - this.opponent.height;
                    else if (this.opponent.y <= 0) this.opponent.y = 0;

                    if (state === "Solo") {
                        if (this.opponent.y > this.opponent.destination + 10)
                            this.opponent.speed = (-7 * this.canvas.height / 1000);
                        if (this.opponent.y < this.opponent.destination - 10)
                            this.opponent.speed = (7 * this.canvas.height / 1000);
                        if (this.opponent.speed == (-7 * this.canvas.height / 1000)) {
                            if (this.opponent.y <= this.opponent.destination)
                                this.opponent.speed = 0;
                        }
                        if (this.opponent.speed == (7 * this.canvas.height / 1000)) {
                            if (this.opponent.y >= this.opponent.destination)
                                this.opponent.speed = 0;
                        }
                    }

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

                if (this.player.score === 3 || this.opponent.score === 3) {
                    endgame(this.player.score, this.opponent.score, this.opponent.name)
                    if (this.over != 2)
                        this.over = true;
                    if (this.player.score === 3)
                        setTimeout(function () { Pong.endGameMenu(winnerlanguage); }, 1000);
                    else
                        setTimeout(function () { Pong.endGameMenu(gameoverlanguage); }, 1000);
                }
            },

            draw: function () {
                this.context.clearRect(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                );
                this.context.fillStyle = this.color;
                this.context.fillRect(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                );
                this.context.fillStyle = '#ffffff';
                this.context.fillRect(
                    this.player.x,
                    this.player.y,
                    this.player.width,
                    this.player.height
                );
                this.context.fillRect(
                    this.opponent.x,
                    this.opponent.y,
                    this.opponent.width,
                    this.opponent.height
                );
                if (Pong._turnDelayIsOver.call(this)) {
                    this.context.fillRect(
                        this.ball.x,
                        this.ball.y,
                        this.ball.width,
                        this.ball.height
                    );
                }

                this.context.beginPath();
                this.context.setLineDash([7, 15]);
                this.context.moveTo((this.canvas.width / 2), this.canvas.height - 140 * this.canvas.height / 1000);
                this.context.lineTo((this.canvas.width / 2), 140 * this.canvas.height / 1000);
                this.context.lineWidth = 10;
                this.context.strokeStyle = '#ffffff';
                this.context.stroke();

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
            },

            loop: function () {
                Pong.update();
                Pong.draw();
                if (!Pong.over) requestAnimationFrame(Pong.loop);
            },

            AiPlay: function () {
                if (this.ball.speed < 0)
                    this.opponent.destination = (this.canvas.height / 2) - this.opponent.height / 2
                else if (this.ball.y < (this.canvas.height / 4) && this.ball.speedy < 0)
                    this.opponent.destination = - this.ball.y - this.ball.speedy * ((this.canvas.width - (this.ball.x) - (150 * this.canvas.height / 1000)) / (this.ball.speed)) - this.opponent.height / 2
                else if (this.ball.y > (this.canvas.height / 4) * 3 && this.ball.speedy > 0)
                    this.opponent.destination = this.canvas.height - this.ball.y + this.canvas.height - this.ball.speedy * ((this.canvas.width - (this.ball.x) - (150 * this.canvas.height / 1000)) / (this.ball.speed)) - this.opponent.height / 2
                else
                    this.opponent.destination = this.ball.y + this.ball.speedy * ((this.canvas.width - (this.ball.x) - (150 * this.canvas.height / 1000)) / (this.ball.speed)) - this.opponent.height / 2 + (Math.floor(Math.random() * 21) - 10) * 9 * this.canvas.height / 1000

                if (!Pong.over)
                    setTimeout(function () { Pong.AiPlay(); }, 1000);
            },

            listen: function () {

                document.addEventListener("click", (e) => {
                    const { target } = e;
                    if (!target.matches("a")) {
                        return;
                    }
                    Pong.over = 2;
                });



                //--------------------------------------------------------------------------------------------------------

                var mousedownID = undefined;
                window.oncontextmenu = function () {
                    if (event.button != 2 && !(event.clientX == event.clientY == 1)) {
                        event.preventDefault();
                    }
                }

                function mousedownl1() {
                    if (Pong.running === false) {
                        Pong.player.playerState = 1;
                        if (Pong.opponent.playerState == 1 || state == "Solo") {
                            Pong.running = true;
                            if (state == "Solo")
                                Pong.AiPlay();
                            window.requestAnimationFrame(Pong.loop);
                            Pong.player.speed = (-8 * Pong.canvas.height / 1000);
                        }
                    }
                    else { Pong.player.speed = (-8 * Pong.canvas.height / 1000); }
                }
                left1.addEventListener("mousedown", function () { if (typeof (mousedownID) === 'undefined') mousedownID = setInterval(mousedownl1, 20); });
                left1.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.player.speed = 0;
                });
                left1.addEventListener("touchstart", function () { if (typeof (mousedownID) === 'undefined') mousedownID = setInterval(mousedownl1, 20); });
                left1.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.player.speed = 0;
                });



                function mousedownl2() {
                    if (Pong.running === false) {
                        Pong.player.playerState = 1;
                        if (Pong.opponent.playerState == 1 || state == "Solo") {

                            Pong.running = true;
                            if (state == "Solo")
                                Pong.AiPlay();
                            window.requestAnimationFrame(Pong.loop);
                            Pong.player.speed = (8 * Pong.canvas.height / 1000);
                        }

                    }
                    else { Pong.player.speed = (8 * Pong.canvas.height / 1000); }
                }
                right1.addEventListener("mousedown", function () { if (typeof (mousedownID) === 'undefined') mousedownID = setInterval(mousedownl2, 20); });
                right1.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.player.speed = 0;
                });
                right1.addEventListener("touchstart", function () { if (typeof (mousedownID) === 'undefined') mousedownID = setInterval(mousedownl2, 20); });
                right1.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.player.speed = 0;
                });



                if (state === "MultiLocal") {
                    function mousedownl3() {
                        if (Pong.running === false) {
                            Pong.opponent.playerState = 1;
                            if (Pong.player.playerState == 1) {
                                Pong.running = true;
                                window.requestAnimationFrame(Pong.loop);
                                Pong.opponent.speed = (-8 * Pong.canvas.height / 1000);
                            }
                        }
                        else { Pong.opponent.speed = (-8 * Pong.canvas.height / 1000); }
                    }
                    left2.addEventListener("mousedown", function () { if (typeof (mousedownID) === 'undefined') mousedownID = setInterval(mousedownl3, 20); });
                    left2.addEventListener("mouseup", function () {
                        clearInterval(mousedownID);
                        mousedownID = undefined;
                        Pong.opponent.speed = 0;
                    });
                    left2.addEventListener("touchstart", function () { if (typeof (mousedownID) === 'undefined') mousedownID = setInterval(mousedownl3, 20); });
                    left2.addEventListener("touchend", function () {
                        clearInterval(mousedownID);
                        mousedownID = undefined;
                        Pong.opponent.speed = 0;
                    });


                    function mousedownl4() {
                        if (Pong.running === false) {
                            Pong.opponent.playerState = 1;
                            if (Pong.player.playerState == 1) {
                                Pong.running = true;
                                window.requestAnimationFrame(Pong.loop);
                                Pong.opponent.speed = (8 * Pong.canvas.height / 1000);
                            }
                        }
                        else { Pong.opponent.speed = (8 * Pong.canvas.height / 1000); }
                    }
                    right2.addEventListener("mousedown", function () { if (typeof (mousedownID) === 'undefined') mousedownID = setInterval(mousedownl4, 20); });
                    right2.addEventListener("mouseup", function () {
                        clearInterval(mousedownID);
                        mousedownID = undefined;
                        Pong.opponent.speed = 0;
                    });
                    right2.addEventListener("touchstart", function () { if (typeof (mousedownID) === 'undefined') mousedownID = setInterval(mousedownl4, 20); });
                    right2.addEventListener("touchend", function () {
                        clearInterval(mousedownID);
                        mousedownID = undefined;
                        Pong.opponent.speed = 0;
                    });

                }


                //--------------------------------------------------------------------------------------------------------




                document.addEventListener('keydown', function (key) {
                    if (Pong.running === false) {
                        if (state === "MultiLocal" && (key.keyCode === 87 || key.keyCode === 83))
                            Pong.player.playerState = 1;
                        if (state === "MultiLocal" && (key.keyCode === 38 || key.keyCode === 40))
                            Pong.opponent.playerState = 1;
                        Pong.menu();
                        if ((state === "Solo" && (key.keyCode === 87 || key.keyCode === 83 || key.keyCode === 38 || key.keyCode === 40)) || (Pong.player.playerState === 1 && Pong.opponent.playerState === 1)) {
                            Pong.running = true;
                            if (state == "Solo")
                                Pong.AiPlay();
                            window.requestAnimationFrame(Pong.loop);
                        }
                    }

                    if (state === "Solo" && (key.keyCode === 38 || key.keyCode === 87)) (Pong.player.speed = -7 * Pong.canvas.height / 1000);
                    if (state === "MultiLocal" && key.keyCode === 87) Pong.player.speed = (-8 * Pong.canvas.height / 1000);
                    if (state === "MultiLocal" && key.keyCode === 38) Pong.opponent.speed = (-8 * Pong.canvas.height / 1000);

                    if (state === "Solo" && (key.keyCode === 40 || key.keyCode === 83)) Pong.player.speed = (7 * Pong.canvas.height / 1000);
                    if (state === "MultiLocal" && key.keyCode === 83) Pong.player.speed = (8 * Pong.canvas.height / 1000);
                    if (state === "MultiLocal" && key.keyCode === 40) Pong.opponent.speed = (8 * Pong.canvas.height / 1000);
                });

                document.addEventListener('keyup', function (key) {

                    if (state === "MultiLocal" && (key.keyCode === 87 || key.keyCode === 83)) Pong.player.speed = 0;
                    if (state === "MultiLocal" && (key.keyCode === 38 || key.keyCode === 40)) Pong.opponent.speed = 0;
                    if (state === "Solo") Pong.player.speed = 0;
                });

            },

            _resetTurn: function (winner, loser) {
                this.ball = Ball.new.call(this, this.ball.speed);
                this.turn = loser;
                this.timer = (new Date()).getTime();

                winner.score++;
            },

            _turnDelayIsOver: function () {
                return ((new Date()).getTime() - this.timer >= 1000);
            }
        };

        var Pong = Object.assign({}, Game);
        Pong.initialize();
    }

    async function endgame(playerScore, opponentScore, opponentName) {

        var win = 0

        if (playerScore > opponentScore)
            win = 1
        var lose = 0
        if (playerScore < opponentScore)
            lose = 1
        const searchplayer = await fetch(`/game/score/${id}/`)
        const data = await searchplayer.json()
        //console.log(data)

        if (data.duelMyname === null)
            data.duelMyname = []
        data.duelMyname.push(data.nickname)
        if (data.duelEnemy === null)
            data.duelEnemy = []
        data.duelEnemy.push(opponentName)
        if (data.duelMe === null)
            data.duelMe = []
        data.duelMe.push(playerScore)
        if (data.duelThem === null)
            data.duelThem = []
        data.duelThem.push(opponentScore)
        let date = new Date();

        if (data.date === null)
            data.date = []
        data.date.push(`${date.getDate()}/${date.getMonth() + 1}`)



        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const endgame = {
            method: "PUT",
            headers: {
                "X-CSRFToken": csrftoken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nickname: data.nickname,
                wins: data.wins + win,
                loses: data.loses + lose,
                duelMyname: data.duelMyname,
                duelEnemy: data.duelEnemy,
                duelMe: data.duelMe,
                duelThem: data.duelThem,
                date: data.date,
            }),
            credentials: "same-origin"
        }
        const postgame2 = await fetch(`/game/score/${data.id}/`, endgame)
    }
}