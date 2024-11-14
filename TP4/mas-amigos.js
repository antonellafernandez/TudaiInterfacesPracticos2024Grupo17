// Selecciona las imágenes y las secciones de texto
const images = document.querySelectorAll('.amigos-diversion-image');
const textSections = document.querySelectorAll('.amigos-diversion-right div');

// Asegura que cada imagen tenga un evento onload para manejar su visibilidad
images.forEach((img, index) => {
    img.onload = () => {
        // Una vez que la imagen ha cargado, se le puede aplicar la transición cuando sea activa
        if (index === 0) {
            img.classList.add('active'); // La primera imagen será visible al inicio
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

            // Muestra la imagen correspondiente
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }
    });
}

// Ejecuta la función en cada desplazamiento
window.addEventListener('scroll', handleScroll);
