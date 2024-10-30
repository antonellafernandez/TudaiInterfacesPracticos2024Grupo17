let selectedRows = 6;
let selectedCols = 7;
let boardImage = '';
let player1Token = '';
let player2Token = '';
let player1Name = '';
let player2Name = '';
let currentPlayer = 1;

// Src imágenes de fondo
const SRC_ARENA_1 = '../EntregaFinal/img/4_in_line/dead-pool.webp';
const SRC_ARENA_2 = '../EntregaFinal/img/4_in_line/jinsei-chamber.webp';
const SRC_ARENA_3 = '../EntregaFinal/img/4_in_line/khans-arena.webp';
const SRC_ARENA_4 = '../EntregaFinal/img/4_in_line/sea-of-blood.webp';

// Elementos HTML
const initialScreen = document.getElementById("initial-screen");
const gameScreen = document.getElementById("game-screen");
const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");
const startGameButton = document.getElementById("start-game");
const turnIndicator = document.getElementById("turn-indicator");
const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");

// Tamaño de tablero y fondo según el modo seleccionado
document.getElementById('btn-connect4').addEventListener('click', () => { 
    selectedRows = 6; 
    selectedCols = 7; 
    boardImage = SRC_ARENA_1; 
});
document.getElementById('btn-connect5').addEventListener('click', () => { 
    selectedRows = 7; 
    selectedCols = 8; 
    boardImage = SRC_ARENA_2; 
});
document.getElementById('btn-connect6').addEventListener('click', () => { 
    selectedRows = 8; 
    selectedCols = 9; 
    boardImage = SRC_ARENA_3; 
});
document.getElementById('btn-connect7').addEventListener('click', () => { 
    selectedRows = 9; 
    selectedCols = 10; 
    boardImage = SRC_ARENA_4; 
});

// Selección de fichas para cada jugador
document.getElementById('btn-token-11').addEventListener('click', () => { player1Token = './images/sub-zero-1-token.png'; });
document.getElementById('btn-token-12').addEventListener('click', () => { player1Token = './images/sub-zero-2-token.png'; });
document.getElementById('btn-token-21').addEventListener('click', () => { player2Token = './images/scorpion-1-token.png'; });
document.getElementById('btn-token-22').addEventListener('click', () => { player2Token = './images/scorpion-2-token.png'; });

// Iniciar el juego
startGameButton.addEventListener('click', () => {
    player1Name = player1NameInput.value || 'Jugador 1';
    player2Name = player2NameInput.value || 'Jugador 2';

    // Ocultar pantalla inicial y mostrar pantalla del juego
    initialScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    // Indicar turno del jugador
    turnIndicator.innerText = `Turno de ${player1Name}`;
    
    // Crear el tablero y dibujarlo
    drawBoard();

    // Agregar event listeners al canvas
    canvas.addEventListener('click', handleCanvasClick);
});

// Dibujar el tablero
function drawBoard() {
    const cellWidth = canvas.width / selectedCols;
    const cellHeight = canvas.height / selectedRows;

    // Dibujar la imagen de fondo
    const background = new Image();
    background.src = boardImage;
    background.onload = () => {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Dibujar las celdas vacías
        for (let row = 0; row < selectedRows; row++) {
            for (let col = 0; col < selectedCols; col++) {
                ctx.strokeStyle = '#000'; // Color del borde
                ctx.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight); // Dibujar borde
            }
        }
    };
}

// Manejar el clic en el canvas
function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const cellWidth = canvas.width / selectedCols;
    const cellHeight = canvas.height / selectedRows;

    const col = Math.floor(x / cellWidth);
    const row = findAvailableRow(col); // Encuentra la fila disponible en la columna seleccionada

    if (row !== -1) {
        const token = currentPlayer === 1 ? player1Token : player2Token;

        // Dibujar la ficha en la celda correspondiente
        const tokenImage = new Image();
        tokenImage.src = token;
        tokenImage.onload = () => {
            ctx.drawImage(tokenImage, col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        };

        // Cambiar el turno
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        turnIndicator.innerText = `Turno de ${currentPlayer === 1 ? player1Name : player2Name}`;
    }
}

// Buscar la fila disponible en la columna seleccionada
function findAvailableRow(col) {
    for (let row = selectedRows - 1; row >= 0; row--) {
        // Comprobar si la celda está vacía (puedes implementar una lógica más avanzada para almacenar el estado del juego)
        const imageData = ctx.getImageData(col * (canvas.width / selectedCols), row * (canvas.height / selectedRows), canvas.width / selectedCols, canvas.height / selectedRows);
        const isEmpty = imageData.data.every(value => value === 0); // Verifica si es transparente

        if (isEmpty) {
            return row; // Devuelve la fila disponible
        }
    }
    return -1; // No hay espacio disponible
}

// Reiniciar juego
document.getElementById("restart-game").addEventListener("click", () => {
    // Reiniciar variables
    selectedRows = 6;
    selectedCols = 7;
    boardImage = '';
    player1Token = '';
    player2Token = '';
    player1Name = '';
    player2Name = '';
    currentPlayer = 1;

    // Ocultar pantalla del juego y mostrar pantalla inicial
    initialScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    
    // Limpiar nombres de los jugadores
    player1NameInput.value = '';
    player2NameInput.value = '';
    turnIndicator.innerText = '';
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
});
