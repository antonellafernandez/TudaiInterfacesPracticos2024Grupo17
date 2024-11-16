document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll('.circle');
  const loader = document.querySelector('.loader-container');
  const mainContent = document.querySelector('.pageContent');
  const menuButton = document.querySelector('.menu');
  const dropMenu = document.querySelector('.drop-menu');
  const navListItems = document.querySelectorAll('.nav-list li');
  const galleryImage = document.querySelector('.gallery-image');
  const video = document.querySelector('.video');
  const numero3 = document.querySelector('.numero-3');
  const parallaxElements = [
    { selector: '.numero-cuatro', speed: 0.06 },
    { selector: '.numero-cinco', speed: 0.03 },
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
    parallaxElements.forEach(({ selector, speed, offset = '0' }) => {
      const element = document.querySelector(selector);
      if (element) {
        const scrollY = window.scrollY;
        element.style.transform = `translateY(${scrollY * speed}px) translateY(${offset})`;
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
