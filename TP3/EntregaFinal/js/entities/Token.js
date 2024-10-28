class Token {
    constructor(posX, posY, fill, context) {
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.selected = false;
        this.styleSelected = '';
        this.ctx = context;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getPosition() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        };
    }

    setPosition (x, y) {
        this.posX = x;
        this.posY = y;
    }

    getFill() {
        return this.fill;
    }

    setFill(fill) {
        this.fill = fill;
    }

    setSelected(selected) {
        this.selected = selected;
    }

    draw() {
        this.ctx.fillStyle = this.fill
    }

    isPointInside(x,y) {

    }
}
