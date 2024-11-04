// Variables globales canvas
let tablero = document.getElementById('tablero');
let ctx = tablero.getContext('2d');

// Establecer el tamaño del canvas
tablero.width = 1160; // Ancho ajustado
tablero.height = 572; // Altura ajustada

// Variables globales otras
let fichas = [];
let jugadorActual = 1; // 1 para SubZero, 2 para Scorpion
let ganador = null;
let fila = 6;
let columna = 7;
let linea = 4;
let tiempoRestante = 180; // Tiempo inicial en segundos
let temporizador;
let alertTiempoMostrado = false; // Variable para controlar si el alert de tiempo agotado ya fue mostrado

let tamanoCelda = 60; // Tamaño de celda ajustado (anteriormente 100)
let fichaArrastrando = null;
let posicionFichaArrastrando = null;
let hints = [];
let desplazamientoX = 0;
let desplazamientoY = 0;




//// Temporizador
function iniciarTemporizador() {
    // Mostrar el tiempo restante inicialmente
    document.getElementById("timeDisplay").textContent = tiempoRestante + "s";
    
    temporizador = setInterval(() => {
        // Verifica si hay un ganador antes de continuar
        if (ganador !== null) {
            clearInterval(temporizador); // Detén el temporizador si hay un ganador
            return;
        }

        tiempoRestante--;

        // Actualiza la visualización del tiempo restante
        document.getElementById("timeDisplay").textContent = tiempoRestante + "s";

        // Comprueba si el tiempo se ha agotado y muestra el alert solo una vez
        if (tiempoRestante <= 0 && !alertTiempoMostrado) {
            clearInterval(temporizador); // Detén el temporizador
            alertTiempoMostrado = true; // Marca el alert como mostrado
            // Si el tiempo se agota y no hay ganador, muestra el mensaje de empate
            if (ganador === null) {
                dibujarMensajeEmpate();
            }
        }
    }, 1000);
}


//===========================================================================================================
//===========================================================================================================
// Manejar cambio de pantallas, de config al canvas
document.getElementById('iniciarJuego').addEventListener('click', function() {
    // Ocultar la pantalla de selección
    document.getElementById('pantallaSeleccion').style.display = 'none';

    // Mostrar el canvas del juego
    document.getElementById('game-screen').style.display = 'block';

    // Quitar blink a botones de la pantalla de selección
    const botonesJugador1 = document.querySelectorAll('#subZero-1, #subZero-2');
    const botonesJugador2 = document.querySelectorAll('#scorpion-1, #scorpion-2');
    const botonesOpciones = document.querySelectorAll('#opciones button');

    function reiniciarSeleccion(botones, clase) {
        botones.forEach(boton => {
            boton.classList.remove(clase); // Elimina la clase del botón específico
        });
    }

    reiniciarSeleccion(botonesJugador1, 'blinkBtn');
    reiniciarSeleccion(botonesJugador2, 'blinkBtn');
    reiniciarSeleccion(botonesOpciones, 'blinkOptions');

    // Cargar juego
    cargarFondo();
    dibujarTablero();
    iniciarTemporizador();
});

////////////////////////// para mostrar la pantalla del ganador
function dibujarMensajeGanador(jugador) {
    const mensajeGanador = document.getElementById('mensajeGanador');
    // Detén el temporizador si hay un ganador
    clearInterval(temporizador);

    // Actualiza el mensaje del ganador según el jugador
    mensajeGanador.classList.remove('ganador-jugador1', 'ganador-jugador2');
    if (jugador === 1) {
        mensajeGanador.classList.add('ganador-jugador1');
        mensajeGanador.textContent = 'Sub-Zero wins!';
    } else if (jugador === 2) {
        mensajeGanador.classList.add('ganador-jugador2');
        mensajeGanador.textContent = 'Scorpion wins!';
    }

    // Muestra la pantalla de ganador
    document.getElementById('pantallaGanador').style.display = 'flex';
    // Mostrar la pantalla de ganador después de 1 segundo y añadir clase visible
    setTimeout(() => {
        const pantallaGanador = document.getElementById('pantallaGanador');
        pantallaGanador.style.display = 'flex';
        pantallaGanador.classList.add('visible'); // Agregar clase visible para la transición
    }, 1000); // Tiempo antes de mostrar
}

// Función para mostrar el mensaje de empate
function dibujarMensajeEmpate() {
    const mensajeEmpate = document.getElementById('mensajeEmpate');
    
    // Detén el temporizador en caso de empate
    clearInterval(temporizador);

    // Actualiza el mensaje de empate
    mensajeEmpate.textContent = "It's a draw!";

    // Muestra la pantalla de empate sin cambiar de pantalla de juego
    document.getElementById('pantallaEmpate').style.display = 'flex';
    document.getElementById('pantallaEmpate').style.position = 'absolute';
    document.getElementById('pantallaEmpate').style.top = '0';
    document.getElementById('pantallaEmpate').style.left = '0';
    document.getElementById('pantallaEmpate').style.width = '100%';
    document.getElementById('pantallaEmpate').style.height = '100%';
    document.getElementById('pantallaEmpate').style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Fondo semi-transparente
    document.getElementById('pantallaEmpate').style.display = 'flex';
    document.getElementById('pantallaEmpate').style.alignItems = 'center';
    document.getElementById('pantallaEmpate').style.justifyContent = 'center';
    document.getElementById('pantallaEmpate').style.zIndex = '10';

    // Muestra la pantalla de empate
    document.getElementById('pantallaEmpate').style.display = 'flex';
}

// Función para reiniciar el juego
function reiniciarJuego() {
      // Restablece la visualización de la selección
      document.getElementById('pantallaSeleccion').style.display = 'flex';
      document.getElementById('pantallaGanador').style.display = 'none';
      document.getElementById('pantallaEmpate').style.display = 'none';
      document.getElementById('game-screen').style.display = 'none';
  
      // Reinicia las variables del juego y del temporizador
      clearInterval(temporizador); // Asegura que el temporizador se detiene
      tiempoRestante = 180; // Reinicia el tiempo inicial
      alertTiempoMostrado = false; // Restablece el estado del alert de tiempo agotado
  
      // Reinicia el estado del juego
      fichas = [];
      jugadorActual = 1;
      ganador = null;
      hints = [];
      fichasDisponibles = {
          subZero: 6,
          scorpion: 6
    };

     // Redibuja el tablero
     cargarFondo();
     centrarTablero(); 
     dibujarTablero();

}


function disableGameInteraction() {
    const gameBoard = document.getElementById('game-screen');
    if (gameBoard) gameBoard.style.pointerEvents = 'none';
}

// Función para centrar el tablero
function centrarTablero() {
    let anchoTablero = columna * tamanoCelda;
    let altoTablero = fila * tamanoCelda;

    desplazamientoX = (tablero.width - anchoTablero) / 2;
    desplazamientoY = (tablero.height - altoTablero) / 2;
}














////////////////////////////////////////////////////////////////// Fichas


///////ACA VA EL CODIGO VIEJO
/*
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


botonesOpciones.forEach(boton => {
    boton.addEventListener('click', () => {
        // Quita la clase 'blinkOptions' de todos los botones
        botonesOpciones.forEach(b => b.classList.remove('blinkOptions'));

        // Agrega la clase 'blinkOptions' al botón seleccionado
        boton.classList.add('blinkOptions');
    });
});
//==========================
*/
let fichasDisponibles = {
    subZero: fila * 2,
    scorpion: fila * 2
};

let fichaSubZeroImg = new Image();
let fichaScorpionImg = new Image();

fichaSubZeroImg.src = 'img/4_in_line/sub-zero-1-token.png';
fichaScorpionImg.src = 'img/4_in_line/scorpion-1-token.png';

function cambiarFicha(ficha) {
    switch (ficha) {
        case 'subZero-1':
            fichaSubZeroImg.src = 'img/4_in_line/sub-zero-1-token.png';
            break;
        case 'subZero-2':
            fichaSubZeroImg.src = 'img/4_in_line/sub-zero-2-token.png';
            break;
        case 'scorpion-1':
            fichaScorpionImg.src = 'img/4_in_line/scorpion-1-token.png';
            break;
        case 'scorpion-2':
            fichaScorpionImg.src = 'img/4_in_line/scorpion-2-token.png';
            break;
    }
}

['subZero-1', 'subZero-2', 'scorpion-1', 'scorpion-2'].forEach(id => {
    document.getElementById(id).addEventListener('click', () => cambiarFicha(id));
});

const botonesJugador1 = document.querySelectorAll('#subZero-1, #subZero-2');
const botonesJugador2 = document.querySelectorAll('#scorpion-1, #scorpion-2');
const botonesOpciones = document.querySelectorAll('#opciones button');

let fichaSeleccionadaJugador1 = null;
let fichaSeleccionadaJugador2 = null;
let opcionSeleccionada = null;

// Función para manejar la animación de selección de fichas para cada jugador
function agregarAnimacionSeleccionFichas(botones, clase, fichaSeleccionadaRef) {
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            // Quitar la clase de selección solo de la ficha previamente seleccionada para ese jugador
            if (fichaSeleccionadaRef.value) {
                fichaSeleccionadaRef.value.classList.remove(clase);
            }
            // Asignar la nueva ficha seleccionada y agregar la clase de animación
            boton.classList.add(clase);
            fichaSeleccionadaRef.value = boton;
        });
    });
}

// Función para manejar la animación de selección de opciones de mapa
function agregarAnimacionSeleccionOpciones(botones, clase) {
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            // Quitar la clase de selección solo de la opción previamente seleccionada
            if (opcionSeleccionada) {
                opcionSeleccionada.classList.remove(clase);
            }
            // Asignar la nueva opción seleccionada y agregar la clase de animación
            boton.classList.add(clase);
            opcionSeleccionada = boton;
        });
    });
}

// Asignar la lógica de selección de fichas y opciones por separado
agregarAnimacionSeleccionFichas(botonesJugador1, 'blinkBtn', { value: fichaSeleccionadaJugador1 });
agregarAnimacionSeleccionFichas(botonesJugador2, 'blinkBtn', { value: fichaSeleccionadaJugador2 });
agregarAnimacionSeleccionOpciones(botonesOpciones, 'blinkOptions');

// Código adicional para cargar fondo y dibujar tablero
requestAnimationFrame(() => {
    cargarFondo();
    dibujarTablero();
});











// Función para dibujar fichas
function dibujarFichas() {
    for (let ficha of fichas) {
        const img = ficha.jugador === 1 ? fichaSubZeroImg : fichaScorpionImg;
        const centerX = desplazamientoX + ficha.x * tamanoCelda + tamanoCelda / 2;
        const centerY = desplazamientoY + ficha.y * tamanoCelda + tamanoCelda / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, centerX - (tamanoCelda / 2) + 5, centerY - (tamanoCelda / 2) + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore();
    }

    if (fichaArrastrando) {
        const img = jugadorActual === 1 ? fichaSubZeroImg : fichaScorpionImg;
        const centerX = desplazamientoX + Math.floor(posicionFichaArrastrando.x / tamanoCelda) * tamanoCelda + tamanoCelda / 2;
        const centerY = desplazamientoY + Math.floor(posicionFichaArrastrando.y / tamanoCelda) * tamanoCelda + tamanoCelda / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, centerX - (tamanoCelda / 2) + 5, centerY - (tamanoCelda / 2) + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore();
    }
}

////////////////////////////////////////////////////////////////// Hints
// Función para generar hints
function generarHints() {
    hints = [];
    for (let j = 0; j < columna; j++) {
        let i = fila - 1;
        while (i >= 0 && fichas.some(f => f.x === j && f.y === i)) i--;
        if (i >= 0) hints.push({ x: j, y: i, img: jugadorActual === 1 ? fichaSubZeroImg : fichaScorpionImg });
    }
}

// Variables de animación
let animationTime = 0;
const animationSpeed = 0.05; // Velocidad de parpadeo ajustada
let isAnimating = false; // Controla si la animación ya está corriendo

// Función para el efecto de titileo de los hints
function animarHints() {
    // Incrementa el tiempo para el efecto de titileo
    animationTime += animationSpeed;

    // Redibuja solo los hints en su ciclo de titileo
    dibujarHints();

    // Continúa la animación en el siguiente cuadro
    requestAnimationFrame(animarHints);
}

// Función para dibujar los hints con el efecto de titileo
function dibujarHints() {
    // Calcula la opacidad de titileo
    const alpha = 0.5 + 0.5 * Math.sin(animationTime); // Alterna entre 0.5 y 1

    for (let hint of hints) {
        const hintX = desplazamientoX + hint.x * tamanoCelda + tamanoCelda / 2;
        const hintY = desplazamientoY + hint.y * tamanoCelda + tamanoCelda / 2;
        const radioHint = (tamanoCelda - 10) / 2;

        // Limpia el área del hint de manera circular
        ctx.save();
        ctx.beginPath();
        ctx.arc(hintX, hintY, radioHint, 0, Math.PI * 2);
        ctx.clip();

        // Cambia el modo de mezcla para borrar solo en la forma circular
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fill(); // Borra el área circular

        // Restaura el modo de mezcla normal para dibujar los hints
        ctx.globalCompositeOperation = "source-over";
        ctx.restore();

        // Dibuja el fondo blanco circular antes del hint
        ctx.save();
        ctx.beginPath();
        ctx.arc(hintX, hintY, radioHint, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke(); // Dibuja el borde
        ctx.restore();

        // Dibuja el hint con el efecto de titileo
        ctx.save();
        ctx.beginPath();
        ctx.arc(hintX, hintY, radioHint, 0, Math.PI * 2);
        ctx.clip();

        ctx.globalAlpha = alpha;
        ctx.fillStyle = jugadorActual === 1 ? `rgba(0, 191, 255, ${alpha})` : `rgba(255, 204, 0, ${alpha})`;

        ctx.drawImage(hint.img, hintX - radioHint, hintY - radioHint, radioHint * 2, radioHint * 2);
        ctx.fill(); // Aplica el color de fondo

        ctx.restore();
    }

    ctx.globalAlpha = 1.0; // Restaura la opacidad para otros elementos
}

// Llama a animarHints una vez para iniciar el ciclo de titileo
if (!isAnimating) {
    isAnimating = true;
    animarHints();
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

// Variables para obtener ejes x y
const centerX = tablero.width / 2;
const centerY = tablero.height / 2;

// Función para dibujar el tablero
function dibujarTablero() {
    ctx.clearRect(0, 0, tablero.width, tablero.height);

    // Dibujar imagen de fondo extendida un slot alrededor del tablero
    const inicioX = centerX - (columna / 2 + 0.5) * tamanoCelda;
    const inicioY = centerY - (fila / 2 + 0.5) * tamanoCelda;
    const anchoFondo = (columna + 1) * tamanoCelda;
    const altoFondo = (fila + 1) * tamanoCelda;

    ctx.save();
    ctx.shadowColor = "black";
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.roundRect(inicioX, inicioY, anchoFondo, altoFondo, 20); // Usar roundRect para bordes redondeados
    ctx.fill();
    ctx.clip();
    ctx.drawImage(fondoImg, inicioX, inicioY, anchoFondo, altoFondo);
    ctx.restore();

    // Dibujar celdas del tablero como círculos
    for (let i = 0; i < fila; i++) {
        for (let j = 0; j < columna; j++) {
            ctx.beginPath();
            const posX = centerX - (columna / 2) * tamanoCelda + j * tamanoCelda + tamanoCelda / 2;
            const posY = centerY - (fila / 2) * tamanoCelda + i * tamanoCelda + tamanoCelda / 2;

            ctx.arc(posX, posY, tamanoCelda / 2 - 5, 0, Math.PI * 2);

            ctx.fillStyle = '#fff'; // Color de relleno blanco
            ctx.fill();
            ctx.stroke(); // Dibuja el borde
        }
    }

    // Dibujar fichas iniciales a la izquierda (SubZero)
    for (let i = 0; i < fichasDisponibles.subZero; i++) {
        const col = Math.floor(i / fila);
        const row = i % fila;
        const fichaX = centerX - (columna / 2) * tamanoCelda - (2 + col) * tamanoCelda + tamanoCelda / 2;
        const fichaY = centerY - (fila / 2) * tamanoCelda + row * tamanoCelda + tamanoCelda / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(fichaX, fichaY, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Borde llamativo para las fichas
        ctx.lineWidth = 3; // Grosor del borde
        ctx.strokeStyle = '#FF5733'; // Color del borde (puedes cambiarlo a tu gusto)
        ctx.stroke();

        ctx.clip();
        ctx.drawImage(fichaSubZeroImg, fichaX - (tamanoCelda / 2) + 5, fichaY - (tamanoCelda / 2) + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore();
    }

    // Dibujar fichas iniciales a la derecha (Scorpion)
    for (let i = 0; i < fichasDisponibles.scorpion; i++) {
        const col = Math.floor(i / fila);
        const row = i % fila;
        const fichaX = centerX + (columna / 2) * tamanoCelda + (2 + col) * tamanoCelda - tamanoCelda / 2;
        const fichaY = centerY - (fila / 2) * tamanoCelda + row * tamanoCelda + tamanoCelda / 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(fichaX, fichaY, (tamanoCelda / 2) - 5, 0, Math.PI * 2);
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Borde llamativo para las fichas
        ctx.lineWidth = 3; // Grosor del borde
        ctx.strokeStyle = '#FF5733'; // Color del borde (puedes cambiarlo a tu gusto)
        ctx.stroke();

        ctx.clip();
        ctx.drawImage(fichaScorpionImg, fichaX - (tamanoCelda / 2) + 5, fichaY - (tamanoCelda / 2) + 5, tamanoCelda - 10, tamanoCelda - 10);
        ctx.restore();
    }


    dibujarFichas();
    generarHints();
    dibujarHints();
}

//===========================================================================================================
//======================================== COMPROBAR GANADOR ================================================
//===========================================================================================================

// Función para comprobar si hay un ganador en el tablero
function comprobarGanador() {
    for (let i = 0; i < fichas.length; i++) {
        let ficha = fichas[i];

        // Comprobar en dirección horizontal
        if (contarFichas(ficha.x, ficha.y, 1, 0, ficha.jugador) >= linea) {
            console.log(`Ganador encontrado: Jugador ${ficha.jugador} (horizontal)`);
            dibujarMensajeGanador(ficha.jugador);
            if (countdown) {
                clearInterval(countdown);
                countdown = null; // Restablecer la variable de temporizador
            }
            return; // Detiene la función al encontrar un ganador
        }
        // Comprobar en dirección vertical
        if (contarFichas(ficha.x, ficha.y, 0, 1, ficha.jugador) >= linea) {
            console.log(`Ganador encontrado: Jugador ${ficha.jugador} (vertical)`);
            dibujarMensajeGanador(ficha.jugador);
            return;
        }
        // Comprobar en dirección diagonal (izquierda a derecha)
        if (contarFichas(ficha.x, ficha.y, 1, 1, ficha.jugador) >= linea) {
            console.log(`Ganador encontrado: Jugador ${ficha.jugador} (diagonal izquierda a derecha)`);
            dibujarMensajeGanador(ficha.jugador);
            return;
        }
        // Comprobar en dirección diagonal (derecha a izquierda)
        if (contarFichas(ficha.x, ficha.y, -1, 1, ficha.jugador) >= linea) {
            console.log(`Ganador encontrado: Jugador ${ficha.jugador} (diagonal derecha a izquierda)`);
            dibujarMensajeGanador(ficha.jugador);
            return;
        }
    }
}

// Función auxiliar para contar fichas consecutivas en una dirección específica
function contarFichas(x, y, dx, dy, jugador) {
    let count = 0;
    let i = 0;

    // Contar fichas en la dirección indicada
    while (fichas.find(f => f.x === x + i * dx && f.y === y + i * dy && f.jugador === jugador)) {
        count++;
        i++;
    }
    i = 1;

    // Contar fichas en la dirección opuesta
    while (fichas.find(f => f.x === x - i * dx && f.y === y - i * dy && f.jugador === jugador)) {
        count++;
        i++;
    }

    return count;
}

//===========================================================================================================
//====================================== EVENTOS DE INTERACCIÓN =============================================
//===========================================================================================================

// Manejo del evento de mousedown para comenzar a arrastrar una ficha
tablero.addEventListener('mousedown', (event) => {
    const x = Math.floor((event.offsetX - desplazamientoX) / tamanoCelda);

    if ((x < 0 && jugadorActual === 1) || (x >= columna && jugadorActual === 2)) {
        fichaArrastrando = { jugador: jugadorActual, x: x < 0 ? 0 : x, y: 0 };
        posicionFichaArrastrando = {
            x: event.offsetX - desplazamientoX,
            y: event.offsetY - desplazamientoY
        };

        // Reducir el conteo de fichas disponibles para el jugador actual
        if (jugadorActual === 1) {
            fichasDisponibles.subZero--;
        } else {
            fichasDisponibles.scorpion--;
        }

        // Redibujar el tablero para actualizar las fichas iniciales
        dibujarTablero();
    }
});

// Manejo del evento de mousemove para arrastrar la ficha
tablero.addEventListener('mousemove', (event) => {
    if (fichaArrastrando) {
        posicionFichaArrastrando.x = event.offsetX - desplazamientoX;
        posicionFichaArrastrando.y = event.offsetY - desplazamientoY;
        dibujarTablero(); // Redibuja el tablero para reflejar la posición de la ficha arrastrada
    }
});

// Manejo del evento de mouseup para soltar la ficha y colocarla en el tablero
tablero.addEventListener('mouseup', (event) => {
    if (fichaArrastrando) {
        const x = Math.floor((event.offsetX - desplazamientoX) / tamanoCelda);
        let y = fila - 1;

        // Encuentra la posición y más baja disponible en la columna
        while (y >= 0 && fichas.find(f => f.x === x && f.y === y)) {
            y--;
        }

        // Verificar si la ficha puede colocarse en el tablero
        if (y >= 0 && (x >= 0 && x < columna)) {
            animarCaidaFicha(x, y, jugadorActual);
        } else {
            // Revertir el conteo si la ficha no puede colocarse
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
