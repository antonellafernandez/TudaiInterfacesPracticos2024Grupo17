const layers = document.querySelectorAll('.cloud-layer');

// Configuración de cada capa (sin especificar cloudWidth)
const configs = [
    { duration: 10000, startTop: 819, startLeft: -56 }, // Layer 1
    { duration: 15000, startTop: 517, startLeft: 794 }, // Layer 2
    { duration: 20000, startTop: 560, startLeft: 962 }  // Layer 3
];

// Función para animar cada capa
function animateLayer(layer, config) {
    // Calcular el ancho de la nube (cloudWidth) basado en el objeto HTML
    const cloudWidth = layer.offsetWidth;

    // Configurar posición inicial
    layer.style.top = `${config.startTop}px`;
    layer.style.left = `${config.startLeft}px`;

    // Calcular el valor final de left
    let finalLeft = -(1280 + cloudWidth);

    let startTime = null; // Variable para almacenar el tiempo inicial
    let startX = config.startLeft;

    // Función para mover la capa
    function animate(time) {

        if (startTime === null) {
            startTime = time; // Establecer tiempo inicial cuando comience la animación
        }

        // Calcular la proporción de la animación
        const progress = Math.min((time - startTime) / config.duration, 1);

        // Mover la capa según el progreso de la animación
        const currentLeft = startX + (finalLeft - startX) * progress;
        layer.style.left = `${currentLeft}px`;

        // Continuar la animación si no ha llegado al final
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Reconfigurar posición inicial
            layer.style.left = `1280px`;

            // Restablecer variables
            finalLeft = -cloudWidth;
            startTime = null;
            startX = 1280;

            requestAnimationFrame(animate); // Iniciar nuevamente la animación
        }
    }

    // Iniciar la animación
    requestAnimationFrame(animate);
}

// Seleccionar la sección `pre-footer-section`
const preFooterSection = document.querySelector('.pre-footer-section');

// Configurar Intersection Observer para la sección
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Iniciar la animación de todas las capas
                layers.forEach((layer, index) => animateLayer(layer, configs[index]));

                // Dejar de observar la sección (evita reiniciar animaciones)
                observer.unobserve(entry.target);
            }
        });
    },
    {
        root: null, // Viewport actual
        threshold: 0.1, // Activar cuando el 10% de la sección sea visible
    }
);

// Observar la sección
observer.observe(preFooterSection);
