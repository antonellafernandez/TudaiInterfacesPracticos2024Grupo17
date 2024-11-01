// Variables globales canvas
let tablero = document.getElementById('tablero');
let ctx = tablero.getContext('2d');
// Establecer el tamaño del canvas
tablero.width = 792; // Ancho fijo
tablero.height = 520; // Altura fija

// Variables globales otras
let opciones = document.getElementById('opciones');
let fichas = [];
let jugadorActual = 1; // 1 para SubZero, 2 para Scorpion
let ganador = null;
let fila = 6;
let columna = 7;
let linea = 4;
// Ajustar tamaño de celda para que se adapte al nuevo tamaño del canvas
let tamanoCelda = 60; // Tamaño ajustado para el nuevo canvas
let fichaArrastrando = null;
let posicionFichaArrastrando = null;
let hints = [];
let timer = 120; // Tiempo inicial en segundos
let desplazamientoX = 0;
let desplazamientoY = 0;



/////////// FUNCION PARA MANEJAR EL CAMBIO DE PANTALLAS, DE CONFIG AL CANVAS
document.getElementById('iniciarJuego').addEventListener('click', function() {
    // Ocultar la pantalla de selección
    document.getElementById('pantallaSeleccion').style.display = 'none';

    // Mostrar el canvas del juego
    document.getElementById('game-screen').style.display = 'block';

    // Aquí puedes iniciar el juego, cargar imágenes, etc.
    cargarFondo(); // Asegúrate de que esta función esté definida para iniciar el juego.
    dibujarTablero(); // También puedes redibujar el tablero aquí.
});



function centrarTablero() {
    let anchoTablero = columna * tamanoCelda;
    let altoTablero = fila * tamanoCelda;

    // Centrar el tablero en el canvas según su tamaño actual
    desplazamientoX = (tablero.width - anchoTablero) / 2;
    desplazamientoY = (tablero.height - altoTablero) / 2;
}

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
fichaSubZeroImg.src = 'img/4_in_line/sub-zero-1-token.png';
fichaScorpionImg.src = 'img/4_in_line/scorpion-1-token.png';

// Asegúrate de que las imágenes estén completamente cargadas antes de iniciar el juego
Promise.all([fichaSubZeroImg.decode(), fichaScorpionImg.decode()])
    .then(() => {
        cargarFondo();
        centrarTablero(); 
        dibujarTablero();
        countdown;
    });

    function dibujarFichas() {
        for (let i = 0; i < fichas.length; i++) {
            let ficha = fichas[i];
            let img = ficha.jugador === 1 ? fichaSubZeroImg : fichaScorpionImg;
    
            const centerX = desplazamientoX + ficha.x * tamanoCelda + tamanoCelda / 2;
            const centerY = desplazamientoY + ficha.y * tamanoCelda + tamanoCelda / 2;
    
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, centerX - (tamanoCelda / 2) + 5, centerY - (tamanoCelda / 2) + 5, tamanoCelda - 10, tamanoCelda - 10);
            ctx.restore();
        }
    
        if (fichaArrastrando) {
            let img = jugadorActual === 1 ? fichaSubZeroImg : fichaScorpionImg;
    
            const centerX = desplazamientoX + Math.floor(posicionFichaArrastrando.x / tamanoCelda) * tamanoCelda + tamanoCelda / 2;
            const centerY = desplazamientoY + Math.floor(posicionFichaArrastrando.y / tamanoCelda) * tamanoCelda + tamanoCelda / 2;
    
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, centerX - (tamanoCelda / 2) + 5, centerY - (tamanoCelda / 2) + 5, tamanoCelda - 10, tamanoCelda - 10);
            ctx.restore();
        }
    }




////////////////////////////////////////////////////////////////// Crear hints
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

function dibujarHints() {
    ctx.globalAlpha = 0.4;
    for (let hint of hints) {
        const x = desplazamientoX + hint.x * tamanoCelda + tamanoCelda / 2;
        const y = desplazamientoY + hint.y * tamanoCelda + tamanoCelda / 2;
        const radius = (tamanoCelda - 10) / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(
            hint.color === 'rgba(255, 0, 0, 0.3)' ? fichaSubZeroImg : fichaScorpionImg,
            x - (tamanoCelda / 2) + 5,
            y - (tamanoCelda / 2) + 5,
            tamanoCelda - 10,
            tamanoCelda - 10
        );
        ctx.restore();
    }
    ctx.globalAlpha = 1.0;
}

////////////////////////////////////////////////////////////////// Crear tablero
let fondoImg = new Image();

function cargarFondo() {
    switch (linea) {
        case 4:
            fondoImg.src = 'img/4_in_line/dead-pool.webp';
            break;
        case 5:
            fondoImg.src = 'img/4_in_line/jinsei-chamber.webp';
            break;
        case 6:
            fondoImg.src = 'img/4_in_line/khans-arena.webp';
            break;
        case 7:
            fondoImg.src = 'img/4_in_line/sea-of-blood.webp';
            break;
    }

    fondoImg.onload = () => {
        centrarTablero();
        dibujarTablero();
    };
    fondoImg.onerror = () => {
        console.error('Error al cargar la imagen: ' + fondoImg.src);
    };
}

// Función para dibujar el tablero
function dibujarTablero() {
    ctx.clearRect(0, 0, tablero.width, tablero.height);
    ctx.drawImage(fondoImg, 0, 0, tablero.width, tablero.height);

    for (let i = 0; i < fila; i++) {
        for (let j = 1; j <= columna; j++) {
            ctx.beginPath();
            ctx.arc(desplazamientoX + j * tamanoCelda + tamanoCelda / 2, desplazamientoY + i * tamanoCelda + tamanoCelda / 2, tamanoCelda / 2 - 5, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
    }

    // Dibujo de fichas disponibles
    for (let i = 0; i < fichasDisponibles.subZero; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(desplazamientoX + (0 * tamanoCelda + tamanoCelda / 2), desplazamientoY + (i * tamanoCelda + tamanoCelda / 2), (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(fichaSubZeroImg, desplazamientoX + (0 * tamanoCelda + 5), desplazamientoY + (i * tamanoCelda + 5), tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore();
    }

    for (let i = 0; i < fichasDisponibles.scorpion; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(desplazamientoX + ((columna + 1) * tamanoCelda + tamanoCelda / 2), desplazamientoY + (i * tamanoCelda + tamanoCelda / 2), (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(fichaScorpionImg, desplazamientoX + ((columna + 1) * tamanoCelda + 5), desplazamientoY + (i * tamanoCelda + 5), tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore();
    }

    dibujarFichas();
    generarHints();
    dibujarHints();
    updateTimerDisplay();
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

// Funcion para el temporizador
const countdown = setInterval(() => {
    timer--; // Disminuye el contador de tiempo en 1 cada segundo
    updateTimerDisplay(); // Solo actualiza la visualización del temporizador

    if (timer <= 0) {
        clearInterval(countdown); // Detiene el temporizador
        checkForWinner(); // Verifica si hay ganador o es empate
    }
}, 1000); // Ejecuta cada 2 segundo

// Función para actualizar la visualización del temporizador
function updateTimerDisplay() {
    // Limpia solo el área del temporizador
    ctx.clearRect(tablero.width / 2 - 30, 10, 60, 40);

// Configura la posición y el tamaño del círculo
const centroX = tablero.width / 2; // Centro del círculo en X
const centroY = 60; // Posición Y del centro del círculo
const radio = 50; // Radio del círculo

// Dibuja el círculo negro
ctx.fillStyle = "black"; // Color del círculo
ctx.beginPath(); // Comienza a dibujar el camino
ctx.arc(centroX, centroY, radio, 0, Math.PI * 2); // Dibuja un círculo completo
ctx.fill(); // Rellena el círculo

// Dibuja el nuevo valor del temporizador
ctx.font = "bold 30px 'Comic Sans MS'"; // Fuente divertida y un poco más grande
ctx.fillStyle = "white"; // Color del texto
ctx.textAlign = "center"; // Centrar el texto
ctx.textBaseline = "middle"; // Baseline en el medio

// Añadir sombra para un efecto 3D
ctx.shadowColor = "black";
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 4;

// Dibujar el texto del temporizador
ctx.fillText(timer, centroX, centroY); // Coloca el texto en el centro del círculo
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
    centrarTablero(); 
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
    let x = Math.floor((event.offsetX - desplazamientoX) / tamanoCelda); // Ajustar para el desplazamiento
    let y = Math.floor((event.offsetY - desplazamientoY) / tamanoCelda); // Ajustar para el desplazamiento

    // Determinar si la ficha es del color correcto para el turno actual
    if ((x === 0 && jugadorActual === 1) || (x === columna + 1 && jugadorActual === 2)) {
        fichaArrastrando = { jugador: jugadorActual, x, y };
        posicionFichaArrastrando = { 
            x: event.offsetX - desplazamientoX, // Ajustar la posición inicial al hacer clic
            y: event.offsetY - desplazamientoY // Ajustar la posición inicial al hacer clic
        };
    }
});

tablero.addEventListener('mousemove', (event) => {
    if (fichaArrastrando) {
        // Calcular la nueva posición de la ficha arrastrando en función de la posición del mouse
        let nuevaPosicionX = event.offsetX - desplazamientoX; // Ajustar con desplazamiento
        let nuevaPosicionY = event.offsetY - desplazamientoY; // Ajustar con desplazamiento

        // Actualizar la posición de la ficha arrastrando
        posicionFichaArrastrando.x = nuevaPosicionX;
        posicionFichaArrastrando.y = nuevaPosicionY;

        // Redibujar el tablero
        dibujarTablero();
    }
});

// Función para manejar el evento de soltar la ficha
tablero.addEventListener('mouseup', (event) => {
    if (fichaArrastrando) {
        let x = Math.floor((event.offsetX - desplazamientoX) / tamanoCelda); // Ajustar para el desplazamiento
        let y = fila - 1;

        // Buscar la posición más baja en la columna
        while (y >= 0 && fichas.find(f => f.x === x && f.y === y)) {
            y--;
        }

        // Verificar si la columna es válida
        if (y >= 0 && (x > 0 && x <= columna)) {
            // Iniciar la animación de caída hacia la posición calculada
            animarCaidaFicha(x, y, jugadorActual);
        }

        fichaArrastrando = null; // Restablecer la ficha arrastrando
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
    fichaAnimando = { 
        x: destinoX * tamanoCelda + tamanoCelda / 2 + desplazamientoX, // Asegurar que incluya el desplazamiento
        y: 0, 
        jugador 
    }; // Iniciar en la parte superior de la columna
    posicionDestino = { 
        x: destinoX * tamanoCelda + tamanoCelda / 2 + desplazamientoX, // Asegurar que incluya el desplazamiento
        y: destinoY * tamanoCelda + tamanoCelda / 2 + desplazamientoY // Asegurar que incluya el desplazamiento
    };
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
            let posX = Math.floor((posicionDestino.x - desplazamientoX) / tamanoCelda); // Ajustar para el desplazamiento
            let posY = Math.floor((posicionDestino.y - desplazamientoY) / tamanoCelda); // Ajustar para el desplazamiento
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




////////////////////////////////////////////////////////////////// VER ESTO! PARA PANTALLA PRINCIPAL
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




}
