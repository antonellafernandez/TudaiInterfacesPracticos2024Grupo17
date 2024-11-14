document.addEventListener('DOMContentLoaded', function () {
  const scrollFactor = 0.3; // Ajusta este valor para controlar la velocidad de movimiento
  

  window.addEventListener('scroll', function () {
    let logo = document.querySelector('.layer-3');

    var header = document.querySelector("header")
    header.classList.toggle("abajo",window.scrollY>0)  //cuando la haga scroll y el valor sea mayor a 0
    
    var dropMenu = document.querySelector(".drop-menu")
    dropMenu.classList.toggle("abajo2",window.scrollY>0) 
    
    // Obtener el desplazamiento vertical de la página
    const scrollY = window.scrollY || window.pageYOffset;
    
    
    // Agregar la clase 'small' cuando el desplazamiento es mayor que 200px
    if (window.scrollY > 20) {
        logo.classList.add("small");
    } else {
        logo.classList.remove("small");
    }

  
    
  });
});


const menuButton = document.querySelector('.menu');
const dropMenu = document.querySelector('.drop-menu');
const navListItems = document.querySelectorAll('.nav-list li');

menuButton.addEventListener('click', function() {
  dropMenu.classList.toggle('visible');
  menuButton.classList.toggle('active');

  if (dropMenu.classList.contains('visible')) {
    navListItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 200}ms`; // retraso de los LI
    });
  }
});


window.addEventListener('scroll', function() {
  var scrollY = window.scrollY;

  // Efecto parallax para .numero-cuatro (movimiento muy sutil)
  var numeroCuatro = document.querySelector('.numero-cuatro');
  numeroCuatro.style.transform = `translateY(${scrollY * 0.04}px)`;  // Movimiento muy sutil

  // Efecto parallax para .numero-cinco (movimiento más suave, menos pronunciado)
  var numeroCinco = document.querySelector('.numero-cinco');
  numeroCinco.style.transform = `translateY(${scrollY * 0.03}px)`;  // Movimiento más sutil
});

window.addEventListener('scroll', function() {
  var cards = document.querySelectorAll('.card');
  
  // Recorre todas las tarjetas
  cards.forEach(function(card) {
    var rect = card.getBoundingClientRect();
    
    // Si la tarjeta está dentro del viewport (ajustando el top a la altura de la ventana)
    if (rect.top >= 0 && rect.top <= window.innerHeight * 0.8) { // 80% de la ventana
      card.classList.add('visible');  // Activa la animación
    }
  });
});