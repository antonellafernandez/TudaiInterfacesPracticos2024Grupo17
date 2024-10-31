class Ficha {
    constructor(canvasContext, imageSrc, player, x, y, size) {
        this.canvasContext = canvasContext;
        this.img = new Image();
        this.img.src = imageSrc;
        this.player = player;
        this.x = x;
        this.y = y;
        this.size = size;
        this.isDragging = false; // Indica si la ficha está siendo arrastrada
    }

    // Método que se llama al iniciar el arrastre
    onDragStart(mouseX, mouseY) {
        this.isDragging = true;
        this.offsetX = mouseX - this.x;
        this.offsetY = mouseY - this.y;
    }

    // Método para manejar el movimiento de la ficha
    onDrag(mouseX, mouseY) {
        if (this.isDragging) {
            this.x = mouseX - this.offsetX;
            this.y = mouseY - this.offsetY;
        }
    }

    // Método para manejar la finalización del arrastre
    onDrop() {
        this.isDragging = false;
    }

    draw() {
        // Dibuja un círculo en lugar de una imagen rectangular
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.clip(); // Asegúrate de que se recorte al círculo

        const tokenImage = new Image();
        tokenImage.src = this.img;
        tokenImage.onload = () => {
            this.ctx.drawImage(tokenImage, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        };
        
        // Dibuja el borde del círculo (opcional)
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }
}

window.Ficha = Ficha;