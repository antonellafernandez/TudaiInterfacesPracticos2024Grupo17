/// Crear Tablero
// Src imágenes de fondo
const SRC_ARENA_1 = '../EntregaFinal/img/4_in_line/dead-pool.webp';
const SRC_ARENA_2 = '../EntregaFinal/img/4_in_line/jinsei-chamber.webp';
const SRC_ARENA_3 = '../EntregaFinal/img/4_in_line/khans-arena.webp';
const SRC_ARENA_4 = '../EntregaFinal/img/4_in_line/sea-of-blood.webp';

// Event listeners para los botones de opción de tablero
document.getElementById('btn-connect4').addEventListener('click', () => {
    const board = new window.Board(6, 7, SRC_ARENA_1);
    board.drawBoard();
});

document.getElementById('btn-connect5').addEventListener('click', () => {
    const board = new window.Board(7, 8, SRC_ARENA_2);
    board.drawBoard();
});

document.getElementById('btn-connect6').addEventListener('click', () => {
    const board = new window.Board(8, 9, SRC_ARENA_3);
    board.drawBoard();
});

document.getElementById('btn-connect7').addEventListener('click', () => {
    const board = new window.Board(9, 10, SRC_ARENA_4);
    board.drawBoard();
});

/// Crear Tokens
// Src imágenes de token
const SRC_TOKEN_1 = '../EntregaFinal/img/4_in_line/sub-zero-1-token.png';
const SRC_TOKEN_2 = '../EntregaFinal/img/4_in_line/sub-zero-2-token.png';
const SRC_TOKEN_3 = '../EntregaFinal/img/4_in_line/scorpion-1-token.png';
const SRC_TOKEN_4 = '../EntregaFinal/img/4_in_line/scorpion-2-token.png';

// Event listeners para los botones de opción de tokens
document.getElementById('btn-token-11').addEventListener('click', () => {
    for (let i = 0; i < 20; i++) {
        const token = new window.Token(SRC_TOKEN_1, 'player1');
    }
});

document.getElementById('btn-token-12').addEventListener('click', () => {
    for (let i = 0; i < 20; i++) {
        const token = new window.Token(SRC_TOKEN_2, 'player1');
    }
});

document.getElementById('btn-token-21').addEventListener('click', () => {
    for (let i = 0; i < 20; i++) {
        const token = new window.Token(SRC_TOKEN_3, 'player2');
    }
});

document.getElementById('btn-token-22').addEventListener('click', () => {
    for (let i = 0; i < 20; i++) {
        const token = new window.Token(SRC_TOKEN_4, 'player2');
    }
});
