const section = document.querySelector('.video-youtube');
const video = document.querySelector('.video');
const videoNumero3 = document.querySelector('.video-youtube-numero-3');
let parallaxActive = false;

const youTubeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            parallaxActive = true; // Activa el parallax cuando la sección es visible
        } else {
            parallaxActive = false; // Desactiva el parallax cuando la sección no es visible
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});
youTubeSectionObserver.observe(section);

window.addEventListener('scroll', () => {
    if (!parallaxActive) return;

    const sectionRect = section.getBoundingClientRect();
    const scrollOffset = sectionRect.top;

    video.style.transform = `translateY(${-scrollOffset * 0.05}px)`;
    videoNumero3.style.transform = `translateY(${-scrollOffset * 0.1}px)`;
});
