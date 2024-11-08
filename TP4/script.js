document.addEventListener('DOMContentLoaded', function () {
  const scrollFactor = 0.3; // Ajusta este valor para controlar la velocidad de movimiento

  const spiderman = document.querySelector('.layer-5');
  const spidermanLimit = 400; // Ajusta este valor al punto en el que deseas detener la animación

  const telarana = document.querySelector('.layer-2');
  const telaranaLimit = 400;
  
  const chicaSpiderman = document.querySelector('.layer-6');
  const chicaSpidermanLimit = 700; 

  const blackSpiderman = document.querySelector('.layer-4');
  const blackSpidermanLimit = 400; 

  const telarana2 = document.querySelector('.layer-1');
  const telaran2aLimit = 400;

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

    // Ajustar la posición vertical de Spiderman dentro del rango especificado
    if (scrollY <= spidermanLimit) {
      spiderman.style.transform = `translateY(${scrollY * 0.2}px)`;
    }

    // Ajustar la posición vertical de la telaraña dentro del rango especificado
    if (scrollY <= telaranaLimit) {
      const rotationAngle = 65.403; // Ángulo de rotación en el CSS
      const translateY = (scrollY * 0.2) * Math.sin(rotationAngle * (Math.PI / 180));
      telarana.style.transform = `translateY(${translateY}px) rotate(${rotationAngle}deg)`;
    }

    if (scrollY <= chicaSpidermanLimit) {
      chicaSpiderman.style.transform = `translateY(${scrollY * 0.2}px)`;
    }

    if (scrollY <= blackSpidermanLimit) {
      blackSpiderman.style.transform = `translateY(${scrollY * 0.2}px)`;
    }

    if (scrollY <= telaran2aLimit) {
      telarana2.style.transform = `translateY(${scrollY * 0.2}px)`;
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


