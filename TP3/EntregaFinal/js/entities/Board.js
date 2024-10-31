class Board {
    constructor(rows, cols, canvasContext, cellWidth, cellHeight) {
        this.rows = rows;
        this.cols = cols;
        this.canvasContext = canvasContext;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(null)); // Inicializa el tablero vacío

        // Carga las imágenes de los tokens
        this.player1TokenImage = new Image();
        this.player1TokenImage.src = player1Token; // Asegúrate de que player1Token esté definido antes de usarlo
        this.player2TokenImage = new Image();
        this.player2TokenImage.src = player2Token; // Asegúrate de que player2Token esté definido antes de usarlo
    }

    // Método para obtener la siguiente fila disponible en una columna
    getNextAvailableRow(col) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.grid[row][col] === null) {
                return row; // Retorna la fila disponible
            }
        }
        return -1; // Retorna -1 si la columna está llena
    }

    // Método para dibujar el tablero
    draw(boardImage) {
        // Dibuja el fondo del tablero
        const background = new Image();
        background.src = boardImage;
        background.onload = () => {
            // Limpia el canvas antes de dibujar
            this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
            
            // Dibuja la imagen de fondo del tablero
            this.canvasContext.drawImage(background, 0, 0, this.cellWidth * this.cols, this.cellHeight * this.rows);
            
            // Dibuja las celdas
            this.canvasContext.strokeStyle = 'black'; // Establecer el color del borde de las celdas
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    this.canvasContext.strokeRect(col * this.cellWidth, row * this.cellHeight, this.cellWidth, this.cellHeight);
                }
            }
            
            // Llama a la función para dibujar las fichas colocadas en el tablero
            this.drawPlacedTokens();
        };
    }

    // Método para colocar una ficha en el tablero
    placeToken(col, player) {
        const row = this.getNextAvailableRow(col); // Usa el nuevo método para obtener la fila disponible
        if (row !== -1) {
            this.grid[row][col] = player; // Guarda el jugador (1 o 2) en la celda
            return true; // Retorna true si la colocación fue exitosa
        }
        return false; // Retorna false si no se pudo colocar la ficha
    }

    // Método para dibujar las fichas colocadas en el tablero
    drawPlacedTokens() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.grid[row][col] !== null) {
                    // Usa el token correspondiente ya cargado
                    const tokenImage = this.grid[row][col] === 1 ? this.player1TokenImage : this.player2TokenImage;
                    
                    // Dibuja el token en la posición correspondiente
                    this.canvasContext.drawImage(tokenImage, col * this.cellWidth, row * this.cellHeight, this.cellWidth, this.cellHeight);
                }
            }
        }
    }
}

// Hacer que la clase Board esté disponible globalmente
window.Board = Board;

