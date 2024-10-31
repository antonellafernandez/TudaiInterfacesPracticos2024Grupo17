// Selección de elementos HTML
const initialScreen = document.getElementById("initial-screen");
const gameScreen = document.getElementById("game-screen");
const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");
const startGameButton = document.getElementById("start-game");
const turnIndicator = document.getElementById("turn-indicator");
const canvas = document.getElementById("main-canvas");
const ctx = canvas.getContext("2d");


// Variables globales
let selectedRows = 6;
let selectedCols = 7;
let boardImage = '';
let player1Token = '';
let player2Token = '';
let currentPlayer = 1;
const SRC_ARENA = [
    '../EntregaFinal/img/4_in_line/dead-pool.webp',
    '../EntregaFinal/img/4_in_line/jinsei-chamber.webp',
    '../EntregaFinal/img/4_in_line/khans-arena.webp',
    '../EntregaFinal/img/4_in_line/sea-of-blood.webp'
];

// Clase para el tablero
let board;

// Configurar los botones de selección de tablero
const modeButtons = [
    { button: 'btn-connect4', rows: 6, cols: 7, image: SRC_ARENA[0] },
    { button: 'btn-connect5', rows: 7, cols: 8, image: SRC_ARENA[1] },
    { button: 'btn-connect6', rows: 8, cols: 9, image: SRC_ARENA[2] },
    { button: 'btn-connect7', rows: 9, cols: 10, image: SRC_ARENA[3] },
];

// Asignar eventos a los botones de selección de tablero
modeButtons.forEach(mode => {
    document.getElementById(mode.button).addEventListener('click', () => {
        selectedRows = mode.rows;
        selectedCols = mode.cols;
        boardImage = mode.image;
    });
});

// Configurar los botones de selección de fichas para cada jugador
const toggleButtonsPlayer1 = document.querySelectorAll('.token-toggle-player1');
toggleButtonsPlayer1.forEach(button => {
    button.addEventListener('click', () => {
        player1Token = button.dataset.token;
        toggleActiveButton(toggleButtonsPlayer1, button); // Resalta el botón seleccionado
    });
});

const toggleButtonsPlayer2 = document.querySelectorAll('.token-toggle-player2');
toggleButtonsPlayer2.forEach(button => {
    button.addEventListener('click', () => {
        player2Token = button.dataset.token;
        toggleActiveButton(toggleButtonsPlayer2, button); // Resalta el botón seleccionado
    });
});

// Función para resaltar el botón seleccionado
function toggleActiveButton(buttons, activeButton) {
    buttons.forEach(button => button.classList.remove('active'));
    activeButton.classList.add('active');
}

// Función para configurar y comenzar el juego
function initializeGame() {
    // Obtener nombres de los jugadores
    const player1Name = player1NameInput.value || 'Jugador 1';
    const player2Name = player2NameInput.value || 'Jugador 2';

    // Mostrar la pantalla del juego y ocultar la pantalla inicial
    initialScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    // Actualiza los nombres mostrados en el HTML
    document.getElementById('player1-name-display').innerText = `Fichas de ${player1Name}`;
    document.getElementById('player2-name-display').innerText = `Fichas de ${player2Name}`;

    // Configurar el indicador de turno
    turnIndicator.innerText = `Turno de ${player1Name}`;

    // Inicializar el tablero
    canvas.width = selectedCols * 80; // Ajusta el ancho total del canvas (80 es el tamaño de las celdas)
    canvas.height = selectedRows * 80 * 0.8; // Ajusta el alto total del canvas (70% del tamaño de las celdas)

    const cellWidth = canvas.width / selectedCols;  // Ancho de cada celda
    const cellHeight = canvas.height / selectedRows; // Alto de cada celda

    // Calcular el número de fichas por jugador
    const totalCells = selectedRows * selectedCols;
    const tokensPerPlayer = totalCells / 2; // La mitad de las celdas para cada jugador

    board = new Board(selectedRows, selectedCols, ctx, cellWidth, cellHeight);
    
    // Dibujar el tablero y las fichas seleccionadas
    board.draw(boardImage);
    setPlayerTokenImages(tokensPerPlayer); // Pasa el cálculo a la función
}


// Evento para el botón de inicio que llama a la función `initializeGame`
startGameButton.addEventListener('click', initializeGame);

// Función para cargar las fichas seleccionadas en el área de cada jugador
function setPlayerTokenImages(tokensPerPlayer) {
    const player1TokenImg = document.getElementById('player1-token-img');
    const player2TokenImg = document.getElementById('player2-token-img');

    // Asignar las imágenes de las fichas seleccionadas a cada contenedor
    player1TokenImg.innerHTML = ''; // Limpiar contenido anterior
    player2TokenImg.innerHTML = ''; // Limpiar contenido anterior

    for (let i = 0; i < tokensPerPlayer; i++) {
        const token1 = document.createElement('div');
        token1.className = 'draggable-token'; // Añadir clase para estilos
        token1.style.backgroundImage = `url(${player1Token})`;
        token1.style.width = '50px';
        token1.style.height = '50px';
        player1TokenImg.appendChild(token1); // Agregar al contenedor correcto

        const token2 = document.createElement('div');
        token2.className = 'draggable-token'; // Añadir clase para estilos
        token2.style.backgroundImage = `url(${player2Token})`;
        token2.style.width = '50px';
        token2.style.height = '50px';
        player2TokenImg.appendChild(token2); // Agregar al contenedor correcto
    }
}

// Función para dibujar las fichas en el área de arrastre de cada jugador
function drawTokens(container, tokenImage, count) {
    container.innerHTML = ''; // Limpia el contenedor antes de agregar fichas

    for (let i = 0; i < count; i++) {
        const tokenDiv = document.createElement('div');
        tokenDiv.classList.add('draggable-token');
        tokenDiv.style.backgroundImage = `url(${tokenImage})`;
        tokenDiv.style.width = '50px';
        tokenDiv.style.height = '50px';
        tokenDiv.style.margin = '5px'; // Espaciado entre fichas
        container.appendChild(tokenDiv); // Agrega la ficha al contenedor
    }
}
