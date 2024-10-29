class Token {
    constructor(img, player) {
        this.img = img;
        this.player = player;
        this.createToken();
    }

    // Método para crear el token
    createToken() {
        const tokenHtml = document.createElement('div');
        tokenHtml.classList.add('token');
        tokenHtml.style.backgroundImage = `url(${this.img})`;

        const playerTokens = document.getElementById(`${this.player}-tokens`);
        playerTokens.appendChild(tokenHtml);
    }
}

window.Token = Token;
