// Escuchar el evento de scroll
window.addEventListener('scroll', function() {
    // Obtener la posición actual del scroll
    let scrollPosition = window.scrollY;

    // Ajustar la velocidad del movimiento para cada elemento
    let video = document.querySelector('.video');
    let numero3 = document.querySelector('.numero-3');

    // Definir las velocidades de desplazamiento
    let videoSpeed = 0.5; // El video se moverá a la mitad de la velocidad del scroll
    let numero3Speed = 0.2; // El personaje se moverá más despacio

    // Aplicar el transform para mover el video y el personaje
    video.style.transform = 'translateY(' + scrollPosition * videoSpeed + 'px)';
    numero3.style.transform = 'translateY(' + scrollPosition * numero3Speed + 'px)';
});
