class Box {
    constructor(posX, posY, size, src, token_1, token_2) {
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.img_empty = document.createElement("img"); // Crear en el dom elemento img
        this.img_empty.src = src;
        this.token_1 = token_1;
        this.token_2 = token_2;

        this.isSet = false;
        this.player = 0;
    }

    set(player) {
        this.isSet = true;
        this.player = player;
    }
    getPlayer(){
        return this.player;
    }

    getIsSet() {
        return this.isSet;
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    draw() {
        let radius = 20;
        ctx.drawImage(
            this.img_empty,
            this.posX + 240,
            this.posY + this.size * 2,
            this.size,
            this.size
        );

        if (this.isSet && this.player == 1 ) {
            console.log("Token Value " + token_1)
            ctx.drawImage(
                token_1,
                this.posX + 240,
                this.posY + this.size * 2,
                radius * 2.5,
                radius * 2.5
            );
        } else if (this.isSet  && this.player == 2) {
            console.log("Token Value " + token_2)

            ctx.drawImage(
                token_2,
                this.posX + 240,
                this.posY + this.size * 2,
                radius * 2.5,
                radius * 2.5
            )
        }
    }
}
