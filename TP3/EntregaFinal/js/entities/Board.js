class Board {
    constructor(rows, cols, img) {
        this.rows = rows; // Número de filas
        this.cols = cols; // Número de columnas
        this.img = img;   // Ruta de la imagen de fondo
        this.board = [];  // Matriz que representa el tablero
        this.createBoard(); // Llama al método para crear el tablero
    }

    // Método para crear el tablero
    createBoard() {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.cols; j++) {
                row.push(null); // Inicializa la celda como nula
            }
            this.board.push(row); // Añade la fila al tablero
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

        // Establece la imagen de fondo
        const boardContainer = document.getElementById('board-container');
        boardContainer.style.backgroundImage = `url(${this.img})`;
        boardContainer.style.backgroundSize = 'cover';
        boardContainer.style.backgroundRepeat = 'no-repeat';

        // Establecer estilos adicionales para que las celdas se vean correctamente
        this.setCellStyles();
    }

    // Método para establecer estilos de las celdas
    setCellStyles() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.style.width = `${100 / this.cols}%`; // Ajusta el ancho de cada celda
            cell.style.height = `${100 / this.rows}vh`; // Ajusta la altura de cada celda
            cell.style.position = 'relative'; // Para posicionar correctamente las fichas
            cell.style.border = '1px solid rgba(255, 255, 255, 0.5)'; // Bordes de las celdas
        });
    }

    // Método para obtener la fila disponible en una columna
    getAvailableRow(column) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.board[row][column] === null) {
                return row; // Retorna la fila disponible
            }
        }
        return -1; // No hay filas disponibles
    }

    // Método para agregar una ficha en el tablero
    placePiece(row, column, piece) {
        if (this.board[row][column] === null) {
            this.board[row][column] = piece; // Coloca la ficha en la matriz
            return true; // Ficha colocada con éxito
        }
        return false; // No se pudo colocar la ficha
    }

    // Método para verificar si hay un ganador (simplificado)
    checkWinner() {
        // Implementación de lógica de ganador (horizontal, vertical, diagonal)
        // Debes adaptarlo según tus reglas de juego.
        return null; // Retorna el ganador o null si no hay
    }
}

// Hacer que la clase Board esté disponible globalmente
window.Board = Board;
