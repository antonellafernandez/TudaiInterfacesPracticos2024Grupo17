// Variables globales canvas
let tablero = document.getElementById('tablero');
let ctx = tablero.getContext('2d');
// Establecer el tamaño del canvas
tablero.width = 1920; // Ancho fijo
tablero.height = 1080; // Altura fija

// Variables globales otras
let opciones = document.getElementById('opciones');
let fichas = [];
let jugadorActual = 1; // 1 para SubZero, 2 para Scorpion
let ganador = null;
let fila = 6;
let columna = 7;
let linea = 4;
let tamanoCelda = 100;
let fichaArrastrando = null;
let posicionFichaArrastrando = null;
let hints = [];




////////////////////////////////////////////////////////////////// Crear fichas
// Variable de fichas disponibles
let fichasDisponibles = {
    subZero: 6, // Suponiendo que comienzas con 6 fichas de SubZero
    scorpion: 6   // Y 6 fichas de Scorpion
};

// Variables para las imágenes de las fichas
let fichaSubZeroImg = new Image();
let fichaScorpionImg = new Image();

// Cargar las imágenes de las fichas /////////////// ACÁ PONER LAS OPCIONES DE IMAGENES FICHA!
fichaSubZeroImg.src = 'img/sub-zero-1-token.png';
fichaScorpionImg.src = 'img/scorpion-1-token.png';

// Asegúrate de que las imágenes estén completamente cargadas antes de iniciar el juego
Promise.all([fichaSubZeroImg.decode(), fichaScorpionImg.decode()])
    .then(() => {
        cargarFondo();
        dibujarTablero();
    });

// Función para dibujar las fichas en el tablero
function dibujarFichas() {
    for (let i = 0; i < fichas.length; i++) {
        let ficha = fichas[i];
        let img = ficha.jugador === 1 ? fichaSubZeroImg : fichaScorpionImg;

        // Calcular las coordenadas del centro de la ficha
        const centerX = ficha.x * tamanoCelda + tamanoCelda / 2;
        const centerY = ficha.y * tamanoCelda + tamanoCelda / 2;

        // Guardar el estado actual del contexto
        ctx.save();

        // Dibujar el círculo para el recorte
        ctx.beginPath();
        ctx.arc(centerX, centerY, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip(); // Recortar a la forma del círculo

        // Dibujar la imagen de la ficha
        ctx.drawImage(img, ficha.x * tamanoCelda + 5, ficha.y * tamanoCelda + 5, tamanoCelda - 10, tamanoCelda - 10);

        // Restaurar el contexto al estado anterior
        ctx.restore();
    }

    if (fichaArrastrando) {
        let img = jugadorActual === 1 ? fichaSubZeroImg : fichaScorpionImg;

        // Calcular las coordenadas del centro de la ficha arrastrando
        const centerX = Math.floor(posicionFichaArrastrando.x / tamanoCelda) * tamanoCelda + tamanoCelda / 2;
        const centerY = Math.floor(posicionFichaArrastrando.y / tamanoCelda) * tamanoCelda + tamanoCelda / 2;

        // Guardar el estado actual del contexto
        ctx.save();

        // Dibujar el círculo para el recorte
        ctx.beginPath();
        ctx.arc(centerX, centerY, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip(); // Recortar a la forma del círculo

        // Dibujar la imagen de la ficha arrastrando
        ctx.drawImage(img, Math.floor(posicionFichaArrastrando.x / tamanoCelda) * tamanoCelda + 5, Math.floor(posicionFichaArrastrando.y / tamanoCelda) * tamanoCelda + 5, tamanoCelda - 10, tamanoCelda - 10);

        // Restaurar el contexto al estado anterior
        ctx.restore();
    }
}




////////////////////////////////////////////////////////////////// Crear hints
// Función para generar los hints de colocación
function generarHints() {
    hints = [];
    for (let j = 1; j <= columna; j++) {
        let i = fila - 1;
        while (i >= 0 && fichas.find(f => f.x === j && f.y === i)) {
            i--;
        }
        if (i >= 0) {
            hints.push({ x: j, y: i, color: jugadorActual === 1 ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 0, 255, 0.3)' });
        }
    }
}

// Función para dibujar los hints
function dibujarHints() {
    ctx.globalAlpha = 0.4; // Establecer opacidad antes de dibujar
    for (let hint of hints) {
        // Obtener las coordenadas del hint
        const x = hint.x * tamanoCelda + tamanoCelda / 2; // Centro del círculo
        const y = hint.y * tamanoCelda + tamanoCelda / 2; // Centro del círculo
        const radius = (tamanoCelda - 10) / 2; // Radio del círculo

        ctx.save(); // Guardar el contexto actual

        // Dibujar el círculo
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.clip(); // Recortar el contexto a este círculo

        // Dibujar la imagen dentro del círculo
        ctx.drawImage(
            hint.color === 'rgba(255, 0, 0, 0.3)' ? fichaSubZeroImg : fichaScorpionImg,
            hint.x * tamanoCelda + 5,
            hint.y * tamanoCelda + 5,
            tamanoCelda - 10,
            tamanoCelda - 10
        );

        ctx.restore(); // Restaurar el contexto para permitir otros dibujos
    }
    ctx.globalAlpha = 1.0; // Restablecer opacidad
}




////////////////////////////////////////////////////////////////// Crear tablero
// Variable para la imagen de fondo del tablero
let fondoImg = new Image();

// Función para cargar la imagen de fondo dependiendo del modo
function cargarFondo() {
    switch (linea) {
        case 4:
            fondoImg.src = 'img/dead-pool.webp'; // Cambia a la ruta correcta
            break;
        case 5:
            fondoImg.src = 'img/jinsei-chamber.webp'; // Cambia a la ruta correcta
            break;
        case 6:
            fondoImg.src = 'img/khans-arena.webp'; // Cambia a la ruta correcta
            break;
        case 7:
            fondoImg.src = 'img/sea-of-blood.webp'; // Cambia a la ruta correcta
            break;
    }

    // Esperar a que la imagen se cargue
    fondoImg.onload = () => {
        dibujarTablero(); // Llama a dibujarTablero aquí
    };
    fondoImg.onerror = () => {
        console.error('Error al cargar la imagen: ' + fondoImg.src);
    };
}

// Función para dibujar el tablero
function dibujarTablero() {
    // Usar el tamaño fijo del canvas
    ctx.clearRect(0, 0, tablero.width, tablero.height);

    // Dibujar imagen de fondo
    ctx.drawImage(fondoImg, 0, 0, tablero.width, tablero.height);

    // Dibujar celdas del tablero como círculos
    for (let i = 0; i < fila; i++) {
        for (let j = 1; j <= columna; j++) { // Empezamos desde 1 para dejar espacio en los bordes
            ctx.beginPath();
            ctx.arc(j * tamanoCelda + tamanoCelda / 2, i * tamanoCelda + tamanoCelda / 2, tamanoCelda / 2 - 5, 0, Math.PI * 2);
            ctx.fillStyle = '#fff'; // Color de fondo de las celdas
            ctx.fill();
            ctx.strokeStyle = '#000'; // Color del borde
            ctx.stroke();
        }
    }

    // Dibujar fichas iniciales a la izquierda (SubZero) y a la derecha (Scorpion)
    for (let i = 0; i < fichasDisponibles.subZero; i++) {
        ctx.save(); // Guardar el estado del contexto
        ctx.beginPath(); // Comenzar un nuevo camino
        ctx.arc(0 * tamanoCelda + tamanoCelda / 2, i * tamanoCelda + tamanoCelda / 2, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.clip(); // Recortar a la forma del círculo
        ctx.drawImage(fichaSubZeroImg, 0 * tamanoCelda + 5, i * tamanoCelda + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore(); // Restaurar el contexto
    }

    for (let i = 0; i < fichasDisponibles.scorpion; i++) {
        ctx.save(); // Guardar el estado del contexto
        ctx.beginPath(); // Comenzar un nuevo camino
        ctx.arc((columna + 1) * tamanoCelda + tamanoCelda / 2, i * tamanoCelda + tamanoCelda / 2, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.clip(); // Recortar a la forma del círculo
        ctx.drawImage(fichaScorpionImg, (columna + 1) * tamanoCelda + 5, i * tamanoCelda + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore(); // Restaurar el contexto
    }

    dibujarFichas();
    generarHints(); // Generar los hints después de dibujar el tablero
    dibujarHints(); // Dibujar los hints en el tablero
}

// Función para contar fichas consecutivas
function contarFichas(x, y, dx, dy, jugador) {
    let count = 0;
    let i = 0;

    // Contar en una dirección
    while (fichas.find(f => f.x === x + i * dx && f.y === y + i * dy && f.jugador === jugador)) {
        count++;
        i++;
    }
    i = 1;

    // Contar en la dirección opuesta
    while (fichas.find(f => f.x === x - i * dx && f.y === y - i * dy && f.jugador === jugador)) {
        count++;
        i++;
    }

    return count;
}




////////////////////////////////////////////////////////////////// Comprobar ganador y reiniciar si lo hay
////////////////////////////////////////////////////////////////// MODIFICAR EL REINICIO PARA QUE PONGA
////////////////////////////////////////////////////////////////// FICHAS DEPENDIENDO EL MODO QUE SE ESTABA JUGANDO!
// Función para reiniciar el juego
function reiniciarJuego() {
    // Reiniciar variables
    fichas = [];
    jugadorActual = 1; // 1 para SubZero, 2 para Scorpion
    ganador = null;
    hints = [];
    fichasDisponibles = {
        subZero: 6, // Suponiendo que comienzas con 6 fichas de SubZero
        scorpion: 6   // Y 6 fichas de Scorpion
    };

    // Reiniciar el tablero
    cargarFondo();
    dibujarTablero();
}

// Modificar la función comprobarGanador
function comprobarGanador() {
    for (let i = 0; i < fichas.length; i++) {
        let ficha = fichas[i];

        // Comprobar horizontal
        if (contarFichas(ficha.x, ficha.y, 1, 0, ficha.jugador) >= linea) {
            alert(`El jugador ${ficha.jugador === 1 ? 'subZero' : 'scorpion'} ha ganado!`);
            reiniciarJuego(); // Llamar a reiniciar el juego
            return;
        }
        // Comprobar vertical
        if (contarFichas(ficha.x, ficha.y, 0, 1, ficha.jugador) >= linea) {
            alert(`El jugador ${ficha.jugador === 1 ? 'subZero' : 'scorpion'} ha ganado!`);
            reiniciarJuego(); // Llamar a reiniciar el juego
            return;
        }
        // Comprobar diagonal (diagonal izquierda a derecha)
        if (contarFichas(ficha.x, ficha.y, 1, 1, ficha.jugador) >= linea) {
            alert(`El jugador ${ficha.jugador === 1 ? 'subZero' : 'scorpion'} ha ganado!`);
            reiniciarJuego(); // Llamar a reiniciar el juego
            return;
        }
        // Comprobar diagonal (diagonal derecha a izquierda)
        if (contarFichas(ficha.x, ficha.y, -1, 1, ficha.jugador) >= linea) {
            alert(`El jugador ${ficha.jugador === 1 ? 'subZero' : 'scorpion'} ha ganado!`);
            reiniciarJuego(); // Llamar a reiniciar el juego
            return;
        }
    }
}




////////////////////////////////////////////////////////////////// Eventos mousedown mousemove mouseup
// Función para manejar el arrastre de fichas
tablero.addEventListener('mousedown', (event) => {
    let x = Math.floor(event.offsetX / tamanoCelda);
    let y = Math.floor(event.offsetY / tamanoCelda);

    // Determinar si la ficha es del color correcto para el turno actual
    if ((x === 0 && jugadorActual === 1) || (x === columna + 1 && jugadorActual === 2)) {
        fichaArrastrando = { jugador: jugadorActual, x, y };
        posicionFichaArrastrando = { x: event.offsetX, y: event.offsetY };
    }
});

tablero.addEventListener('mousemove', (event) => {
    if (fichaArrastrando) {
        posicionFichaArrastrando = { x: event.offsetX, y: event.offsetY };
        dibujarTablero();
    }
});

// Función para manejar el evento de soltar la ficha
tablero.addEventListener('mouseup', (event) => {
    if (fichaArrastrando) {
        let x = Math.floor(event.offsetX / tamanoCelda);

        // Buscar la posición más baja en la columna
        let y = fila - 1;
        while (y >= 0 && fichas.find(f => f.x === x && f.y === y)) {
            y--;
        }

        if (y >= 0 && (x > 0 && x <= columna)) {
            // Iniciar la animación de caída hacia la posición calculada
            animarCaidaFicha(x, y, jugadorActual);
        }

        fichaArrastrando = null;
    }
});




////////////////////////////////////////////////////////////////// Animación caída
// Variables para la animación de caída
let gravedad = 0.5; // Aceleración hacia el hint
let velocidadY = 0; // Velocidad vertical de la ficha
let fichaAnimando = null; // Ficha en caída animada
let posicionDestino = null; // Destino del hint

// Función para iniciar la animación de caída
function animarCaidaFicha(destinoX, destinoY, jugador) {
    fichaAnimando = { x: destinoX * tamanoCelda + tamanoCelda / 2, y: 0, jugador }; // Iniciar en la parte superior de la columna
    posicionDestino = { x: destinoX * tamanoCelda + tamanoCelda / 2, y: destinoY * tamanoCelda + tamanoCelda / 2 };
    velocidadY = 0; // Reinicia la velocidad para cada ficha
    requestAnimationFrame(actualizarCaidaFicha);
}

// Función para actualizar la posición de la ficha en caída
function actualizarCaidaFicha() {
    if (fichaAnimando) {
        // Calcular la siguiente posición
        fichaAnimando.y += velocidadY;
        velocidadY += gravedad;

        // Si ha alcanzado el destino, detén la animación y coloca la ficha
        if (fichaAnimando.y >= posicionDestino.y) {
            let posX = Math.floor(posicionDestino.x / tamanoCelda);
            let posY = Math.floor(posicionDestino.y / tamanoCelda);
            fichas.push({ x: posX, y: posY, jugador: fichaAnimando.jugador });
            fichaAnimando = null;
            posicionDestino = null;

            // Comprobar si hay un ganador
            comprobarGanador(posX, posY, jugadorActual)

            // Cambiar el turno al otro jugador
            jugadorActual = jugadorActual === 1 ? 2 : 1;

            // Dibujar el tablero y el próximo hint
            dibujarTablero();
            generarHints();
            dibujarHints();
            return;
        }

        // Dibujar el tablero y la ficha en caída en su nueva posición
        dibujarTablero();
        ctx.save();
        ctx.beginPath();
        ctx.arc(fichaAnimando.x, fichaAnimando.y, tamanoCelda / 2 - 5, 0, Math.PI * 2);
        ctx.clip();
        let img = fichaAnimando.jugador === 1 ? fichaSubZeroImg : fichaScorpionImg;
        ctx.drawImage(img, fichaAnimando.x - tamanoCelda / 2 + 5, fichaAnimando.y - tamanoCelda / 2 + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore();

        requestAnimationFrame(actualizarCaidaFicha); // Continuar la animación
    }
}





// Función para manejar el cambio de modo y cargar la imagen de fondo correspondiente
function cambiarModo(nuevoModo) {
    switch (nuevoModo) {
        case '4enlinea':
            fila = 6;
            columna = 7;
            linea = 4;
            break;
        case '5enlinea':
            fila = 7;
            columna = 8;
            linea = 5;
            break;
        case '6enlinea':
            fila = 8;
            columna = 9;
            linea = 6;
            break;
        case '7enlinea':
            fila = 9;
            columna = 10;
            linea = 7;
            break;
    }
    // Actualiza la cantidad de fichas disponibles para cada jugador igual al número de filas
    fichasDisponibles.subZero = fila;
    fichasDisponibles.scorpion = fila;

    fichas = [];
    jugadorActual = 1;
    ganador = null;
    cargarFondo(); // Cargar la nueva imagen de fondo
    dibujarTablero();
}

// Eventos para cambiar de modo
document.getElementById('4enlinea').addEventListener('click', () => cambiarModo('4enlinea'));
document.getElementById('5enlinea').addEventListener('click', () => cambiarModo('5enlinea'));
document.getElementById('6enlinea').addEventListener('click', () => cambiarModo('6enlinea'));
document.getElementById('7enlinea').addEventListener('click', () => cambiarModo('7enlinea'));

// Inicializar
cargarFondo(); // Cargar la imagen de fondo inicial
dibujarTablero();
