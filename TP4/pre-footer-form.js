// Selecciona el formulario
const form = document.getElementById('pre-footer-form');

// Añade un evento para el envío del formulario
form.addEventListener('submit', function(event) {
    // Previene el comportamiento predeterminado (que es enviar el formulario)
    event.preventDefault();

    // Imprime '¡Suscripción exítosa!' en la consola
    console.log('¡Suscripción exitosa!');
});
