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
let timer = 120; // Tiempo inicial en segundos
let desplazamientoX = 0;
let desplazamientoY = 0;




//===========================================================================================================
//===========================================================================================================
// CANDE ACÁ MODIFIQUÉ
////////////////////////////////////////////////////////////////// Manejar cambio de pantallas, de config al canvas
document.getElementById('iniciarJuego').addEventListener('click', function() {
    // Ocultar la pantalla de selección
    document.getElementById('pantallaSeleccion').style.display = 'none';

    // Mostrar el canvas del juego
    document.getElementById('game-screen').style.display = 'block';

    // Aquí puedes iniciar el juego, cargar imágenes, etc.
    cargarFondo(); // Asegúrate de que esta función esté definida para iniciar el juego.
    dibujarTablero(); // También puedes redibujar el tablero aquí.
    dibujarBotonRestart();
});

// Función para reiniciar el juego
function reiniciarJuego() {
    // Ocultar la pantalla de selección
    document.getElementById('pantallaSeleccion').style.display = 'flex';

    // Mostrar el canvas del juego
    document.getElementById('game-screen').style.display = 'none';
}




////////////////////////////////////////////////////////////////// Botón reiniciar
// Función para dibujar botón de reinicio
function dibujarBotonRestart() {



}

//===========================================================================================================
//===========================================================================================================

// Función para centrar tablero
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
    subZero: fila * 2, // Suponiendo que comienzas con 6 fichas de SubZero
    scorpion: fila * 2   // Y 6 fichas de Scorpion
};

// Variables para las imágenes de las fichas
let fichaSubZeroImg = new Image();
let fichaScorpionImg = new Image();

//===========================================================================================================
//===========================================================================================================
// CANDE ACÁ MODIFIQUÉ
// Cargar imágenes de token predefinidas
fichaSubZeroImg.src = 'img/sub-zero-1-token.png';
fichaScorpionImg.src = 'img/scorpion-1-token.png';

// Función para manejar el cambio de ficha y cargar la imagen de ficha correspondiente
function cambiarFicha(ficha) {
    switch (ficha) {
        case 'subZero-1':
            fichaSubZeroImg.src = 'img/sub-zero-1-token.png';
            break;
        case 'subZero-2':
            fichaSubZeroImg.src = 'img/sub-zero-2-token.png';
            break;
        case 'scorpion-1':
            fichaScorpionImg.src = 'img/scorpion-1-token.png';
            break;
        case 'scorpion-2':
            fichaScorpionImg.src = 'img/scorpion-2-token.png';
            break;
    }
}

// Eventos para cambiar de ficha
document.getElementById('subZero-1').addEventListener('click', () => cambiarFicha('subZero-1'));
document.getElementById('subZero-2').addEventListener('click', () => cambiarFicha('subZero-2'));
document.getElementById('scorpion-1').addEventListener('click', () => cambiarFicha('scorpion-1'));
document.getElementById('scorpion-2').addEventListener('click', () => cambiarFicha('scorpion-2'));

// Animación de selección de fichas
const botonesJugador1 = document.querySelectorAll('#subZero-1, #subZero-2');
const botonesJugador2 = document.querySelectorAll('#scorpion-1, #scorpion-2');
const botonesOpciones= document.querySelectorAll('#opciones button');

// Animar selección de fichas del Jugador 1
botonesJugador1.forEach(boton => {
    boton.addEventListener('click', () => {
        // Quita la clase 'blinkBtn' de todos los botones
        botonesJugador1.forEach(b => b.classList.remove('blinkBtn'));

        // Agrega la clase 'blinkBtn' al botón seleccionado
        boton.classList.add('blinkBtn');
    });
});

// Animar selección de fichas del Jugador 2
botonesJugador2.forEach(boton => {
    boton.addEventListener('click', () => {
        // Quita la clase 'blinkBtn' de todos los botones
        botonesJugador2.forEach(b => b.classList.remove('blinkBtn'));

        // Agrega la clase 'blinkBtn' al botón seleccionado
        boton.classList.add('blinkBtn');
    });
});

// Animar selección de opciones de tablero
botonesOpciones.forEach(boton => {
    boton.addEventListener('click', () => {
        // Quita la clase 'blinkOptions' de todos los botones
        botonesOpciones.forEach(b => b.classList.remove('blinkOptions'));

        // Agrega la clase 'blinkOptions' al botón seleccionado
        boton.classList.add('blinkOptions');
    });
});
//===========================================================================================================
//===========================================================================================================

// Asegúrate de que las imágenes estén completamente cargadas antes de iniciar el juego
Promise.all([fichaSubZeroImg.decode(), fichaScorpionImg.decode()])
    .then(() => {
        cargarFondo();
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



//===========================================================================================================
//===========================================================================================================
// CANDE ACÁ MODIFIQUÉ
////////////////////////////////////////////////////////////////// Crear hints
// Función para generar los hints de colocación
function generarHints() {
    hints = [];
    for (let j = 0; j < columna; j++) { // Ajusté el rango a 0 basado en coordenadas de columnas
        let i = fila - 1;
        while (i >= 0 && fichas.find(f => f.x === j && f.y === i)) {
            i--;
        }
        if (i >= 0) {
            hints.push({x: j, y: i, img: jugadorActual === 1 ? fichaSubZeroImg : fichaScorpionImg});
        }

    }
}

// Función para dibujar los hints
function dibujarHints() {
    for (let hint of hints) {
        ctx.globalAlpha = 0.4;

        const hintX = centerX - (columna / 2) * tamanoCelda + hint.x * tamanoCelda + tamanoCelda / 2;
        const hintY = centerY - (fila / 2) * tamanoCelda + hint.y * tamanoCelda + tamanoCelda / 2;

        ctx.save();

        ctx.beginPath();
        ctx.arc(hintX, hintY, (tamanoCelda - 10) / 2, 0, Math.PI * 2);
        ctx.clip();

        ctx.drawImage(
            hint.img,
            hintX - (tamanoCelda / 2) + 5,
            hintY - (tamanoCelda / 2) + 5,
            tamanoCelda - 10,
            tamanoCelda - 10
        );

        ctx.restore();
    }
    ctx.globalAlpha = 1.0;
}
//===========================================================================================================
//===========================================================================================================




////////////////////////////////////////////////////////////////// Crear tablero
let fondoImg = new Image();

function cargarFondo() {
    switch (linea) {
        case 4:
            fondoImg.src = 'img/dead-pool.webp';
            break;
        case 5:
            fondoImg.src = 'img/jinsei-chamber.webp';
            break;
        case 6:
            fondoImg.src = 'img/khans-arena.webp';
            break;
        case 7:
            fondoImg.src = 'img/sea-of-blood.webp';
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

//===========================================================================================================
//===========================================================================================================
// CANDE ACÁ MODIFIQUÉ
// Variables para obtener ejes x y
const centerX = tablero.width / 2;
const centerY = tablero.height / 2;

// Función para dibujar el tablero
function dibujarTablero() {
    // Usar el tamaño fijo del canvas
    ctx.clearRect(0, 0, tablero.width, tablero.height);

    // Dibujar fondo de rectángulos para las fichas iniciales
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(0, 0, tablero.width, tablero.height);

    // Dibujar imagen de fondo extendida un slot alrededor del tablero
    const inicioX = centerX - (columna / 2 + 0.5) * tamanoCelda;
    const inicioY = centerY - (fila / 2 + 0.5) * tamanoCelda;
    const anchoFondo = (columna + 1) * tamanoCelda;
    const altoFondo = (fila + 1) * tamanoCelda;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(inicioX, inicioY, anchoFondo, altoFondo, 20); // Usar roundRect para bordes redondeados
    ctx.clip();
    ctx.drawImage(fondoImg, inicioX, inicioY, anchoFondo, altoFondo);
    ctx.restore();

    // Dibujar celdas del tablero como círculos
    for (let i = 0; i < fila; i++) {
        for (let j = 0; j < columna; j++) {
            ctx.beginPath();
            ctx.arc(centerX - (columna / 2) * tamanoCelda + j * tamanoCelda + tamanoCelda / 2, centerY - (fila / 2) * tamanoCelda + i * tamanoCelda + tamanoCelda / 2, tamanoCelda / 2 - 5, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
    }

    // Dibujar dos columnas de fichas iniciales a la izquierda (SubZero)
    for (let i = 0; i < fichasDisponibles.subZero; i++) {
        const col = Math.floor(i / fila);
        const row = i % fila;
        const fichaX = centerX - (columna / 2) * tamanoCelda - (2 + col) * tamanoCelda + tamanoCelda / 2;
        const fichaY = centerY - (fila / 2) * tamanoCelda + row * tamanoCelda + tamanoCelda / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(fichaX, fichaY, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(fichaSubZeroImg, fichaX - (tamanoCelda / 2) + 5, fichaY - (tamanoCelda / 2) + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore();
    }

    // Dibujar dos columnas de fichas iniciales a la derecha (Scorpion)
    for (let i = 0; i < fichasDisponibles.scorpion; i++) {
        const col = Math.floor(i / fila);
        const row = i % fila;
        const fichaX = centerX + (columna / 2) * tamanoCelda + (2 + col) * tamanoCelda - tamanoCelda / 2;
        const fichaY = centerY - (fila / 2) * tamanoCelda + row * tamanoCelda + tamanoCelda / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(fichaX, fichaY, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(fichaScorpionImg, fichaX - (tamanoCelda / 2) + 5, fichaY - (tamanoCelda / 2) + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore();
    }

    dibujarFichas();
    generarHints();
    dibujarHints();
}
//===========================================================================================================
//===========================================================================================================




////////////////////////////////////////////////////////////////// Temporizador
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




////////////////////////////////////////////////////////////////// Comprobar ganador
// Modificar la función comprobarGanador
function comprobarGanador() {
    for (let i = 0; i < fichas.length; i++) {
        let ficha = fichas[i];

        // Comprobar horizontal
        if (contarFichas(ficha.x, ficha.y, 1, 0, ficha.jugador) >= linea) {
            dibujarMensajeGanador(ficha.jugador);
            reiniciarJuego(); // Llamar a reiniciar el juego
            return;
        }
        // Comprobar vertical
        if (contarFichas(ficha.x, ficha.y, 0, 1, ficha.jugador) >= linea) {
            dibujarMensajeGanador(ficha.jugador);
            reiniciarJuego(); // Llamar a reiniciar el juego
            return;
        }
        // Comprobar diagonal (diagonal izquierda a derecha)
        if (contarFichas(ficha.x, ficha.y, 1, 1, ficha.jugador) >= linea) {
            dibujarMensajeGanador(ficha.jugador);
            reiniciarJuego(); // Llamar a reiniciar el juego
            return;
        }
        // Comprobar diagonal (diagonal derecha a izquierda)
        if (contarFichas(ficha.x, ficha.y, -1, 1, ficha.jugador) >= linea) {
            dibujarMensajeGanador(ficha.jugador);
            reiniciarJuego(); // Llamar a reiniciar el juego
            return;
        }
    }
}

//===========================================================================================================
//===========================================================================================================
// CANDE ACÁ MODIFIQUÉ
// Función para mensaje de ganador
function dibujarMensajeGanador(jugador) {
    const mensaje = `¡Player ${jugador} wins!`;

    // Limpiar toda la pantalla
    ctx.clearRect(0, 0, tablero.width, tablero.height);

    ctx.save();
    ctx.font = "bold 50px 'Comic Sans MS'";
    ctx.fillStyle = "gold";
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(mensaje, tablero.width / 2, tablero.height / 2);
    ctx.restore();
}
//===========================================================================================================
//===========================================================================================================

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




//===========================================================================================================
//===========================================================================================================
// CANDE ACÁ MODIFIQUÉ
////////////////////////////////////////////////////////////////// Eventos mousedown, mousemove, mouseup
// Función para manejar el arrastre de fichas
tablero.addEventListener('mousedown', (event) => {
    const x = Math.floor((event.offsetX - desplazamientoX) / tamanoCelda);

    if ((x < 0 && jugadorActual === 1) || (x >= columna && jugadorActual === 2)) {
        fichaArrastrando = {jugador: jugadorActual, x: x < 0 ? 0 : x, y: 0};
        posicionFichaArrastrando = {
            x: event.offsetX - desplazamientoX,
            y: event.offsetY - desplazamientoY
        };

        // Eliminar una ficha inicial del jugador actual
        if (jugadorActual === 1) {
            fichasDisponibles.subZero--;
        } else {
            fichasDisponibles.scorpion--;
        }

        // Redibujar el tablero para actualizar las fichas iniciales
        dibujarTablero();
    }
});

tablero.addEventListener('mousemove', (event) => {
    if (fichaArrastrando) {
        posicionFichaArrastrando.x = event.offsetX - desplazamientoX;
        posicionFichaArrastrando.y = event.offsetY - desplazamientoY;
        dibujarTablero(); // Redibuja el tablero para reflejar la posición de la ficha arrastrada
    }
});

tablero.addEventListener('mouseup', (event) => {
    if (fichaArrastrando) {
        const x = Math.floor((event.offsetX - desplazamientoX) / tamanoCelda);
        let y = fila - 1;

        while (y >= 0 && fichas.find(f => f.x === x && f.y === y)) {
            y--;
        }

        if (y >= 0 && (x >= 0 && x < columna)) {
            animarCaidaFicha(x, y, jugadorActual);
        } else {
            if (jugadorActual === 1) {
                fichasDisponibles.subZero++;
            } else {
                fichasDisponibles.scorpion++;
            }
        }

        fichaArrastrando = null;
        posicionFichaArrastrando = null;
        dibujarTablero(); // Redibuja el tablero para eliminar cualquier ficha fantasma
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
        x: destinoX * tamanoCelda + tamanoCelda / 2 + desplazamientoX, // Ajustamos para incluir desplazamiento
        y: 0,
        jugador
    }; // Iniciar en la parte superior de la columna

    posicionDestino = {
        x: destinoX * tamanoCelda + tamanoCelda / 2 + desplazamientoX, // Asegurar que incluya desplazamiento
        y: destinoY * tamanoCelda + tamanoCelda / 2 + desplazamientoY // Asegurar que incluya desplazamiento
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
            let posX = Math.floor((posicionDestino.x - desplazamientoX) / tamanoCelda); // Ajuste para desplazamiento
            let posY = Math.floor((posicionDestino.y - desplazamientoY) / tamanoCelda); // Ajuste para desplazamiento

            // Colocar la ficha en el tablero con el jugador actual en el momento de la colocación
            fichas.push({ x: posX, y: posY, jugador: fichaAnimando.jugador });

            // Limpiar la ficha animando y el destino de posición
            fichaAnimando = null;
            posicionDestino = null;

            // Comprobar si hay un ganador
            comprobarGanador(posX, posY, jugadorActual);

            // Cambiar el turno al otro jugador
            jugadorActual = jugadorActual === 1 ? 2 : 1;

            // Redibujar el tablero para mostrar la ficha colocada
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

        // Usar la imagen del jugador correspondiente para la ficha en caída
        let img = fichaAnimando.jugador === 1 ? fichaSubZeroImg : fichaScorpionImg;
        ctx.drawImage(img, fichaAnimando.x - tamanoCelda / 2 + 5, fichaAnimando.y - tamanoCelda / 2 + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore();

        // Continuar la animación
        requestAnimationFrame(actualizarCaidaFicha);
    }
}
//===========================================================================================================
//===========================================================================================================




////////////////////////////////////////////////////////////////// Cambiar modo
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
    fichasDisponibles.subZero = fila * 2;
    fichasDisponibles.scorpion = fila * 2;

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
