document.addEventListener("scroll", () => {
    const images = document.querySelectorAll(".amigos-diversion-image");
    const scrollPosition = window.scrollY;
    const imageHeight = window.innerHeight / images.length;

    images.forEach((img, index) => {
        if (scrollPosition > imageHeight * index && scrollPosition < imageHeight * (index + 1)) {
            img.style.opacity = "1";
            img.style.transform = "scale(1.05)"; // Pequeño zoom
        } else {
            img.style.opacity = "0";
            img.style.transform = "scale(1)"; // Vuelve al tamaño normal
        }
    });
});
