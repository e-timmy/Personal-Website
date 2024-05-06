const colors = ['#8FBC8F', '#FFC0CB', '#FFE4B5', '#B0E0E6'];
let currentColorIndex = 0;

const homeLink = document.querySelector

('.home-link');
const aboutLink = document.querySelector('.about-link');
const homeSection = document.getElementById('home');
const aboutSection = document.getElementById('about');
const menu = document.querySelector('.menu');

function createExplosion(x, y, color, size, velocity, delay, isMain = false) {
    const explosion = document.createElement('div');
    explosion.classList.add('color-explosion');
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';
    explosion.style.backgroundColor = color;
    explosion.style.width = size + 'px';
    explosion.style.height = size + 'px';
    explosion.style.transform = `translate(-50%, -50%) scale(0)`;
    explosion.style.transition = 'transform 1s ease-out';
    explosion.style.transitionDelay = delay + 'ms';

    document.body.appendChild(explosion);

    setTimeout(function() {
        explosion.style.transform = `translate(-50%, -50%) scale(${velocity})`;
    }, delay);

    return explosion;
}

function navigateToSection(event, section) {
    event.preventDefault();

    const mainExplosionSize = Math.max(window.innerWidth, window.innerHeight) * 2.5;
    const numExplosions = 3; // Number of smaller explosions
    let colourIndex = (currentColorIndex + 1) % colors.length;

    const explosions = [];

    for (let i = 0; i < numExplosions; i++) {
        const size = Math.random() * 100 + 50; // Random size between 50 and 150
        const offsetX = (Math.random() - 0.5) * 400; // Random offset between -200 and 200
        const offsetY = (Math.random() - 0.5) * 400;
        const velocity = Math.random() * 0.3 + 0.3; // Random velocity between 0.3 and 0.6
        const delay = i * 100; // Delay each explosion by 100ms
        const explosion = createExplosion(event.clientX + offsetX, event.clientY + offsetY, colors[colourIndex], size, velocity, delay);
        explosions.push(explosion);
        colourIndex = (colourIndex + 1) % colors.length;
    }

    const mainExplosion = createExplosion(event.clientX, event.clientY, colors[(currentColorIndex + 1) % colors.length], mainExplosionSize, 0.8, numExplosions * 100, true);
    explosions.push(mainExplosion);

    menu.style.opacity = 0;
    homeSection.style.opacity = 0;
    aboutSection.style.opacity = 0;

    mainExplosion.addEventListener('transitionend', function() {
        document.body.style.backgroundColor = colors[(currentColorIndex + 1) % colors.length];
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        homeSection.style.display = 'none';
        aboutSection.style.display = 'none';
        menu.style.opacity = 1;

        explosions.forEach(explosion => {
            explosion.remove();
        });

        section.style.display = 'block';
        section.style.opacity = 1;
    });
}

homeLink.addEventListener('click', function(event) {
    navigateToSection(event, homeSection);
});

aboutLink.addEventListener('click', function(event) {
    navigateToSection(event, aboutSection);
});