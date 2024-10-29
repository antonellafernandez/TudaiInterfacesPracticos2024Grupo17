class Box {
    /**
     * Constructor de un casillero.
     * @param {number} posX Posición x.
     * @param {number} posY Posición y.
     * @param {number} size Tamaño.
     * @param {string} src URL de la imagen vacía.
     * @param {HTMLImageElement} token1 Imagen del token 1.
     * @param {HTMLImageElement} token2 Imagen del token 2.
     * @param {CanvasRenderingContext2D} ctx Contexto del canvas.
     */
    constructor(posX, posY, size, src, token1, token2, ctx) {
        this._ctx = ctx;
        this._posX = posX;
        this._posY = posY;
        this._size = size;

        // Cargar imágenes
        this._img_empty = new Image();
        this._img_empty.src = '../EntregaFinal/img/4_in_line/frost.jpeg';
        this._img_empty.onload = function() {
            // Imagen cargada correctamente
        };
        this._img_empty.onerror = function() {
            console.error('Error cargando imagen empty');
        };

        this._token1 = new Image();
        this._token1.src = '../EntregaFinal/img/4_in_line/frost.jpeg';
        this._token1.onload = function() {
            // Imagen cargada correctamente
        };
        this._token1.onerror = function() {
            console.error('Error cargando imagen token1');
        };

        this._token2 = new Image();
        this._token2.src = '../EntregaFinal/img/4_in_line/fire.jpeg';
        this._token2.onload = function() {
            // Imagen cargada correctamente
        };
        this._token2.onerror = function() {
            console.error('Error cargando imagen token2');
        };
    }

    /**
     * Getters y Setters.
     */
    get posX() {
        return this._posX;
    }

    set posX(value) {
        this._posX = value;
    }

    get posY() {
        return this._posY;
    }

    set posY(value) {
        this._posY = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get src() {
        return this._src;
    }

    set src(value) {
        this._src = value;
    }

    get token1() {
        return this._token1;
    }

    set token1(value) {
        this._token1 = value;
    }

    get token2() {
        return this._token2;
    }

    set token2(value) {
        this._token2 = value;
    }

    get ctx() {
        return this._ctx;
    }

    set ctx(value) {
        this._ctx = value;
    }

    get img_empty() {
        return this._img_empty;
    }

    set img_empty(value) {
        this._img_empty = value;
    }

    get isSet() {
        return this._isSet;
    }

    set isSet(value) {
        this._isSet = value;
    }

    get player() {
        return this._player;
    }

    set player(value) {
        this._player = value;
    }

    /**
     * Dibuja el casillero.
     */
    draw() {
        const radius = 20; // Radio del token

        // Dibujar imagen vacía
        this._ctx.drawImage(
            this._img_empty,
            this._posX,
            this._posY,
            this._size,
            this._size
        );

        if (this._isSet && this._player === 1) {
            // Dibujar token 1
            this._ctx.drawImage(
                this._token1,
                this._posX + (this._size - radius * 2) / 2,
                this._posY + (this._size - radius * 2) / 2,
                radius * 2,
                radius * 2
            );
        } else if (this._isSet && this._player === 2) {
            // Dibujar token 2
            this._ctx.drawImage(
                this._token2,
                this._posX + (this._size - radius * 2) / 2,
                this._posY + (this._size - radius * 2) / 2,
                radius * 2,
                radius * 2
            );
        }
    }
}

export default Box;
