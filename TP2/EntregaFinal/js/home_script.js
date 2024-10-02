// Selecciona todos los carruseles
const carousels = document.querySelectorAll(".carousel-wrap");

carousels.forEach(carouselWrap => {
    let scrollContainer = document.querySelector(".carousel-container");

    let prevBtn = document.querySelector(".prev-button");
    let nextBtn = document.querySelector(".next-button");
    let cards = document.querySelectorAll(".card");

    let card = document.querySelector(".card");
    const movement = card.offsetWidth;

    prevBtn.addEventListener("click", () => {
        scrollContainer.style.scrollBehavior = "smooth";
        scrollContainer.scrollLeft -= movement;
    });

    nextBtn.addEventListener("click", () => {
        scrollContainer.style.scrollBehavior = "smooth";
        scrollContainer.scrollLeft += movement;
    });
});
