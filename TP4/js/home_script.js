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
    let lastScrollPosition = carousel.scrollLeft; // Inicializar con la posición actual

    carousel.addEventListener('scroll', () => {
        const scrollX = carousel.scrollLeft;

        // Evitar el procesamiento si no hay cambio en la posición
        if (scrollX === lastScrollPosition) return;

        const scrollDirection = scrollX > lastScrollPosition ? 'right' : 'left';
        lastScrollPosition = scrollX;

        // Seleccionar todas las cards actuales (incluye las clonadas)
        const allCards = carousel.querySelectorAll('.card, .featured-card');

        allCards.forEach((card) => {
            if (scrollDirection === 'right') {
                card.classList.add('animate-scale-right');
                card.classList.remove('animate-scale-left');
            } else {
                card.classList.add('animate-scale-left');
                card.classList.remove('animate-scale-right');
            }

            // Reiniciar la animación
            setTimeout(() => {
                card.classList.remove('animate-scale-right');
                card.classList.remove('animate-scale-left');
            }, 1000);
        });
    });
}

// Seleccionar todos los carruseles
const carousels = document.querySelectorAll(".carousel-wrap");

carousels.forEach(carouselWrap => {
    const scrollContainer = carouselWrap.querySelector(".carousel-container");
    const carousel = carouselWrap.querySelector(".carousel");
    const gap = parseFloat(getComputedStyle(carousel).gap);
    const card = carouselWrap.querySelector(".card");
    const prevBtn = carouselWrap.querySelector(".prev-button");
    const nextBtn = carouselWrap.querySelector(".next-button");

    const movementLeft = carousel.offsetWidth;
    const movementRight = (card.offsetWidth + gap) * 5;
    const duration = 1000;

    const clonedCarouselStart = carousel.cloneNode(true);
    const clonedCarouselEnd = carousel.cloneNode(true);
    scrollContainer.insertBefore(clonedCarouselStart, scrollContainer.firstChild);
    scrollContainer.appendChild(clonedCarouselEnd);
    scrollContainer.style.gap = getComputedStyle(carousel).gap;

    addScrollEvent(clonedCarouselStart);
    addScrollEvent(clonedCarouselEnd);

    scrollContainer.scrollLeft = clonedCarouselStart.offsetWidth + gap;

    prevBtn.addEventListener("click", () => {
        const clonedCarousel = carousel.cloneNode(true);
        scrollContainer.insertBefore(clonedCarousel, scrollContainer.firstChild);
        scrollContainer.style.gap = getComputedStyle(carousel).gap;

        addScrollEvent(clonedCarousel);
        scrollContainer.scrollLeft += clonedCarousel.offsetWidth;
        smoothScroll(scrollContainer, -movementLeft, duration);
    });

    nextBtn.addEventListener("click", () => {
        const clonedCarousel = carousel.cloneNode(true);
        scrollContainer.appendChild(clonedCarousel);
        scrollContainer.style.gap = getComputedStyle(carousel).gap;

        addScrollEvent(clonedCarousel);
        smoothScroll(scrollContainer, movementRight, duration);
    });

    addScrollEvent(scrollContainer);
});

// Agregar evento scroll a featured carousel
addScrollEvent(document.querySelector('.featured-carousel-container'));

// Transformar en desplegable el footer Mobile
// Agregar evento click a cada h3
document.querySelectorAll('.footer-column h3').forEach(h3 => {
    h3.addEventListener('click', () => {
        // Toggle clase 'active' en el h3
        h3.classList.toggle('active');
        // Toggle visibilidad de la ul
        h3.nextElementSibling.classList.toggle('show');
    });
});