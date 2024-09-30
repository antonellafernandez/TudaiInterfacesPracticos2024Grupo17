document.getElementById('playButton').addEventListener('click', function() {
    // Añade la clase de animación
    this.classList.add('animate');

    // Opcional: Eliminar la clase después de un tiempo para permitir múltiples clics
    setTimeout(() => {
        this.classList.remove('animate');
    }, 600); // Tiempo igual al de la duración de la animación
});