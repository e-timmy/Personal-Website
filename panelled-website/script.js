const menu = document.getElementById('menu');
const menuIcon = document.querySelector('.menu-icon');
const menuLinks = document.querySelectorAll('#menu ul li a');
const sections = document.querySelectorAll('section');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
});

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));

        sections.forEach(section => {
            section.classList.remove('active');
        });

        setTimeout(() => {
            target.classList.add('active');
        }, 800);

        menu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
        menu.classList.remove('active');
    }
});