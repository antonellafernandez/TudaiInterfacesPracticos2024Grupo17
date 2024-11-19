document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll('.circle');
  const loader = document.querySelector('.loader-container');
  const mainContent = document.querySelector('.pageContent');
  const menuButton = document.querySelector('.menu');
  const dropMenu = document.querySelector('.drop-menu');
  const navListItems = document.querySelectorAll('.nav-list li');
  const galleryImage = document.querySelector('.gallery-image');
  const video = document.querySelector('.video');
  const numero3 = document.querySelector('.video-youtube-numero-3');
  
  const parallaxElements = [
    { selector: '.numero-cuatro', speed: 0.06 },
    { selector: '.numero-cinco', speed: 0.03 },
  ];
  
  const parallaxLayers = [
    { selector: '.layer-15', speed: 0.2 },
    { selector: '.layer-14', speed: 0.25 },
    { selector: '.layer-13', speed: 0.3 },
    { selector: '.layer-12', speed: 0.35 },
    { selector: '.layer-11', speed: 0.4 },
    { selector: '.layer-10', speed: 0.45 },
    { selector: '.layer-9', speed: 0.5 },
    { selector: '.layer-8', speed: 0.55 },
    { selector: '.layer-7', speed: 0.6 }, // Árboles, rocas y arbustos
    { selector: '.layer-6', speed: 0.2 }, // Personajes más cercanos
    { selector: '.layer-5', speed: 0.2 },
    { selector: '.layer-4', speed: 0.2 },
  ];

  let currentIndex = 0;
  const showLoaderDuration = 3000;
  const images = ["images/gal1.svg", "images/gal2.svg", "images/gal3.svg"];
  const nextImage = document.createElement('img');
  nextImage.classList.add('gallery-image');
  document.querySelector('.image-frame').appendChild(nextImage);

  // Helper functions
  const toggleClassOnScroll = (element, className, offset = 0) => {
    const scrollY = window.scrollY;
    if (scrollY > offset) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  };

  const applyParallax = () => {
    [...parallaxElements, ...parallaxLayers].forEach(({ selector, speed }) => {
      const element = document.querySelector(selector);
      if (element) {
        const scrollY = window.scrollY;
        const offset = parseFloat(getComputedStyle(element).getPropertyValue('--offset') || 0);
        element.style.transform = `translateY(${scrollY * speed + offset}px)`;
      }
    });
  };

  // Animations
  const showNextCircle = () => {
    circles.forEach((circle, index) => {
      circle.style.opacity = '0';
      circle.style.transform = 'scale(0.5)';
    });
    const nextCircle = circles[currentIndex];
    nextCircle.style.opacity = '1';
    nextCircle.style.transform = 'scale(1)';
    currentIndex = (currentIndex + 1) % circles.length;
    setTimeout(showNextCircle, 1000);
  };

  const changeGalleryImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    nextImage.src = images[currentIndex];
    nextImage.classList.add('slide-in-left');
    galleryImage.classList.add('slide-out-left');
    setTimeout(() => {
      galleryImage.src = nextImage.src;
      galleryImage.classList.remove('slide-out-left');
      nextImage.classList.remove('slide-in-left');
    }, 600);
  };

  const handleCardsVisibility = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight * 0.8) {
        card.classList.add('visible');
      }
    });
  };

  // Event Listeners
  window.addEventListener('scroll', () => {
    toggleClassOnScroll(document.querySelector('header'), 'abajo', 0);
    toggleClassOnScroll(dropMenu, 'abajo2', 0);
    toggleClassOnScroll(document.querySelector('.layer-3'), 'small', 20);
    applyParallax();
    handleCardsVisibility();
  });

  menuButton.addEventListener('click', () => {
    dropMenu.classList.toggle('visible');
    menuButton.classList.toggle('active');
    if (dropMenu.classList.contains('visible')) {
      navListItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 200}ms`;
      });
    }
  });

  // Initialization
  setTimeout(() => {
    loader.style.display = 'none';
    mainContent.style.display = 'block';
  }, showLoaderDuration);

  showNextCircle();
  setInterval(changeGalleryImage, 3000);
});




/* FUNCIÓN DE PARALLAX AL MOVERSE CONTRA EL MOUSE */
(function() {
  // Add event listener
  document.addEventListener("mousemove", parallax);
  const elem = document.querySelector("#parallax");

  // Magic happens here
  function parallax(e) {
    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;
    let _mouseX = e.clientX;
    let _mouseY = e.clientY;

    // Invert the direction by changing the signs
    let _depth1 = `${50 + (_mouseX - _w) * 0.01}% ${50 + (_mouseY - _h) * 0.01}%`;
    let _depth2 = `${50 + (_mouseX - _w) * 0.02}% ${50 + (_mouseY - _h) * 0.02}%`;
    let _depth3 = `${50 + (_mouseX - _w) * 0.06}% ${50 + (_mouseY - _h) * 0.06}%`;

    let position = `${_depth3}, ${_depth2}, ${_depth1}`;

    console.log(position);
    elem.style.backgroundPosition = position;
  }
})();
