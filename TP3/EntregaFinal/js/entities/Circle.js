class Circle extends Token {
    constructor(posX, posY, radius, img, ctx, player) {
        super(posX, posY, null, ctx);
        this.radius = radius;
        this.img = img;
        this.initialPosX = posX;
        this.initialPosY = posY;
        this.player = player;
    }

    getRadius() {
        return this.radius;
    }

    setRadius(radius) {
        this.radius = radius;
    }

    getPlayer() {
        return this.player;
    }

    setPlayer(player) {
        this.player = player;
    }

    resetPosition() {
        this.setPosition(this.initialPosX, this.initialPosY);
    }

    drawCircle() {
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath();
    }

    drawImage() {
        if (this.img) {
            this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
        }
    }

    draw() {
        super.draw();
        this.drawCircle();
        this.drawImage();

        if (this.selected) {
            this.ctx.strokeStyle = this.styleSelected;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.hypot(_x, _y) < this.radius;
    }
}
