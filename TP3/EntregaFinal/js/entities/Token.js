class Token {
    /**
     * Constructor de un token.
     * @param {number} posX Posición x.
     * @param {number} posY Posición y.
     * @param {string} fill Color de relleno.
     * @param {CanvasRenderingContext2D} context Contexto del canvas.
     */
    constructor(posX, posY, fill, context) {
        this._selected = false;
        this._styleSelected = '';
        this.ctx = context;
        this._posX = posX;
        this._posY = posY;
        this._fill = fill;
        this._context = context;
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

    get fill() {
        return this._fill;
    }

    set fill(value) {
        this._fill = value;
    }

    get context() {
        return this._context;
    }

    set context(value) {
        this._context = value;
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        this._selected = value;
    }

    get styleSelected() {
        return this._styleSelected;
    }

    set styleSelected(value) {
        this._styleSelected = value;
    }

    /**
     * Dibuja la forma del token.
     */
    drawShape() {
        throw new Error('Método abstracto, debe ser implementado por las clases que hereden de Token.');
    }

    /**
     * Dibuja el token.
     */
    draw() {
        this.ctx.fillStyle = this._fill;
        this.drawShape();

        if (this._selected) {
            this.ctx.strokeStyle = this._styleSelected;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }
}

export default Token;
