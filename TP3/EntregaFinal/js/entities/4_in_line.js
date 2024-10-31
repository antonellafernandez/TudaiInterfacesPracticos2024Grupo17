const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

// Selección de elementos HTML
const initialScreen = document.getElementById("initial-screen");
const gameScreen = document.getElementById("game-screen");
const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");
const startGameButton = document.getElementById("start-game");
const player1TokenContainer = document.getElementById("player1-token");
const player2TokenContainer = document.getElementById("player2-token");

// Variables globales
let selectedRows = 6;
let selectedCols = 7;
let boardWidth = 800; // Ancho del tablero
let boardHeight = 600; // Alto del tablero
let cellWidth; // Ancho de las celdas
let cellHeight; // Alto de las celdas
let boardImage = '';
let player1Token = '';
let player2Token = '';
let currentPlayer = 1;
let draggingFicha = null; // Definición de la variable global
let timeRemaining = 180; 

// Declaración del tablero
let board; 

// Arreglos para las fichas de los jugadores
let player1Tokens = []; // Array para almacenar fichas del jugador 1
let player2Tokens = []; // Array para almacenar fichas del jugador 2

// Configurar los botones de selección de tablero
const modeButtons = [
    { button: 'btn-connect4', rows: 6, cols: 7, image: '../EntregaFinal/img/4_in_line/dead-pool.webp' },
    { button: 'btn-connect5', rows: 7, cols: 8, image: '../EntregaFinal/img/4_in_line/jinsei-chamber.webp' },
    { button: 'btn-connect6', rows: 8, cols: 9, image: '../EntregaFinal/img/4_in_line/khans-arena.webp' },
    { button: 'btn-connect7', rows: 9, cols: 10, image: '../EntregaFinal/img/4_in_line/sea-of-blood.webp' },
];

// Agregar eventos para los botones de modo de juego
modeButtons.forEach(({ button, rows, cols, image }) => {
    document.getElementById(button).addEventListener('click', () => {
        selectedRows = rows;
        selectedCols = cols;
        boardImage = image; // Establecer la imagen del tablero al hacer clic
        console.log(`Tablero configurado a ${selectedRows} filas y ${selectedCols} columnas con imagen ${boardImage}`);
    });
});

// Inicializar el juego
function initializeGame() {
    const player1Name = player1NameInput.value || 'Jugador 1';
    const player2Name = player2NameInput.value || 'Jugador 2';

    if (!player1Token || !player2Token) {
        alert("Por favor selecciona fichas para ambos jugadores.");
        return;
    }

    // Establecer el tamaño del canvas
    canvas.width = window.innerWidth; // Ancho total del canvas
    canvas.height = window.innerHeight; // Alto total del canvas

    // Calcular el tamaño de las celdas
    cellWidth = boardWidth / selectedCols; // Ancho de las celdas
    cellHeight = boardHeight / selectedRows; // Alto de las celdas

    initialScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    // Crea el tablero
    board = new Board(selectedRows, selectedCols, ctx, boardImage);
    board.draw(); // Dibuja el tablero
    createPlayerTokens();
    drawGame();
}

// Crear fichas para ambos jugadores
function createPlayerTokens() {
    const tokensPerPlayer = Math.floor((selectedRows * selectedCols) / 2);
    createTokensForPlayer(player1Tokens, player1Token, 1, 50, tokensPerPlayer);
    createTokensForPlayer(player2Tokens, player2Token, 2, canvas.width - 100, tokensPerPlayer);
}

// Función auxiliar para crear fichas para un jugador
function createTokensForPlayer(tokensArray, tokenImage, playerNumber, xPosition, tokensPerPlayer) {
    for (let i = 0; i < tokensPerPlayer; i++) {
        const yPosition = 50 + (i * 30); // Disminuye el espaciado entre fichas a 50
        const token = new Ficha(ctx, tokenImage, playerNumber, xPosition, yPosition, 50);
        tokensArray.push(token);
        token.draw(); // Dibuja la ficha
    }
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeRemaining -= 1;
        updateTimerDisplay(); // Actualiza solo el temporizador

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endGame(); // Termina el juego en empate cuando se acaba el tiempo
        }
    }, 1000); // Actualiza cada segundo
}

function endGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGame();
    ctx.fillStyle = '#333'; // Color del texto
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('¡Tiempo agotado! El juego ha terminado en empate', canvas.width / 2, 100);
}

// Función de dibujo principal que muestra el tablero, fichas y título
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo del canvas
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    board.draw(); // Dibuja el tablero

    // Dibuja las fichas de los jugadores a los lados
    drawPlayerTokens(player1Tokens, 30); // Fichas del jugador 1 a la izquierda
    drawPlayerTokens(player2Tokens, canvas.width - 130); // Fichas del jugador 2 a la derecha


    // Llama a la función que actualiza el temporizador
    updateTimerDisplay();
}

function updateTimerDisplay() {
    // Asegurarse de que el fondo cubre todo el área del temporizador
    ctx.fillStyle = '#f0f0f0'; // Usa el mismo color del fondo principal
    ctx.fillRect(canvas.width / 2 - 120, 50, 240, 60); // Ajusta el tamaño del rectángulo para cubrir completamente el temporizador

    // Texto del temporizador
    ctx.fillStyle = '#333'; // Color del texto
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
        timeRemaining > 0
            ? `Tiempo restante: ${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`
            : 'Juego en empate',
        canvas.width / 2,
        85 // Ajusta la posición vertical del texto del temporizador
    );
}


// Método para dibujar las fichas de un jugador en una posición dada
function drawPlayerTokens(tokens, startX) {
    tokens.forEach((token, index) => {
        const yOffset = index * 45; // Espacio vertical entre fichas (ajustado)
        token.y = 50 + yOffset; // Actualiza la posición Y de la ficha
        token.x = startX; // Establece la posición X
        token.draw(); // Dibuja la ficha en la nueva posición
    });
}

// Controlar eventos de movimiento de ficha en el canvas
canvas.addEventListener('mousemove', (e) => {
    if (draggingFicha && draggingFicha.isDragging) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        board.draw(); // Asegúrate de redibujar el tablero
        draggingFicha.onDrag(mouseX, mouseY);
        drawPlayerTokens(player1Tokens, 30); // Redibujar fichas del jugador 1
        drawPlayerTokens(player2Tokens, canvas.width - 130); // Redibujar fichas del jugador 2
        drawGame(); // Llama a drawGame para dibujar todo nuevamente
    }
});

// Controlar evento para soltar la ficha en el tablero
canvas.addEventListener('mouseup', (e) => {
    if (draggingFicha && draggingFicha.isDragging) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const col = Math.floor(mouseX / cellWidth); // Usar cellWidth calculado

        if (board.placeToken(col, currentPlayer)) {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            drawGame(); // Redibuja el tablero con la ficha colocada
        }

        draggingFicha = null;
    }
});

// Evento para seleccionar los tokens de los jugadores
const player1TokenButtons = document.querySelectorAll('.token-toggle-player1');
const player2TokenButtons = document.querySelectorAll('.token-toggle-player2');

player1TokenButtons.forEach(button => {
    button.addEventListener('click', () => {
        player1Token = button.dataset.token; // Almacena la ruta de la imagen del token seleccionado
        highlightSelectedToken(button, player1TokenButtons); // Resalta el token seleccionado
        console.log('Jugador 1 seleccionó token:', player1Token);
    });
});

player2TokenButtons.forEach(button => {
    button.addEventListener('click', () => {
        player2Token = button.dataset.token; // Almacena la ruta de la imagen del token seleccionado
        highlightSelectedToken(button, player2TokenButtons); // Resalta el token seleccionado
        console.log('Jugador 2 seleccionó token:', player2Token);
    });
});

// Resaltar el token seleccionado
function highlightSelectedToken(selectedButton, allButtons) {
    allButtons.forEach(button => {
        button.classList.remove('selected');
    });
    selectedButton.classList.add('selected');
}

// Iniciar el juego y el temporizador al hacer clic en "Iniciar Juego"
startGameButton.addEventListener('click', () => {
    initializeGame();
    startTimer(); // Inicia el temporizador después de la configuración del juego
});