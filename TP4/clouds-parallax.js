const layers = document.querySelectorAll('.cloud-layer');
const configs = [
    { duration: 10000, startTop: 819, startLeft: -56 },
    { duration: 15000, startTop: 517, startLeft: 794 },
    { duration: 20000, startTop: 560, startLeft: 962 }
];

function animateLayer(layer, config) {
    const cloudWidth = layer.offsetWidth;
    layer.style.top = `${config.startTop}px`;
    layer.style.left = `${config.startLeft}px`;

    let finalLeft = -(1280 + cloudWidth);
    let startTime = null;
    let startX = config.startLeft;

    function animate(time) {
        if (startTime === null) startTime = time;
        const progress = Math.min((time - startTime) / config.duration, 1);
        const currentLeft = startX + (finalLeft - startX) * progress;
        layer.style.left = `${currentLeft}px`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            layer.style.left = `1280px`; // Resetea la posición
            finalLeft = -cloudWidth;
            startTime = null;
            startX = 1280;
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

const preFooterSection = document.querySelector('.pre-footer-section');

const cloudsSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            layers.forEach((layer, index) => animateLayer(layer, configs[index]));
            cloudsSectionObserver.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.1
});
cloudsSectionObserver.observe(preFooterSection);
