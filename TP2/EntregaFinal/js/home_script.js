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

// Animación carouseles
// Función de easing (aceleración rápida y desaceleración lenta)
function easeInOutCubic(progress) {
    if (progress < 0.5) {
        return 4 * progress * progress * progress;
    }
    return 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

// Función personalizada de desplazamiento suave con animación
function smoothScroll(scrollContainer, distance, duration) {
    const start = scrollContainer.scrollLeft;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const easing = easeInOutCubic(progress);
        scrollContainer.scrollLeft = start + distance * easing;

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Función para agregar evento scroll a cada carousel
function addScrollEvent(carousel) {
    let lastScrollPosition = 0;
    const cards = carousel.querySelectorAll('.card, .featured-card');

    carousel.addEventListener('scroll', () => {
        const scrollX = carousel.scrollLeft;
        const scrollDirection = scrollX > lastScrollPosition ? 'right' : 'left';
        lastScrollPosition = scrollX;

        if (scrollDirection === 'right') {
            cards.forEach((card) => {
                card.classList.add('animate-scale-right');
                card.classList.remove('animate-scale-left');
            });
        } else if (scrollDirection === 'left') {
            cards.forEach((card) => {
                card.classList.add('animate-scale-left');
                card.classList.remove('animate-scale-right');
            });
        }
    });
}

// Seleccionar todos los carruseles
const carousels = document.querySelectorAll(".carousel-wrap");

carousels.forEach(carouselWrap => {
    const scrollContainer = carouselWrap.querySelector(".carousel-container");
    const prevBtn = carouselWrap.querySelector(".prev-button");
    const nextBtn = carouselWrap.querySelector(".next-button");
    const movement = carouselWrap.querySelector(".carousel").offsetWidth;
    const duration = 1000;

    let atEnd = false;
    let atStart = true;

    prevBtn.addEventListener("click", () => {
        if (atStart) {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth;
            atStart = false;
            atEnd = false;
        } else {
            smoothScroll(scrollContainer, -movement, duration);
        }
    });

    nextBtn.addEventListener("click", () => {
        if (atEnd) {
            scrollContainer.scrollLeft = 0;
            atEnd = false;
            atStart = true;
        } else {
            smoothScroll(scrollContainer, movement, duration);
        }
    });

    scrollContainer.addEventListener('scroll', () => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
            atEnd = true;
        } else {
            atEnd = false;
        }

        if (scrollContainer.scrollLeft === 0) {
            atStart = true;
        } else {
            atStart = false;
        }
    });

    addScrollEvent(scrollContainer);
});

// Agregar evento scroll a featured carousel
addScrollEvent(document.querySelector('.featured-carousel-container'));
