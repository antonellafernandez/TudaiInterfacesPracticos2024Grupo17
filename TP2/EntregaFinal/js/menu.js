// Selecciona el menú de hamburguesa, la barra lateral y el botón de cierre
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');
const content = document.querySelector('.content');

// Función para mostrar la barra lateral
menuBtn.addEventListener('click', function() {
    sidebar.style.left = '0';
    content.classList.add('sidebar-open');
});

// Función para cerrar la barra lateral
closeBtn.addEventListener('click', function() {
    sidebar.style.left = '-250px';
    content.classList.remove('sidebar-open');
});