class Board {
    constructor(rows, cols, img) {
        this.rows = rows;
        this.cols = cols;
        this.img = img;
        this.board = [];
        this.createBoard();
    }

    // Método para crear el tablero
    createBoard() {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.cols; j++) {
                row.push('');
            }
            this.board.push(row);
        }
    }

    // Método para dibujar el tablero en el HTML
    drawBoard() {
        let boardHtml = '';
        for (let i = 0; i < this.rows; i++) {
            boardHtml += '<div class="row">';
            for (let j = 0; j < this.cols; j++) {
                boardHtml += `<div class="cell" id="cell-${i}-${j}"></div>`;
            }
            boardHtml += '</div>';
        }
        document.getElementById('board-container').innerHTML = boardHtml;

        // Agregar estilo para establecer la imagen de fondo
        document.getElementById('board-container').style.backgroundImage = `url(${this.img})`;
        document.getElementById('board-container').style.backgroundSize = 'cover';
        document.getElementById('board-container').style.backgroundRepeat = 'no-repeat';
    }
}

window.Board = Board;
