class Ficha {
    constructor(ctx, imagePath, playerNumber, index, totalSlots, size = 50) {
        this.ctx = ctx;
        this.imagePath = imagePath;
        this.playerNumber = playerNumber;
        this.size = size;
        this.isDragging = false;
        this.index = index; // Agregamos el índice para posicionar la ficha
        this.setPosition(totalSlots); // Llamamos al método para establecer la posición inicial
    }

    draw() {
        const image = new Image();
        image.src = this.imagePath;
        image.onload = () => {
            this.ctx.drawImage(image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        };
    }

    onDragStart(mouseX, mouseY) {
        this.isDragging = true;
        this.x = mouseX;
        this.y = mouseY;
    }

    onDrag(mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;
        this.draw(); // Redibuja la ficha en la nueva posición
    }

    onDrop() {
        this.isDragging = false;
        this.draw(); // Redibuja la ficha después de soltarla
    }

    setPosition(totalSlots) {
        const fichasPorFila = 6; // Número de fichas por fila
        const spacing = 10;       // Espacio entre fichas
        const startX = this.playerNumber === 1 
            ? (this.ctx.canvas.width / 2 - 150) // Espacio a la izquierda del tablero
            : (this.ctx.canvas.width / 2 + 50); // Espacio a la derecha del tablero
        
        const fila = Math.floor(this.index / fichasPorFila);  // Determina la fila actual
        const col = this.index % fichasPorFila;               // Determina la columna actual

        this.x = startX + col * (this.size + spacing);
        this.y = (this.ctx.canvas.height / 2 - 100) + fila * (this.size + spacing); // Centrar verticalmente
    }
}

window.Ficha = Ficha;