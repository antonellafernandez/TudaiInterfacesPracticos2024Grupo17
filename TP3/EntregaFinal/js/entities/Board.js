import Box from './Box.js';

class Board {
    /**
     * Constructor del tablero.
     * @param {number} columns Número de columnas.
     * @param {number} rows Número de filas.
     * @param {number} lineMode Número de fichas en línea para ganar.
     */
    constructor(columns, rows, lineMode, ctx) {
        this.maxRows = rows;
        this.maxColumns = columns;
        this._board = []; // Matriz del tablero
        this._size = 50; // Tamaño de la celda
        this._dropboxX = 240;
        this._dropboxY = 100 - this._size;
        this._dropBoxXMax = this._dropboxX + this._size * (columns + 1);
        this._dropBoxYMax = this._size + this._dropboxY;
        this._columns = columns;
        this._rows = rows;
        this._lineMode = lineMode;
        this._ctx = ctx;
    }

    /**
     * Getters y Setters.
     */
    get columns() {
        return this._columns;
    }

    set columns(value) {
        this._columns = value;
    }

    get rows() {
        return this._rows;
    }

    set rows(value) {
        this._rows = value;
    }

    get lineMode() {
        return this._lineMode;
    }

    set lineMode(value) {
        this._lineMode = value;
    }

    get board() {
        return this._board;
    }

    set board(value) {
        this._board = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get dropboxX() {
        return this._dropboxX;
    }

    set dropboxX(value) {
        this._dropboxX = value;
    }

    get dropboxY() {
        return this._dropboxY;
    }

    set dropboxY(value) {
        this._dropboxY = value;
    }

    get dropBoxXMax() {
        return this._dropBoxXMax;
    }

    set dropBoxXMax(value) {
        this._dropBoxXMax = value;
    }

    get dropBoxYMax() {
        return this._dropBoxYMax;
    }

    set dropBoxYMax(value) {
        this._dropBoxYMax = value;
    }

    /**
     * Crea el tablero.
     */
    buildBoard() {
        let src = "../img/4_in_line/frost.jpeg";

        for (let row = 0; row < this.maxRows; row++) {
            this._board[row] = [];

            for (let col = 0; col < this.maxColumns; col++) {
                if (col >= this.maxColumns / 2) {
                    src = "../../img/4_in_line/frost.jpeg";
                } else {
                    src = "../../img/4_in_line/fire.jpeg";
                }
                this._board[row][col] = new Box(
                    row * this._size,
                    col * this._size,
                    this._size,
                    src,
                    null,
                    null,
                    this._ctx
                );
            }
        }
    }

    /**
     * Dibuja el tablero.
     */
    drawBoard() {
        for (let row = 0; row < this.maxRows; row++) {
            for (let col = 0; col < this.maxColumns; col++) {
                this._board[row][col].draw();
            }
        }
    }

    /**
     * Coloca una ficha en el tablero.
     * @param {number} moveX Coordenada x.
     * @param {Player} player Jugador que coloca la ficha.
     * @returns {number} Posición de la ficha.
     */
    putToken(moveX, player) {
        let isSeted = false;

        for (let y = 0; y < this.maxRows - 1; y++) {
            isSeted = this._board[y][moveX].getIsSet();

            if (isSeted && y == 0) {
                // Para que no se pase del límite de columna llena
                return -1;
            } else if (isSeted) {
                // Para que no se superponga una arriba de la otra

                this._board[y - 1][moveX].set(player);

                return y - 1;
            } else if (y == this.maxRows - 2) {
                // Preguntar si no hay token en la columna
                this._board[y][moveX].set(player);

                return y;
            }
        }
        return true;
    }

    /**
     * Verifica si una posición está dentro del área de drop.
     * @param {number} x Coordenada x.
     * @param {number} y Coordenada y.
     * @returns {boolean} Verdadero si la posición está dentro del área de drop.
     */
    isIn(x, y) {
        return (
            x > this._dropboxX &&
            x < this._dropBoxXMax &&
            y < this._dropBoxYMax &&
            y > this._dropboxY
        );
    }

    /**
     * Suelta una ficha en el tablero.
     * @param {number} x Coordenada x.
     * @param {Player} player Jugador que suelta la ficha.
     * @returns {Array<number>} Posición de la ficha.
     */
    dropToken(x, player) {
        let positions = [];
        let ini = x - this._dropboxX;
        let posX = Math.floor(ini / this._size);
        let posY = this.putToken(posX, player);

        if (posY != -1) {
            positions.push(posX, posY);
            return positions;
        } else {
            return -1;
        }
    }

    /**
     * Verifica si hay una línea de fichas.
     * @param {Array<Box>} line Línea de fichas.
     * @param {Player} player Jugador que verifica.
     * @returns {boolean} Verdadero si hay una línea de fichas.
     */
    isLine(line, player) {
        let samePieces = 0;

        for (let i = 0; i < line.length; i++) {
            if (line[i].isSet && line[i].getPlayer() == player) {
                samePieces++;

                if (samePieces >= this._lineMode) {
                    return true;
                }
            } else {
                samePieces = 0;
            }
        }
        return false;
    }

    /**
     * Verifica si hay una línea vertical de fichas.
     * @param {number} moveX Coordenada x.
     * @param {Player} player Jugador que verifica.
     * @returns {boolean} Verdadero si hay una línea vertical de fichas.
     */
    checkVertical(moveX, player) {
        let line = [];

        for (let y = 0; y < this.maxRows - 1; y++) {
            line.push(this._board[y][moveX]);
        }

        return this.isLine(line, player);
    }

    /**
     * Verifica si hay una línea horizontal de fichas.
     * @param {number} moveY Coordenada y.
     * @param {Player} player Jugador que verifica.
     * @returns {boolean} Verdadero si hay una línea horizontal de fichas.
     */
    checkHorizontal(moveY, player) {
        let line = [];

        for (let x = 0; x < this.maxColumns - 1; x++) {
            line.push(this._board[moveY][x]);
        }

        return this.isLine(line, player);
    }

    /**
     * Verifica si hay una línea diagonal de fichas.
     * @param {number} moveX Coordenada x.
     * @param {number} moveY Coordenada y.
     * @param {Player} player Jugador que verifica.
     * @returns {boolean} Verdadero si hay una línea diagonal de fichas.
     */
    checkDiagonal(moveX, moveY, player) {
        let line = [];
        let x = 0;
        let y = 0;

        if (moveX < moveY) {
            y = moveY - moveX;
        } else if (moveX > moveY) {
            x = moveX - moveY;
        }

        for (let i = 0; x + i < this.maxColumns - 1 && y + i < this.maxRows - 1; i++) {
            line.push(this._board[x + i][y + i]);
        }

        if (this.isLine(line, player)) {
            return true;
        } else {
            line = [];
        }

        if (moveX + moveY >= this.maxColumns) {
            x = this.maxColumns - 1;
            y = moveX + moveY - (this.maxColumns - 1);
        } else {
            x = moveX + moveY;
            y = 0;
        }

        for (let i = 0; x - i >= 0 && y + i < this.maxRows - 1; i++) {
            line.push(this._board[x - i][y + i]);
        }

        return this.isLine(line, player);
    }

    /**
     * Verifica si hay un ganador.
     * @param {number} moveX Coordenada x.
     * @param {number} moveY Coordenada y.
     * @param {Player} player Jugador que verifica.
     * @returns {boolean} Verdadero si hay un ganador.
     */
    checkWinner(moveX, moveY, player) {
        return (
            this.checkVertical(moveX, player) ||
            this.checkHorizontal(moveY, player) ||
            this.checkDiagonal(moveX, moveY, player)
        );
    }
}

export default Board;
