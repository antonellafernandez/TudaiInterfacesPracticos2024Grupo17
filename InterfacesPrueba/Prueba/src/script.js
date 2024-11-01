// Variables globales
let tablero = document.getElementById('tablero');
let ctx = tablero.getContext('2d');
let opciones = document.getElementById('opciones');
let fichas = [];
let jugadorActual = 1; // 1 para rojo, 2 para azul
let ganador = null;
let fila = 6;
let columna = 7;
let linea = 4;
let tamanoCelda = 100;
let fichaArrastrando = null;
let posicionFichaArrastrando = null;
let hints = [];

// Variable de fichas disponibles
let fichasDisponibles = {
    rojo: 6, // Suponiendo que comienzas con 6 fichas rojas
    azul: 6   // Y 6 fichas azules
};

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

// Variables para las imágenes de las fichas
let fichaRojaImg = new Image();
let fichaAzulImg = new Image();

// Cargar las imágenes de las fichas
fichaRojaImg.src = 'img/sub-zero-1-token.png'; // Cambia a la ruta correcta
fichaAzulImg.src = 'img/scorpion-1-token.png'; // Cambia a la ruta correcta

// Asegúrate de que las imágenes estén completamente cargadas antes de iniciar el juego
Promise.all([fichaRojaImg.decode(), fichaAzulImg.decode()])
    .then(() => {
        cargarFondo();
        dibujarTablero();
    });

// Función para dibujar el tablero
function dibujarTablero() {
    tablero.width = (columna + 2) * tamanoCelda; // Añadimos 2 columnas: una a la izquierda y otra a la derecha para las fichas iniciales
    tablero.height = fila * tamanoCelda;
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

    // Dibujar fichas iniciales a la izquierda (rojas) y a la derecha (azules)
    for (let i = 0; i < fichasDisponibles.rojo; i++) {
        ctx.save(); // Guardar el estado del contexto
        ctx.beginPath(); // Comenzar un nuevo camino
        ctx.arc(0 * tamanoCelda + tamanoCelda / 2, i * tamanoCelda + tamanoCelda / 2, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.clip(); // Recortar a la forma del círculo
        ctx.drawImage(fichaRojaImg, 0 * tamanoCelda + 5, i * tamanoCelda + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore(); // Restaurar el contexto
    }
    for (let i = 0; i < fichasDisponibles.azul; i++) {
        ctx.save(); // Guardar el estado del contexto
        ctx.beginPath(); // Comenzar un nuevo camino
        ctx.arc((columna + 1) * tamanoCelda + tamanoCelda / 2, i * tamanoCelda + tamanoCelda / 2, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.clip(); // Recortar a la forma del círculo
        ctx.drawImage(fichaAzulImg, (columna + 1) * tamanoCelda + 5, i * tamanoCelda + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore(); // Restaurar el contexto
    }

    dibujarFichas();
    generarHints(); // Generar los hints después de dibujar el tablero
    dibujarHints(); // Dibujar los hints en el tablero
}

// Función para dibujar las fichas en el tablero
function dibujarFichas() {
    for (let i = 0; i < fichas.length; i++) {
        let ficha = fichas[i];
        let img = ficha.jugador === 1 ? fichaRojaImg : fichaAzulImg;

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
        let img = jugadorActual === 1 ? fichaRojaImg : fichaAzulImg;

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
            hint.color === 'rgba(255, 0, 0, 0.3)' ? fichaRojaImg : fichaAzulImg,
            hint.x * tamanoCelda + 5,
            hint.y * tamanoCelda + 5,
            tamanoCelda - 10,
            tamanoCelda - 10
        );

        ctx.restore(); // Restaurar el contexto para permitir otros dibujos
    }
    ctx.globalAlpha = 1.0; // Restablecer opacidad
}

function comprobarGanador() {
    for (let i = 0; i < fichas.length; i++) {
        let ficha = fichas[i];

        // Comprobar horizontal
        if (contarFichas(ficha.x, ficha.y, 1, 0, ficha.jugador) >= linea) {
            alert(`El jugador ${ficha.jugador === 1 ? 'rojo' : 'azul'} ha ganado!`);
            return;
        }
        // Comprobar vertical
        if (contarFichas(ficha.x, ficha.y, 0, 1, ficha.jugador) >= linea) {
            alert(`El jugador ${ficha.jugador === 1 ? 'rojo' : 'azul'} ha ganado!`);
            return;
        }
        // Comprobar diagonal (diagonal izquierda a derecha)
        if (contarFichas(ficha.x, ficha.y, 1, 1, ficha.jugador) >= linea) {
            alert(`El jugador ${ficha.jugador === 1 ? 'rojo' : 'azul'} ha ganado!`);
            return;
        }
        // Comprobar diagonal (diagonal derecha a izquierda)
        if (contarFichas(ficha.x, ficha.y, 1, -1, ficha.jugador) >= linea) {
            alert(`El jugador ${ficha.jugador === 1 ? 'rojo' : 'azul'} ha ganado!`);
            return;
        }
    }
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
tablero.addEventListener('mouseup', () => {
    if (fichaArrastrando) {
        let x = Math.floor(posicionFichaArrastrando.x / tamanoCelda);

        // Verifica si se suelta en una columna válida
        if (x > 0 && x <= columna) {
            // Encuentra el hint correspondiente a la columna donde se soltó la ficha
            let hint = hints.find(h => h.x === x);
            if (hint) {
                // Coloca la ficha en la posición del hint
                fichaArrastrando.x = x; // Coloca en la columna seleccionada
                fichaArrastrando.y = hint.y; // Coloca en la fila correspondiente del hint
                fichas.push(fichaArrastrando); // Agrega la nueva ficha al tablero

                // Eliminar la ficha de la columna de fichas iniciales
                if (fichaArrastrando.jugador === 1) { // Ficha roja
                    // Eliminar la última ficha roja (la de arriba)
                    fichasDisponibles.rojo--;
                } else { // Ficha azul
                    // Eliminar la última ficha azul (la de arriba)
                    fichasDisponibles.azul--;
                }

                jugadorActual = jugadorActual === 1 ? 2 : 1; // Cambiar el turno después de colocar la ficha
            }
        }

        fichaArrastrando = null;
        posicionFichaArrastrando = null;
        dibujarTablero();
        dibujarFichas(); // Llama a dibujarFichas aquí para dibujar las fichas después de soltar
        setTimeout(comprobarGanador, 50); // Verifica si hay ganador después de actualizar el tablero
    }
});

function animarCaidaFicha(ficha, destinoY, callback) {
    let posicionY = 0; // Comienza desde el tope del tablero
    let velocidad = 5; // Ajusta esta velocidad para que la caída sea más rápida o lenta

    function animar() {
        ctx.clearRect(ficha.x * tamanoCelda, posicionY, tamanoCelda, tamanoCelda); // Borra la posición anterior

        // Actualiza la posición Y para hacer caer la ficha
        posicionY += velocidad;

        // Dibuja la ficha en la nueva posición
        ctx.save();
        ctx.beginPath();
        ctx.arc(ficha.x * tamanoCelda + tamanoCelda / 2, posicionY + tamanoCelda / 2, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(ficha.jugador === 1 ? fichaRojaImg : fichaAzulImg, ficha.x * tamanoCelda + 5, posicionY + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore();

        // Comprueba si la ficha llegó al destino
        if (posicionY < destinoY * tamanoCelda) {
            requestAnimationFrame(animar); // Llama recursivamente para continuar animación
        } else {
            // Llama al callback al terminar
            callback();
        }
    }

    animar(); // Inicia la animación
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
    fichasDisponibles.rojo = fila;
    fichasDisponibles.azul = fila;

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

// Seleccionar ficha jugadores
let fichaJugador1, fichaJugador2;

function seleccionarFichaJugador1(color) {
    fichaJugador1 = color;
    alert(`Jugador 1 ha seleccionado la ficha ${color}`);
}

function seleccionarFichaJugador2(color) {
    fichaJugador2 = color;
    alert(`Jugador 2 ha seleccionado la ficha ${color}`);
}

function iniciarJuego() {
    if (!fichaJugador1 || !fichaJugador2) {
        alert("Ambos jugadores deben seleccionar sus fichas.");
        return;
    }

    document.getElementById('pantallaSeleccion').style.display = 'none'; // Ocultar la pantalla de selección
    // Aquí puedes inicializar el juego y mostrar el canvas
    inicializarJuego(); // Llama a tu función para inicializar el juego
}

function inicializarJuego() {
    // Carga las imágenes de las fichas seleccionadas
    if (fichaJugador1 === 'roja') {
        fichaRojaImg = new Image();
        fichaRojaImg.src = 'img/sub-zero-1-token.png'; // Cambia esto a la ruta de tu imagen
    } else if (fichaJugador1 === 'amarilla') {
        fichaRojaImg = new Image();
        fichaRojaImg.src = 'img/sub-zero-2-token.png'; // Cambia esto a la ruta de tu imagen
    }

    if (fichaJugador2 === 'azul') {
        fichaAzulImg = new Image();
        fichaAzulImg.src = 'img/scorpion-1-token.png'; // Cambia esto a la ruta de tu imagen
    } else if (fichaJugador2 === 'verde') {
        fichaAzulImg = new Image();
        fichaAzulImg.src = 'img/scorpion-1-token.png'; // Cambia esto a la ruta de tu imagen
    }
}