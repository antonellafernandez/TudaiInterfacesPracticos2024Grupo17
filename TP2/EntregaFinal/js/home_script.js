// Selecciona todos los carruseles
const carousels = document.querySelectorAll(".carousel-wrap");

carousels.forEach(carouselWrap => {
    let scrollContainer = carouselWrap.querySelector(".carousel-container");

    let prevBtn = carouselWrap.querySelector(".prev-button");
    let nextBtn = carouselWrap.querySelector(".next-button");
    let cards = carouselWrap.querySelectorAll(".card");

    let card = carouselWrap.querySelector(".card");
    const movement = card.offsetWidth;

    let atEnd = false; // Indicador de si estamos al final

    prevBtn.addEventListener("click", () => {
        scrollContainer.style.scrollBehavior = "smooth";
        scrollContainer.scrollLeft -= movement;
        atEnd = false; // Reiniciamos indicador al desplazarse hacia atrás
    });

    nextBtn.addEventListener("click", () => {
        if (atEnd) {
            // Si estamos al final, reseteamos al inicio
            scrollContainer.scrollLeft = 0;
            atEnd = false; // Reiniciamos el indicador
        } else {
            scrollContainer.style.scrollBehavior = "smooth";
            scrollContainer.scrollLeft += movement;
        }
    });

    scrollContainer.addEventListener('scroll', () => {
        // Verificar si se ha alcanzado el final del scroll
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
            atEnd = true; // Indicamos que hemos llegado al final
        }
    });
});

