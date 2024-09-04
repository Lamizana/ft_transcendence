function loadPong4player() {

    document.querySelectorAll("#btnCreate4Player").forEach(function (item) {
        item.addEventListener('click', function () {
            // console.log('btnCreate4Player')
            document.querySelectorAll("#btnCreateSolo").forEach(function (item) { item.style.display = "none"; });
            document.querySelectorAll("#btnCreate2Player").forEach(function (item) { item.style.display = "none"; });
            document.querySelectorAll("#btnCreate4Player").forEach(function (item) { item.style.display = "none"; });
            document.querySelectorAll("#Tournaments").forEach(function (item) { item.style.display = "none"; });
            document.querySelector('canvas').style = "padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block;"
            poong4();
        });
    });

    function poong4() {



        // ------------------------------------------------------------------------------------------------
        var btns = document.createElement("div");
        btns.id = "btn"
        document.getElementById("btns").appendChild(btns);

        var left1 = document.createElement("button");
        var right1 = document.createElement("button");
        left1.id = 'left1'
        left1.classList = "btn btn-danger"
        right1.id = 'right1'
        right1.classList = "btn btn-danger"
        left1.innerHTML = '<'
        right1.innerHTML = '>'
        btns.appendChild(left1);
        btns.appendChild(right1);

        var left2 = document.createElement("button");
        var right2 = document.createElement("button");
        left2.id = 'left2'
        right2.id = 'right2'
        left2.classList = "btn btn-primary"
        right2.classList = "btn btn-primary"
        left2.innerHTML = '<'
        right2.innerHTML = '>'
        btns.appendChild(left2);
        btns.appendChild(right2);



        var btns2 = document.createElement("div");
        btns2.id = "btn"
        document.getElementById("btns2").appendChild(btns2);

        var left3 = document.createElement("button");
        var right3 = document.createElement("button");
        left3.id = 'left3'
        left3.classList = "btn btn-success"
        right3.id = 'right3'
        right3.classList = "btn btn-success"
        left3.innerHTML = '<'
        right3.innerHTML = '>'
        btns2.appendChild(left3);
        btns2.appendChild(right3);

        var left4 = document.createElement("button");
        var right4 = document.createElement("button");
        left4.id = 'left4'
        right4.id = 'right4'
        left4.classList = "btn btn-warning"
        right4.classList = "btn btn-warning"
        left4.innerHTML = '<'
        right4.innerHTML = '>'
        btns2.appendChild(left4);
        btns2.appendChild(right4);
        btns2.style = "margin-bottom : 13vw;"
        btns.style = "margin-bottom : 1vw;"


        // ------------------------------------------------------------------------------------------------

        var presskeylanguage;
        var wait;
        var end;

        if (language == "fr" || language == "FR") {
            presskeylanguage = "Appuyez sur une touche"
            wait = "En attente d'autres joueurs"
            end = "Fin de partie"

        } else if (language == "es" || language == "ES") {
            presskeylanguage = "Presione cualquier tecla para comenzar"
            wait = "Esperando a otras jugadoras"
            gameoverlanguage = "Juego terminado"

        } else if (language == "en" || language == "EN") {
            presskeylanguage = "Press any key to begin"
            wait = "Waiting for other players"
            end = "End of game"
        }
    
    var Game = {
        initialize: function () {
            this.canvas = document.querySelector('canvas');
            this.context = this.canvas.getContext('2d');
    
        // Gestion de la taille du pong en fonction de la taille de lecran:
        if (window.innerWidth <= 320)
            {
                this.canvas.width  = 600;
                this.canvas.height = 600;
            }
            else if (window.innerWidth <= 375 && window.innerWidth > 320)
            {
                this.canvas.width  = 700 ;
                this.canvas.height = 700;
            }
            else if (window.innerWidth <= 500 && window.innerWidth > 375)
            {
                this.canvas.width  = 800;
                this.canvas.height = 800;
            }
            else if (window.innerWidth <= 1430 && window.innerWidth > 500)
            {
                this.canvas.width  = 1000;
                this.canvas.height = 1000;
            }
            else if (window.innerWidth >= 1440)
            {
                this.canvas.width  = 1100;
                this.canvas.height = 1100;
            }
            else
            {
                this.canvas.width  = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }

            this.canvas.style.width = (this.canvas.width / 2) + 'px';
            this.canvas.style.height = (this.canvas.height / 2) + 'px';

            // Taille de la raquette en fonction de la taille de la fenetre:
            if (window.innerWidth <= 375)
            {
                this.left = Paddle.new.call(this, 'left', 82, (this.canvas.height / 2) - 90, 18, 90);
                this.right = Paddle.new.call(this, 'right', this.canvas.width - 100, (this.canvas.height / 2) - 90, 18, 90);
                this.up = Paddle.new.call(this, 'up', (this.canvas.width / 2) - 90, 82, 90, 18);
                this.down = Paddle.new.call(this, 'down', (this.canvas.width / 2) - 90, this.canvas.height-100, 90, 18);
            }
            else if (window.innerWidth <= 500 && window.innerWidth > 375)
            {
                this.left = Paddle.new.call(this, 'left', 82, (this.canvas.height / 2) - 90, 18, 110);
                this.right = Paddle.new.call(this, 'right', this.canvas.width - 100, (this.canvas.height / 2) - 90, 18, 110);
                this.up = Paddle.new.call(this, 'up', (this.canvas.width / 2) - 90, 82, 110, 18);
                this.down = Paddle.new.call(this, 'down', (this.canvas.width / 2) - 90, this.canvas.height-100, 110, 18);
            }
            else
            {
                this.left = Paddle.new.call(this, 'left', 82, (this.canvas.height / 2) - 90, 18, 180);
                this.right = Paddle.new.call(this, 'right', this.canvas.width - 100, (this.canvas.height / 2) - 90, 18, 180);
                this.up = Paddle.new.call(this, 'up', (this.canvas.width / 2) - 90, 82, 180, 18);
                this.down = Paddle.new.call(this, 'down', (this.canvas.width / 2) - 90, this.canvas.height-100, 180, 18); 
            }
            
            this.ball = Ball.new.call(this);
            this.running = this.over = false;
            this.turn = this.right;
            this.shooter = null;
            this.timer = this.round = 0;
            this.color = '#888888';
            Pong.menu();
            Pong.listen();
        },
    
        endGameMenu: function (text) {
            Pong.context.font = '45px Courier New';
            Pong.context.fillStyle = this.color;
            Pong.context.fillRect( Pong.canvas.width / 2 - 350, Pong.canvas.height / 2 - 48, 700 * this.canvas.height / 1000, 100 * this.canvas.height / 1000);
            Pong.context.fillStyle = '#ffffff';
            Pong.context.fillText(text, Pong.canvas.width / 2, Pong.canvas.height / 2 + 15, this.canvas.height - (300 * this.canvas.height / 1000));
            setTimeout(function () {
                Pong = Object.assign({}, Game);
                Pong.initialize();
            }, 3000);
        },
    
        menu: function () {
            Pong.draw();
            this.context.font = '50px Courier New';
            this.context.fillStyle = this.color;
            this.context.fillRect(
                this.canvas.width / 2 - 350,
                this.canvas.height / 2 - 48,
                700 * this.canvas.height / 1000,
                100 * this.canvas.height / 1000
            );
            this.context.fillStyle = '#ffffff';
                if (Pong.left.playerState === 0)
                    this.context.fillText(presskeylanguage,
                        this.canvas.width / 2,
                        this.canvas.height / 2 + 15,
                        this.canvas.width - (300 * this.canvas.height / 1000)
                    );
                else
                    this.context.fillText(wait,
                        this.canvas.width / 2,
                        this.canvas.height / 2 + 15,
                        (this.canvas.width - 300) * this.canvas.height / 1000
                    );
            },

            update: function () {
                // if (!this.over) {
                if (this.ball.x <= 40) Pong._resetTurn.call(this, this.shooter, this.left);
                if (this.ball.x >= this.canvas.width - this.ball.width - 40) Pong._resetTurn.call(this, this.shooter, this.right);
                if (this.ball.y <= 40) Pong._resetTurn.call(this, this.shooter, this.up);
                if (this.ball.y >= this.canvas.height - this.ball.height - 40) Pong._resetTurn.call(this, this.shooter, this.down);

                if (this.ball.y <= 0) this.ball.speedy *= -1;
                if (this.ball.y >= this.canvas.height - this.ball.height) this.ball.speedy *= -1;

                this.ball.x += this.ball.speedx;
                this.ball.y += this.ball.speedy;
                this.left.y += this.left.speed;
                this.right.y += this.right.speed;
                this.up.x += this.up.speed;
                this.down.x += this.down.speed;

                if (Pong._turnDelayIsOver.call(this) && this.turn) {
                    if (this.turn === this.left)
                        this.ball.speedx = -7;
                    else if (this.turn === this.right)
                        this.ball.speedx = 7;
                    else if (this.turn === this.up)
                        this.ball.speedy = -7;
                    else if (this.turn === this.down)
                        this.ball.speedy = 7;
                    if (this.turn === this.left || this.turn === this.right)
                        this.ball.speedy = 0;
                    else
                        this.ball.speedx = 0;
                    this.ball.x = (this.canvas.width / 2) - 9,
                        this.ball.y = (this.canvas.height / 2) - 9;
                    this.turn = null;
                }

                // Update the x and y coords when a player go out of limits.
                if (this.left.y <= 200) this.left.y = 200;
                else if (this.left.y >= (this.canvas.height - this.left.height - 200)) this.left.y = (this.canvas.height - this.left.height - 200);
                if (this.right.y >= this.canvas.height - this.right.height - 200) this.right.y = this.canvas.height - this.right.height - 200;
                else if (this.right.y <= 200) this.right.y = 200;
                if (this.down.x <= 200) this.down.x = 200;
                else if (this.down.x >= (this.canvas.width - this.down.width - 200)) this.down.x = (this.canvas.width - this.down.width - 200);
                if (this.up.x >= this.canvas.width - this.up.width - 200) this.up.x = this.canvas.width - this.up.width - 200;
                else if (this.up.x <= 200) this.up.x = 200;

                // Calcul the trajectory when player touch the ball
                if (this.ball.x - this.ball.width <= this.left.x && this.ball.x >= this.left.x - this.left.width && this.ball.speedx < 0) {
                    if (this.ball.y <= this.left.y + this.left.height && this.ball.y + this.ball.height >= this.left.y) {
                        this.ball.speedy = -(this.left.y - this.ball.y + (this.left.height / 2)) / 10;
                        this.ball.speedx = (10 ** 2) - ((this.ball.speedy) ** 2);
                        if (this.ball.speedx < 0)
                            this.ball.speedx = Math.sqrt(-this.ball.speedx);
                        else
                            this.ball.speedx = Math.sqrt(this.ball.speedx);
                        this.shooter = this.left;
                    }
                }
                if (this.ball.x - this.ball.width <= this.right.x && this.ball.x >= this.right.x - this.right.width && this.ball.speedx > 0) {
                    if (this.ball.y <= this.right.y + this.right.height && this.ball.y + this.ball.height >= this.right.y) {
                        this.ball.speedy = -(this.right.y - this.ball.y + (this.right.height / 2)) / 10;

                        this.ball.speedx = (10 ** 2) - ((this.ball.speedy) ** 2);
                        if (this.ball.speedx < 0)
                            this.ball.speedx = -Math.sqrt(-this.ball.speedx);
                        else
                            this.ball.speedx = -Math.sqrt(this.ball.speedx);
                        this.shooter = this.right;
                    }
                }
                if (this.ball.y - this.ball.height <= this.down.y && this.ball.y >= this.down.y - this.down.height && this.ball.speedy > 0) {
                    if (this.ball.x <= this.down.x + this.down.width && this.ball.x + this.ball.width >= this.down.x) {
                        this.ball.speedx = -(this.down.x - this.ball.x + (this.down.width / 2)) / 10;
                        this.ball.speedy = (10 ** 2) - ((this.ball.speedx) ** 2);
                        if (this.ball.speedy < 0)
                            this.ball.speedy = -Math.sqrt(-this.ball.speedy);
                        else
                            this.ball.speedy = -Math.sqrt(this.ball.speedy);
                        this.shooter = this.down;
                    }
                }
                if (this.ball.y - this.ball.height <= this.up.y && this.ball.y >= this.up.y - this.up.height && this.ball.speedy < 0) {
                    if (this.ball.x <= this.up.x + this.up.width && this.ball.x + this.ball.width >= this.up.x) {
                        this.ball.speedx = -(this.up.x - this.ball.x + (this.up.width / 2)) / 10;
                        this.ball.speedy = (10 ** 2) - ((this.ball.speedx) ** 2);
                        if (this.ball.speedy < 0)
                            this.ball.speedy = Math.sqrt(-this.ball.speedy);
                        else
                            this.ball.speedy = Math.sqrt(this.ball.speedy);
                        this.shooter = this.up;
                    }
                }

                // The walls in the 4 corner
                if ((this.ball.y <= 100 && this.ball.y >= 82) && (this.ball.x >= this.canvas.width - 200 || this.ball.x <= 200) && this.ball.speedy < 0) {
                    this.ball.speedy *= -1;
                    this.shooter = null;
                }
                if ((this.ball.y + this.ball.height >= this.canvas.height - 100 && this.ball.y + this.ball.height <= this.canvas.height - 82) && (this.ball.x >= this.canvas.width - 200 || this.ball.x <= 200) && this.ball.speedy > 0) {
                    this.ball.speedy *= -1;
                    this.shooter = null;
                }
                if ((this.ball.x <= 100 && this.ball.x >= 82) && (this.ball.y >= this.canvas.height - 200 || this.ball.y <= 200) && this.ball.speedx < 0) {
                    this.ball.speedx *= -1;
                    this.shooter = null;
                }
                if ((this.ball.x + this.ball.width >= this.canvas.width - 100 && this.ball.x + this.ball.width <= this.canvas.width - 82) && (this.ball.y >= this.canvas.height - 200 || this.ball.y <= 200) && this.ball.speedx > 0) {
                    this.ball.speedx *= -1;
                    this.shooter = null;
                }
                // }

                if (this.left.score === 3 || this.right.score === 3 || this.up.score === 3 || this.down.score === 3) {
                    this.over = true;
                    if (this.left.score === 3)
                        setTimeout(function () { Pong.endGameMenu('Left player Wins!'); }, 1000);
                    else if (this.right.score === 3)
                        setTimeout(function () { Pong.endGameMenu('Right player Wins!'); }, 1000);
                    else if (this.up.score === 3)
                        setTimeout(function () { Pong.endGameMenu('Up player Wins!'); }, 1000);
                    else
                        setTimeout(function () { Pong.endGameMenu('Down player Wins!'); }, 1000);
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
                this.context.fillRect(0, 0, 200, 100);
                this.context.fillRect(0, 100, 100, 100);
                this.context.fillRect(this.canvas.width - 200, 0, 200, 100);
                this.context.fillRect(this.canvas.width - 100, 100, 100, 100);
                this.context.fillRect(0, this.canvas.height - 100, 200, 100);
                this.context.fillRect(0, this.canvas.height - 200, 100, 100);
                this.context.fillRect(this.canvas.width - 200, this.canvas.height - 100, 200, 100);
                this.context.fillRect(this.canvas.width - 100, this.canvas.height - 200, 100, 100);

                if (Pong._turnDelayIsOver.call(this)) {
                    this.context.fillRect(
                        this.ball.x,
                        this.ball.y,
                        this.ball.width,
                        this.ball.height
                    );
                }

                this.context.font = '100px Courier New';
                this.context.textAlign = 'center';

                this.context.fillStyle = '#ff0000';
                this.context.fillRect(
                    this.left.x,
                    this.left.y,
                    this.left.width,
                    this.left.height
                );
                this.context.fillText(this.left.score.toString(), 50, 185);
                this.context.fillText(this.left.score.toString(), 50, this.canvas.width - 115);

                this.context.fillStyle = '#0000ff';
                this.context.fillRect(
                    this.right.x,
                    this.right.y,
                    this.right.width,
                    this.right.height
                );
                this.context.fillText(this.right.score.toString(), (this.canvas.width - 50), 180);
                this.context.fillText(this.right.score.toString(), (this.canvas.width - 50), this.canvas.width - 115);

                this.context.fillStyle = '#00ff00';
                this.context.fillRect(
                    this.up.x,
                    this.up.y,
                    this.up.width,
                    this.up.height
                );
                this.context.fillText(this.up.score.toString(), 150, 85);
                this.context.fillText(this.up.score.toString(), (this.canvas.width - 150), 85);

                this.context.fillStyle = '#ffff00';
                this.context.fillRect(
                    this.down.x,
                    this.down.y,
                    this.down.width,
                    this.down.height
                );
                this.context.fillText(this.down.score.toString(), 150, (this.canvas.width - 15));
                this.context.fillText(this.down.score.toString(), (this.canvas.width - 150), (this.canvas.width - 15));

                this.context.fillStyle = '#ffffff';
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
                        Pong.left.playerState = 1;
                        if (Pong.left.playerState === 1 && Pong.right.playerState === 1 && Pong.up.playerState === 1 && Pong.down.playerState === 1) {
                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);
                        Pong.left.speed = (-8 * Pong.canvas.height / 1000);
                        }
                    }
                    else { Pong.left.speed = (-8 * Pong.canvas.height / 1000); }
                }
                left1.addEventListener("mousedown", function () {  if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl1, 20); });
                left1.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.left.speed = 0;
                });
                left1.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl1, 20); });
                left1.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.left.speed = 0;
                });

                function mousedownl2() {
                    if (Pong.running === false) {
                        Pong.left.playerState = 1;
                        if (Pong.left.playerState === 1 && Pong.right.playerState === 1 && Pong.up.playerState === 1 && Pong.down.playerState === 1) {

                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);
                        Pong.left.speed = (8 * Pong.canvas.height / 1000);
                        }
                    }
                    else { Pong.left.speed = (8 * Pong.canvas.height / 1000); }
                }
                right1.addEventListener("mousedown", function () {  if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl2, 20); });
                right1.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.left.speed = 0;
                });
                right1.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl2, 20); });
                right1.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.left.speed = 0;
                });

                
                function mousedownl3() {
                    if (Pong.running === false) {
                        Pong.right.playerState = 1;
                        if (Pong.left.playerState === 1 && Pong.right.playerState === 1 && Pong.up.playerState === 1 && Pong.down.playerState === 1) {
                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);
                        Pong.right.speed = (-8 * Pong.canvas.height / 1000);
                        }
                    }
                    else { Pong.right.speed = (-8 * Pong.canvas.height / 1000); }
                }
                left2.addEventListener("mousedown", function () {  if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl3, 20); });
                left2.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.right.speed = 0;
                });
                left2.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl3, 20); });
                left2.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.right.speed = 0;
                });

                function mousedownl4() {
                    if (Pong.running === false) {
                        Pong.right.playerState = 1;
                        if (Pong.left.playerState === 1 && Pong.right.playerState === 1 && Pong.up.playerState === 1 && Pong.down.playerState === 1) {
                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);
                        Pong.right.speed = (8 * Pong.canvas.height / 1000);
                        }
                    }
                    else { Pong.right.speed = (8 * Pong.canvas.height / 1000); }
                }
                right2.addEventListener("mousedown", function () {  if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl4, 20); });
                right2.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.right.speed = 0;
                });
                right2.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl4, 20); });
                right2.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.right.speed = 0;
                });


                function mousedownl5() {
                    if (Pong.running === false) {
                        Pong.up.playerState = 1;
                        if (Pong.left.playerState === 1 && Pong.right.playerState === 1 && Pong.up.playerState === 1 && Pong.down.playerState === 1) {
                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);
                        Pong.up.speed = (-8 * Pong.canvas.height / 1000);
                        }
                    }
                    else { Pong.up.speed = (-8 * Pong.canvas.height / 1000); }
                }
                left3.addEventListener("mousedown", function () {  if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl5, 20); });
                left3.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.up.speed = 0;
                });
                left3.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl5, 20); });
                left3.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.up.speed = 0;
                });

                function mousedownl6() {
                    if (Pong.running === false) {
                        Pong.up.playerState = 1;
                        if (Pong.left.playerState === 1 && Pong.right.playerState === 1 && Pong.up.playerState === 1 && Pong.down.playerState === 1) {
                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);
                        Pong.up.speed = (8 * Pong.canvas.height / 1000);
                        }
                    }
                    else { Pong.up.speed = (8 * Pong.canvas.height / 1000); }
                }
                right3.addEventListener("mousedown", function () {  if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl6, 20); });
                right3.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.up.speed = 0;
                });
                right3.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl6, 20); });
                right3.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.up.speed = 0;
                });



                function mousedownl7() {
                    if (Pong.running === false) {
                        Pong.down.playerState = 1;
                        if (Pong.left.playerState === 1 && Pong.right.playerState === 1 && Pong.up.playerState === 1 && Pong.down.playerState === 1) {
                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);
                        Pong.down.speed = (-8 * Pong.canvas.height / 1000);
                        }
                    }
                    else { Pong.down.speed = (-8 * Pong.canvas.height / 1000); }
                }
                left4.addEventListener("mousedown", function () {  if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl7, 20); });
                left4.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.down.speed = 0;
                });
                left4.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl7, 20); });
                left4.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.down.speed = 0;
                });

                function mousedownl8() {
                    if (Pong.running === false) {
                        Pong.down.playerState = 1;
                        if (Pong.left.playerState === 1 && Pong.right.playerState === 1 && Pong.up.playerState === 1 && Pong.down.playerState === 1) {
                        Pong.running = true;
                        window.requestAnimationFrame(Pong.loop);
                        Pong.down.speed = (8 * Pong.canvas.height / 1000);
                        }
                    }
                    else { Pong.down.speed = (8 * Pong.canvas.height / 1000); }
                }
                right4.addEventListener("mousedown", function () {  if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl8, 20); });
                right4.addEventListener("mouseup", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.down.speed = 0;
                });
                right4.addEventListener("touchstart", function () { if (typeof(mousedownID) === 'undefined') mousedownID = setInterval(mousedownl8, 20); });
                right4.addEventListener("touchend", function () {
                    clearInterval(mousedownID);
                    mousedownID = undefined;
                    Pong.down.speed = 0;
                });


                //--------------------------------------------------------------------------------------------------------


                document.addEventListener('keydown', function (key) {
                    if (Pong.running === false) {
                        if (key.keyCode === 87 || key.keyCode === 83)
                            Pong.left.playerState = 1;
                        if (key.keyCode === 38 || key.keyCode === 40)
                            Pong.right.playerState = 1;
                        if (key.keyCode === 65 || key.keyCode === 68)
                            Pong.up.playerState = 1;
                        if (key.keyCode === 37 || key.keyCode === 39)
                            Pong.down.playerState = 1;
                        Pong.menu();
                        if (Pong.left.playerState === 1 && Pong.right.playerState === 1 && Pong.up.playerState === 1 && Pong.down.playerState === 1) {
                            Pong.running = true;
                            window.requestAnimationFrame(Pong.loop);

                        }
                    }
                    if (key.keyCode === 87) Pong.left.speed = -8;
                    if (key.keyCode === 83) Pong.left.speed = 8;
                    if (key.keyCode === 38) Pong.right.speed = -8;
                    if (key.keyCode === 40) Pong.right.speed = 8;
                    if (key.keyCode === 65) Pong.up.speed = -8;
                    if (key.keyCode === 68) Pong.up.speed = 8;
                    if (key.keyCode === 37) Pong.down.speed = -8;
                    if (key.keyCode === 39) Pong.down.speed = 8;
                });
                document.addEventListener('keyup', function (key) {
                    if ((key.keyCode === 87 || key.keyCode === 83)) Pong.left.speed = 0;
                    if ((key.keyCode === 38 || key.keyCode === 40)) Pong.right.speed = 0;
                    if ((key.keyCode === 65 || key.keyCode === 68)) Pong.up.speed = 0;
                    if ((key.keyCode === 37 || key.keyCode === 39)) Pong.down.speed = 0;
                });

            },

            _resetTurn: function (scorer, loser) {
                this.ball = Ball.new.call(this, this.ball.speedx);
                this.turn = loser;
                this.timer = (new Date()).getTime();
                if (scorer != null)
                    scorer.score++;
                this.shooter = null;
            },

            _turnDelayIsOver: function () {
                return ((new Date()).getTime() - this.timer >= 1000);
            }
        };

        var Pong = Object.assign({}, Game);
        Pong.initialize();
    }
}