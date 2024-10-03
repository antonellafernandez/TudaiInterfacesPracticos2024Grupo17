// Seleccionar todos los carruseles
const carousels = document.querySelectorAll(".carousel-wrap");

carousels.forEach(carouselWrap => {
    let scrollContainer = carouselWrap.querySelector(".carousel-container");
    let carousel = carouselWrap.querySelector(".carousel");

    let prevBtn = carouselWrap.querySelector(".prev-button");
    let nextBtn = carouselWrap.querySelector(".next-button");
    let cards = carouselWrap.querySelectorAll(".card");

    let card = carouselWrap.querySelector(".card");
    const movement = carousel.offsetWidth;

    let atEnd = false;
    let atStart = true;

    prevBtn.addEventListener("click", () => {
        if (atStart) {
            // Resetear al final si se está al principio
            scrollContainer.scrollLeft = scrollContainer.scrollWidth; // Desplazar al final
            atStart = false; // Actualizar el indicador
            atEnd = false; // Resetear el indicador de fin
        } else {
            scrollContainer.style.scrollBehavior = "smooth";
            scrollContainer.scrollLeft -= movement;
        }
    });

    nextBtn.addEventListener("click", () => {
        if (atEnd) {
            // Resetear al inicio si se está al final
            scrollContainer.scrollLeft = 0;
            atEnd = false; // Reiniciar el indicador
            atStart = true; // Resetear el indicador de inicio
        } else {
            scrollContainer.style.scrollBehavior = "smooth";
            scrollContainer.scrollLeft += movement;
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
