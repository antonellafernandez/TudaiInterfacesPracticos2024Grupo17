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


