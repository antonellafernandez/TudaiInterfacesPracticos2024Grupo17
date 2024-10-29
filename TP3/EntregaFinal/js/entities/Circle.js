import Token from './Token.js';

class Circle extends Token {
    /**
     * Constructor de un círculo.
     * @param {number} posX Posición x.
     * @param {number} posY Posición y.
     * @param {number} radius Radio.
     * @param {HTMLImageElement} img Imagen.
     * @param {CanvasRenderingContext2D} ctx Contexto del canvas.
     * @param {string} player Jugador.
     */
    constructor(posX, posY, radius, img, ctx, player) {
        super(posX, posY, null, ctx);
        this.initialPosX = posX;
        this.initialPosY = posY;
        this._posX = posX;
        this._posY = posY;
        this._radius = radius;
        this._img = img;
        this._ctx = ctx;
        this._player = player;
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

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
    }

    get img() {
        return this._img;
    }

    set img(value) {
        this._img = value;
    }

    get ctx() {
        return this._ctx;
    }

    set ctx(value) {
        this._ctx = value;
    }

    get player() {
        return this._player;
    }

    set player(value) {
        this._player = value;
    }

    /**
     * Dibuja la forma del círculo.
     */
    drawShape() {
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this._radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();

        if (this._img) {
            this.ctx.drawImage(this._img, this.posX - this._radius, this.posY - this._radius, this._radius * 2, this._radius * 2);
        }
    }
}

export default Circle;
