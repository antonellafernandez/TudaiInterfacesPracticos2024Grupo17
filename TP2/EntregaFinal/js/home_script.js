// Función para el loading
document.addEventListener('DOMContentLoaded', function () {
    const loadingContainer = document.getElementById('loading');
    const content = document.getElementById('content');
    const percentageText = document.getElementById('percentage');

    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 1; // Aumentar el progreso en 1% cada 100ms
        percentageText.textContent = `${progress}%`;

        if (progress >= 100) {
            clearInterval(loadingInterval); // Detener el intervalo
            loadingContainer.style.display = 'none'; // Ocultar el loading
            content.style.display = 'block'; // Mostrar el contenido
        }
    }, 50); 
});



// Función de easing (aceleración rápida y desaceleración lenta)
function easeInOutCubic(progress) {
    if (progress < 0.5) {
        return 4 * progress * progress * progress; // Aceleración rápida
    }
    return 1 - Math.pow(-2 * progress + 2, 3) / 2; // Desaceleración lenta
}

// Función personalizada de desplazamiento suave con animación
function smoothScroll(scrollContainer, distance, duration) {
    const start = scrollContainer.scrollLeft;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Normaliza entre 0 y 1

        const easing = easeInOutCubic(progress); // Aplica la curva de aceleración
        scrollContainer.scrollLeft = start + distance * easing; // Actualiza la posición

        if (timeElapsed < duration) {
            requestAnimationFrame(animation); // Sigue animando hasta completar la duración
        }
    }

    requestAnimationFrame(animation); // Inicia la animación
}

// Seleccionar todos los carruseles
const carousels = document.querySelectorAll(".carousel-wrap");

carousels.forEach(carouselWrap => {
    let scrollContainer = carouselWrap.querySelector(".carousel-container");
    let carousel = carouselWrap.querySelector(".carousel");

    let prevBtn = carouselWrap.querySelector(".prev-button");
    let nextBtn = carouselWrap.querySelector(".next-button");
    let cards = carouselWrap.querySelectorAll(".card");

    let movement = carousel.offsetWidth; // Ancho de un "card"
    let duration = 1000; // Duración de la animación en milisegundos

    let atEnd = false;
    let atStart = true;

    prevBtn.addEventListener("click", () => {
        if (atStart) {
            // Resetear al final si se está al principio
            scrollContainer.scrollLeft = scrollContainer.scrollWidth; // Desplazar al final
            atStart = false; // Actualizar el indicador
            atEnd = false; // Resetear el indicador de fin
        } else {
            smoothScroll(scrollContainer, -movement, duration); // Desplazarse hacia la izquierda
        }
    });

    nextBtn.addEventListener("click", () => {
        if (atEnd) {
            // Resetear al inicio si se está al final
            scrollContainer.scrollLeft = 0; // Desplazar al inicio
            atEnd = false; // Reiniciar el indicador
            atStart = true; // Resetear el indicador de inicio
        } else {
            smoothScroll(scrollContainer, movement, duration); // Desplazarse hacia la derecha
        }
    });

    scrollContainer.addEventListener('scroll', () => {
        // Verificar si se ha alcanzado el final del scroll
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
            atEnd = true; // Indicar que se ha llegado al final
        } else {
            atEnd = false;
        }

        // Verificar si se está al principio
        if (scrollContainer.scrollLeft === 0) {
            atStart = true; // Indicar que está en el principio
        } else {
            atStart = false;
        }
    });
});
