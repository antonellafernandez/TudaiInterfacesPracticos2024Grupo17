// Seleccionamos los elementos necesarios
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Función para abrir la barra lateral
menuBtn.addEventListener('click', function() {
    sidebar.classList.add('active');  // Añadir clase para mostrar la barra lateral
    overlay.classList.add('active');  // Mostrar el overlay
});

// Función para cerrar la barra lateral al hacer clic fuera
overlay.addEventListener('click', function() {
    sidebar.classList.remove('active'); // Quitar la clase para ocultar la barra lateral
    overlay.classList.remove('active'); // Ocultar el overlay
});
