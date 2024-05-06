const menu = document.getElementById('menu');
const menuLinks = document.querySelectorAll('#menu ul li a');
const sections = document.querySelectorAll('section');

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));

        sections.forEach(section => {
            section.classList.remove('active');
        });

        target.classList.add('active');
        menu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
        menu.classList.remove('active');
    }
});

document.addEventListener('mousemove', (e) => {
    if (e.clientX <= 20) {
        menu.classList.add('active');
    }
});