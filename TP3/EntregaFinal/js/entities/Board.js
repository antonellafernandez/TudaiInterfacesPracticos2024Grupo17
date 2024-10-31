class Board {
    constructor(rows, cols, ctx, imagePath) {
        this.rows = rows;
        this.cols = cols;
        this.ctx = ctx;
        this.imagePath = imagePath;
        this.board = Array.from({ length: rows }, () => Array(cols).fill(0)); // Inicializa el tablero
        this.draw(); // Dibuja el tablero al inicializar
    }

    draw() {
        const image = new Image();
        image.src = this.imagePath;
        image.onload = () => {
            // Calcula el área donde dibujar el tablero
            const boardWidth = this.cols * cellWidth;
            const boardHeight = this.rows * cellHeight;
            const startX = (this.ctx.canvas.width - boardWidth) / 2; // Centrar el tablero
            const startY = (this.ctx.canvas.height - boardHeight) / 2; // Centrar el tablero

            // Dibuja la imagen del tablero en el área calculada
            this.ctx.drawImage(image, startX, startY, boardWidth, boardHeight);

            // Dibuja las líneas del tablero
            this.ctx.strokeStyle = 'black';
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    this.ctx.strokeRect(startX + col * cellWidth, startY + row * cellHeight, cellWidth, cellHeight);
                }
            }
        };
    }

    placeToken(col, player) {
        // Lógica para colocar una ficha en el tablero
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.board[row][col] === 0) {
                this.board[row][col] = player; // Coloca la ficha del jugador
                return true; // Retorna true si la ficha fue colocada
            }
        }
        return false; // Retorna false si no se pudo colocar
    }
}

window.Board = Board; // Exponer la clase Ficha globalmente
