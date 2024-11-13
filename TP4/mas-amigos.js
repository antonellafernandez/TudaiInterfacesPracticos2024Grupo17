// Selecciona las imágenes y las secciones de texto
const images = document.querySelectorAll('.amigos-diversion-image');
const textSections = document.querySelectorAll('.amigos-diversion-right div');

// Asegura que cada imagen tenga un evento onload para manejar su visibilidad
images.forEach((img, index) => {
    img.onload = () => {
        // La primera imagen será visible al inicio
        if (index === 0) {
            img.classList.add('active');
        }
    };
});

// Función para manejar el cambio de imágenes en el scroll
function handleScroll() {
    // Obtiene la posición del scroll en píxeles
    const scrollPosition = window.scrollY;

    textSections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.offsetHeight;

        // Verifica si el scroll está en el área visible de la sección
        if (scrollPosition >= sectionTop - window.innerHeight / 2 &&
            scrollPosition < sectionTop + sectionHeight) {

            // Muestra la imagen correspondiente, o la primera imagen si es el último div
            images.forEach(img => img.classList.remove('active'));

            if (index < images.length) {
                images[index].classList.add('active');
            } else {
                // Si es el último div, muestra la primera imagen
                images[0].classList.add('active');
            }
        }
    });
}

// Ejecuta la función en cada desplazamiento
window.addEventListener('scroll', handleScroll);
