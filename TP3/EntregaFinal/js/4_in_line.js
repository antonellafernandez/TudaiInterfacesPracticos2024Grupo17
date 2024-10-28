let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let timer = null;
let tokens_1 = [];
let tokens_2 = [];
let lastClickedToken = null;
let isMouseDown = false;
let player = 1;
let turn = 0;
let token_1 = new Image();
let token_2 = new Image();
let btnRestart = document.getElementById("restart");
let btnSubZero = document.getElementById("select-sub-zero");
let btnScorpion = document.getElementById("select-scorpion");
let btnSmoke = document.getElementById("select-smoke");
let btnReptile = document.getElementById("select-reptile");
let lineMode= 4;

function addTokenSubZero() {
    let initialY = 50;
    tokens_1 = [];
    let subZeroImg = new Image();
    subZeroImg.src = "../img/4_in_line/sub_zero.webp";

    for (let i = 0; i < 5; i++) {
        let posX = 30;
        let posY = initialY + i * 60;
        let circle = new Circle(posX, posY, 20, subZeroImg, ctx, 1);
        tokens_1.push(circle);
    }
}

function addTokenScorpion() {
    let initialY = 50;
    tokens_2 = [];
    let scorpionImg = new Image();
    scorpionImg.src = "../img/4_in_line/scorpion.webp";

    for (let i = 0; i < 5; i++) {
        let posX = canvasWidth - 30;
        let posY = initialY + i * 60;
        let circle = new Circle(posX, posY, 20, scorpionImg, ctx, 2);
        tokens_2.push(circle);
    }
}

function addTokenSmoke() {
    let initialY = 50;
    tokens_2 = [];
    let smokeImg = new Image();
    smokeImg.src = "../img/4_in_line/smoke.webp";

    for (let i = 0; i < 5; i++) {
        let posX = canvasWidth - 30;
        let posY = initialY + i * 60;
        let circle = new Circle(posX, posY, 20, smokeImg, ctx, 2);
        tokens_2.push(circle);
    }
}

function addTokenReptile() {
    let initialY = 50;
    tokens_1 = [];
    let reptileImg = new Image();
    reptileImg.src = "../img/4_in_line/reptile.webp";

    for (let i = 0; i < 5; i++) {
        let posX = 30;
        let posY = initialY + i * 60;
        let circle = new Circle(posX, posY, 20, reptileImg, ctx, 1);
        tokens_1.push(circle);
    }
}

function drawToken() {
    // clearCanvas();
    for (let i = 0; i < tokens_1.length; i++) {
        tokens_1[i].draw();
        tokens_2[i].draw();
    }
}

function clearCanvas() {
    ctx.fillStyle = "#003950";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function findClickedToken(x, y) {
    let element;

    for (let i = 0; i < tokens_1.length; i++) {
        // Recorrer tokens y obtenerlos
        switch(player) {
            case 1:
                element = tokens_1[i];
                break;
            case 2:
                element = tokens_2[i];
                break;
        }
        console.log(x, y);

        if (element.isPointInside(x, y) && element.getPlayer() == player) {
            return element;
        }
    }
}

// Eventos
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mousemove", onMouseMove);

function onMouseDown(e) {
    isMouseDown = true;

    if (lastClickedToken != null) {
        // Cuando se clickea afuera deja de resaltar
        lastClickedToken.setSelected(false);
        lastClickedToken = null;
    }

    let clickToken = findClickedToken(e.offsetX, e.offsetY);
    if (clickToken != null) {
        clickToken.setSelected(true);
        lastClickedToken = clickToken;
    }

    drawToken;
}

function onMouseMove(e) {
    if (gameStarted) { // Verificar si el juego ha iniciado
        // Movimiento al hacer click en la figura
        if (isMouseDown && lastClickedToken != null) {
            lastClickedToken.setPosition(e.offsetX, e.offsetY);

            clearCanvas();
            board.drawBoard();
            drawToken();
        }
    }
}

function onMouseUp(e) {
    let positions = [];
    isMouseDown = false;

    if (lastClickedToken) {
        if (board.isIn(e.offsetX, e.offsetY)) {
            positions = board.dropToken(e.offsetX, player);

            if (positions != -1) {
                if (board.checkWinner(positions[0], positions[1],player)) {
                    console.log("You Win!");
                    youWin(player);
                    return;
                }

                switch (player) {
                    case 1:
                        player = 2;
                        changeTurn()
                        break;
                    case 2:
                        player = 1;
                        changeTurn()
                        break;
                }
            }
        }

        lastClickedToken.resetPosition();
        clearCanvas();
        drawToken();
        board.drawBoard();
    }
}

function youWin(player) {
    clearCanvas();
    board.drawBoard();
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mouseup", onMouseUp);
    canvas.removeEventListener("mousemove", onMouseMove);
    clearInterval(timer);
    document.getElementById("info").innerHTML =
        "<h1>¡Winner: Player " + player + "!</h1>";
}

function finish() {
    clearCanvas();
    board.drawBoard();
    document.getElementById("info").innerHTML = "<h1>Time is Over</h1>";
}

let gameStarted = false;

function start() {
    gameStarted = true; // Se inicia el juego
    updateTimer();
    board = new Board(fil, col, lineMode);
    board.buildBoard();
    btnRestart.addEventListener("click", reloadPage);
    clearCanvas();
    drawToken();
    board.drawBoard();
    RemoveModeAndTeams();
    btnRestart.classList.remove("hidden");
    document.getElementById("turn").innerHTML= "<h3>Turn: Player " + player + "</h3>";

}

function reloadPage() { // Reiniciar el juego recargando la página
    location.reload();
}

function changeTurn(){ // Cambiar el turno de jugador
    turn++;
    console.log(turn)
    player = (turn % 2) + 1;
    document.getElementById("turn").innerHTML= "<h3>Turn: Player " + player + "</h3>";
}

function RemoveModeAndTeams() {
    btn_4_in_line.removeEventListener("click", mode4);
    btn_5_in_line.removeEventListener("click", mode5);
    btn_6_in_line.removeEventListener("click", mode6);
    btn_7_in_line.removeEventListener("click", mode7);
    btnSubZero.removeEventListener("click", ShowTokenSubZero);
    btnScorpion.removeEventListener("click", ShowTokenScorpion );
    btnSmoke.removeEventListener("click",ShowTokenSmoke );
    btnReptile.removeEventListener("click",ShowTokenReptile );
    btn_start.removeEventListener("click", start);

    // Display none a los botones
    btn_4_in_line.style.display = "none";
    btn_5_in_line.style.display = "none";
    btn_6_in_line.style.display = "none";
    btn_7_in_line.style.display = "none";
    btnSubZero.style.display = "none";
    btnScorpion.style.display = "none";
    btnSmoke.style.display = "none";
    btnReptile.style.display = "none";
    btn_start.style.display = "none";
}

const startingMinutes = 5;
let time = startingMinutes * 60;
const time_remaining = document.getElementById("time-remaining");

// Contador
function updateTimer() {
    timer = setInterval(updateTimeRemaning, 1000);
}

function updateTimeRemaning() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds === 0 && minutes === 0) {
        clearInterval(timer);
        finish();
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    time_remaining.innerHTML = `${minutes}: ${seconds}`;

    time--;
}

// Cambiar de tablero
let btn_start = document.getElementById("start");
let btn_4_in_line = document.getElementById("btn-4-in-line");
let btn_5_in_line = document.getElementById("btn-5-in-line");
let btn_6_in_line = document.getElementById("btn-6-in-line");
let btn_7_in_line = document.getElementById("btn-7-in-line");

function switchColumnsAndRows() {
    switch (mode) {
        case 7:
            col = 10;
            fil = 9;
            break;
        case 6:
            col = 9;
            fil = 8;
            break;
        case 5:
            col = 8;
            fil = 7;
            break;
        default:
            col = 7;
            fil = 6;
            break;
    } // Reconstruir el tablero con las nuevas columnas y filas
}

btn_4_in_line.addEventListener("click", mode4);

mode4()

function mode4() {
    mode = "default";
    lineMode = 4;
    switchColumnsAndRows();
    board = new Board(fil, col, lineMode);
    board.buildBoard();
    clearCanvas();
    board.drawBoard();
    btn_4_in_line.classList.add("selected");
    btn_5_in_line.classList.remove("selected");
    btn_6_in_line.classList.remove("selected");
    btn_7_in_line.classList.remove("selected");
    btn_start.addEventListener("click", start);
}

btn_5_in_line.addEventListener("click", mode5);

function mode5() {
    mode = 5;
    lineMode = 5;
    switchColumnsAndRows();
    board = new Board(fil, col, lineMode);
    board.buildBoard();
    clearCanvas();
    board.drawBoard();
    btn_5_in_line.classList.add("selected");
    btn_4_in_line.classList.remove("selected");
    btn_6_in_line.classList.remove("selected");
    btn_7_in_line.classList.remove("selected");
    btn_start.addEventListener("click", start);
}

btn_6_in_line.addEventListener("click", mode6);

function mode6() {
    mode = 6;
    lineMode = 6;
    switchColumnsAndRows();
    board = new Board(fil, col, lineMode);
    board.buildBoard();
    clearCanvas();
    board.drawBoard();
    btn_6_in_line.classList.add("selected");
    btn_4_in_line.classList.remove("selected");
    btn_5_in_line.classList.remove("selected");
    btn_7_in_line.classList.remove("selected");
    btn_start.addEventListener("click", start);
}

btn_7_in_line.addEventListener("click", mode7);

function mode7() {
    mode = 7;
    lineMode = 7;
    switchColumnsAndRows();
    board = new Board(fil, col, lineMode);
    board.buildBoard();
    clearCanvas();
    board.drawBoard();
    btn_7_in_line.classList.add("selected");
    btn_4_in_line.classList.remove("selected");
    btn_5_in_line.classList.remove("selected");
    btn_6_in_line.classList.remove("selected");
    btn_start.addEventListener("click", start);
}

ShowTokenScorpion()
ShowTokenSubZero()

btnSubZero.addEventListener("click", ShowTokenSubZero);

function ShowTokenSubZero() {
    btnReptile.classList.remove("selected");
    btnSubZero.classList.add("selected");
    addTokenSubZero();
    token_1.src = "../img/4_in_line/sub_zero.webp";
}

btnScorpion.addEventListener("click", ShowTokenScorpion);

function ShowTokenScorpion() {
    btnSmoke.classList.remove("selected");
    btnScorpion.classList.add("selected");
    addTokenScorpion();
    token_2.src = "../img/4_in_line/scorpion.webp";
}

btnSmoke.addEventListener("click", ShowTokenSmoke);

function ShowTokenSmoke() {
    btnScorpion.classList.remove("selected");
    btnSmoke.classList.add("selected");
    addTokenSmoke();
    token_2.src = "../img/4_in_line/smoke.webp";
}

btnReptile.addEventListener("click", ShowTokenReptile);

function ShowTokenReptile() {
    btnSubZero.classList.remove("selected");
    btnReptile.classList.add("selected");
    addTokenReptile();
    token_1.src = "../img/4_in_line/reptile.webp";
}
