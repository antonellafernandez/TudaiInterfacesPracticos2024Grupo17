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
let currentPlayer = 1; // Inicializa el jugador actual en 1
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

    // Limpiar fichas anteriores
    player1TokenImg.innerHTML = ''; // Limpia las fichas del jugador 1
    player2TokenImg.innerHTML = ''; // Limpia las fichas del jugador 2

    // Crear las fichas para el jugador 1
    for (let i = 0; i < tokensPerPlayer; i++) {
        createDraggableToken(player1TokenImg, player1Token, '1'); // Crea la ficha para el jugador 1
    }

    // Crear las fichas para el jugador 2
    for (let i = 0; i < tokensPerPlayer; i++) {
        createDraggableToken(player2TokenImg, player2Token, '2'); // Crea la ficha para el jugador 2
    }
}

// Función para crear y agregar fichas arrastrables
function createDraggableToken(container, tokenImage, playerNumber) {
    const tokenDiv = document.createElement('div');
    tokenDiv.className = 'draggable-token'; // Añadir clase para estilos
    tokenDiv.style.backgroundImage = `url(${tokenImage})`;
    tokenDiv.setAttribute('data-player', playerNumber); // Asigna el número de jugador al token

    // Agregar eventos de mouse para arrastrar
    tokenDiv.draggable = true;

    tokenDiv.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', tokenImage); // Guarda la imagen para usarla al soltar
        e.dataTransfer.setData('text/player', playerNumber); // Envía el número del jugador
        e.dataTransfer.setDragImage(tokenDiv, 20, 20); // Ajusta la imagen que se arrastra
        tokenDiv.classList.add('dragging'); // Añade una clase para cambiar el estilo si es necesario
    });

    tokenDiv.addEventListener('dragend', () => {
        tokenDiv.classList.remove('dragging'); // Elimina la clase al soltar
    });

    container.appendChild(tokenDiv); // Agrega la ficha al contenedor
}

// Evento de drop en el tablero
canvas.addEventListener('dragover', (e) => {
    e.preventDefault(); // Necesario para permitir el drop
});

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const tokenImage = e.dataTransfer.getData('text/plain'); // Obtiene la imagen de la ficha

    // Lógica para determinar dónde colocar la ficha en el tablero
    const rect = canvas.getBoundingClientRect(); // Obtiene la posición del canvas
    const x = e.clientX - rect.left; // Coordenada X relativa
    const col = Math.floor(x / (canvas.width / selectedCols)); // Determina la columna

    // Coloca la ficha en el tablero
    if (board.placeToken(col, currentPlayer)) {
        board.draw(boardImage); // Redibuja el tablero usando la función draw de la clase Board
        currentPlayer = currentPlayer === 1 ? 2 : 1; // Cambia el turno
        const player1Name = player1NameInput.value || 'Jugador 1';
        const player2Name = player2NameInput.value || 'Jugador 2';
        turnIndicator.innerText = `Turno de ${currentPlayer === 1 ? player1Name : player2Name}`;
    }
});

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
