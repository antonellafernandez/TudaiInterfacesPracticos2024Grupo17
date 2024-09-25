const percentageElement = document.getElementById('percentage');
const circleProgress = document.querySelector('.circle-progress');
const content = document.querySelector('.content'); // Seleccionamos el contenido

const duration = 5000; // 5 segundos
const startTime = Date.now();

// Establecer el largo total del círculo
const totalLength = 100; // Longitud total del círculo en porcentajes

const updateLoader = () => {
    const elapsedTime = Date.now() - startTime;
    let progress = (elapsedTime / duration) * totalLength;

    if (progress >= totalLength) {
        progress = totalLength;
    }

    // Actualizamos el porcentaje
    percentageElement.textContent = `${Math.floor(progress)}%`;

    // Actualizamos la longitud del trazo (stroke-dasharray)
    const strokeDasharrayValue = `${progress}, ${totalLength}`;
    circleProgress.setAttribute('stroke-dasharray', strokeDasharrayValue);

    if (progress < totalLength) {
        requestAnimationFrame(updateLoader);
    } else {
        // Mostrar el contenido principal después de que se complete la carga
        content.style.display = 'block'; // Mostramos el contenido
        document.querySelector('.loader-container').style.display = 'none'; // Ocultamos el loader
    }
};

// Inicia la animación
requestAnimationFrame(updateLoader);

