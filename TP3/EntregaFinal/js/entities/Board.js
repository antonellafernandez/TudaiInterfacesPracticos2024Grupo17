class Board {
    constructor(x, y, lineMode) {
        this.MaxFil = y; // x
        this.MaxCol = x; // y
        this.board = []; // Matriz del tablero
        this.size = 50; // Tamaño de la celda
        this.dropboxX = 240;
        this.dropboxY = 100 - this.size;
        this.dropBoxXMax = this.dropboxX + this.size * (x + 1);
        this.dropBoxYMax = this.size + this.dropboxY;
        this.lineMode = lineMode;
    }

    buildBoard() {
        let src = "../img/4_in_line/frost.jpeg";

        for (let fil = 0; fil < this.MaxFil; fil++) {
            this.board[fil] = []; // En cada pos de la fila crea un arreglo para columna

            for (let col = 0; col < this.MaxCol; col++) {
                if (col >= this.MaxCol / 2) {
                    src = "../img/4_in_line/frost.jpeg";
                } else {
                    src = "../img/4_in_line/fire.jpeg";
                }
                this.board[fil][col] = new Box(
                    fil * this.size,
                    col * this.size,
                    this.size,
                    src
                ); // Crear celda y darle tamaño
            }
        }
    }

    drawBoard() {
        for (let fil = 0; fil < this.MaxFil; fil++) {
            for (let col = 0; col < this.MaxCol; col++) {
                this.board[fil][col].draw();
            }
        }
    }

    putToken(moveX, player) {
        let isSeted = false;

        for (let y = 0; y < this.MaxFil - 1; y++) {
            isSeted = this.board[moveX][y].getIsSet();
            console.log(this.MaxFil);

            if (isSeted && y == 0) {
                // Para que no se pase del límite de columna llena
                return -1;
            } else if (isSeted) {
                // Para que no se superponga una arriba de la otra

                this.board[moveX][y - 1].set(player);

                return y - 1;
            } else if (y == this.MaxFil - 2) {
                // Preguntar si no hay token en la columna
                console.log();
                this.board[moveX][y].set(player);

                return y;
            }
        }
        return true;
    }

    isIn(x, y) {
        if (
            x > this.dropboxX &&
            x < this.dropBoxXMax &&
            y < this.dropBoxYMax &&
            y > this.dropboxY
        ) {
            return true;
        } else {
            return false;
        }
    }

    dropToken(x, player) {
        let positions = [];
        let ini = x - this.dropboxX;
        let posX = Math.floor(ini / this.size);
        let posY = this.putToken(posX, player);

        if (posY != -1) {
            positions.push(posX, posY);
            return (positions = [posX, posY]);
        } else {
            return -1;
        }
    }

    isLine(line,player) {
        let samePieces = 0;

        for (let i = 0; i < line.length; i++) {
            console.log(line);
            if (line[i].isSet && line[i].getPlayer() == player) {
                samePieces++;

                if (samePieces >= this.lineMode) {
                    return true;
                }
            } else {
                samePieces = 0;
            }
        }
        console.log("samePieces:", samePieces);
        return false;
    }

    CheckVertical(moveX,player) {
        console.log("Check vertical column", moveX);

        let line = [];

        for (let y = 0; y < this.MaxFil - 1; y++) {
            console.log("Hello");
            line.push(this.board[moveX][y]);
            console.log(this.board[moveX][y]);
        }

        let isLine = this.isLine(line,player);

        if (isLine) {
            console.log("Vertical line has been done");
        }

        return isLine;
    }

    CheckHorizontal(moveY,player) {
        console.log("Check horizontal column", moveY);

        let line = [];

        for (let x = 0; x < this.MaxCol - 1; x++) {
            console.log("Enter");
            console.log(this.board[x][moveY]);

            line.push(this.board[x][moveY]);
        }

        let isLine = this.isLine(line,player);

        if (isLine) {
            console.log("Horizontal line has been done");
        }

        return isLine;
    }

    CheckDiagonal(moveX, moveY,player) {
        console.log("Diagonal check");

        let line = []; // Arreglo vacío que almacena tokens en diagonal
        let x = 0;
        let y = 0;

        if (moveX < moveY) { // Detectar coordenada del token
            y = moveY - moveX;

        } else if (moveX > moveY) {
            x = moveX - moveY;
        }

        for (let i = 0; x + i < this.MaxCol -1  && y + i < this.MaxFil -1 ; i++) { // Recorrer diagonal descendente
            line.push(this.board[x + i][y + i]);
        }

        if (this.isLine(line,player)) { // Verificar si hay diagonal descendente
            return true;
        } else {
            line = [];
        }

        if (moveX + moveY >= this.MaxCol) {
            x = this.MaxCol - 1;
            y = moveX + moveY - (this.MaxCol - 1);
        } else {
            x = moveX + moveY;
            y = 0;
        }

        for (let i = 0; x - i >= 0 && y + i < this.MaxFil -1 ; i++) { // Recorrer diagonal ascendente
            line.push(this.board[x - i][y + i]);
        }

        if (this.isLine(line)) { // Verificar diagonal ascendente
            return true;
        } else {
            return false;
        }

        if (isLine) {
            console.log("Diagonal line has been done");
        }

    }

    checkWinner(moveX, moveY,player) {
        this.CheckHorizontal(moveY,player);
        this.CheckVertical(moveX,player);
        this.CheckDiagonal(moveX, moveY,player);

        if (this.CheckVertical(moveX,player) || this.CheckHorizontal(moveY,player) || this.CheckDiagonal(moveX, moveY,player)) {
            return true;
        } else {
            return false;
        }
    }
}
