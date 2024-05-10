const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav ul li a');
const navBar = document.querySelector('nav');

function scrollToTop() {
    return new Promise((resolve) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(resolve, 500); // Adjust the delay as needed
    });
}

function showSection(section) {
    setTimeout(() => {
        section.classList.add('active');
        setTimeout(() => {
            section.style.opacity = 1;
        }, 50);
    }, 500);
}

tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = this.getAttribute('data-section');
        const targetSubsection = this.getAttribute('href');

        // Remove active class from all tabs and sections
        tabs.forEach(tab => tab.classList.remove('active'));
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = 0;
        });

        // Add active class to the clicked tab
        this.classList.add('active');
        const selectedSection = document.getElementById(targetSection);

        if (targetSubsection) {
            const subsection = document.querySelector(targetSubsection);
            if (subsection) {
                const sectionTop = selectedSection.offsetTop;
                const subsectionTop = subsection.offsetTop;
                const navBarHeight = navBar.offsetHeight;
                const scrollPosition = subsectionTop - sectionTop - navBarHeight;
                window.scrollTo({ top: sectionTop + scrollPosition, behavior: 'smooth' });
                setTimeout(() => {
                    showSection(selectedSection);
                }, 800); // Adjust the delay as needed
            }
        } else {
            scrollToTop().then(() => {
                showSection(selectedSection);
            });
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = this.getAttribute('data-section');

        // Remove active class from all tabs and sections
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = 0;
        });

        // Add active class to the clicked navigation link
        this.classList.add('active');
        const selectedSection = document.getElementById(targetSection);
        scrollToTop().then(() => {
            showSection(selectedSection);
        });
    });
});

// SNAKE
document.addEventListener('DOMContentLoaded', function() {
    var snake = document.getElementById('snake');
    var snakeBodies = document.querySelectorAll('.snake-body');
    var snakeLength = snakeBodies.length;
    var borderWidth = 20; // Adjust this value to match the snake's width/height
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var currentDirection = 'right';
    var currentPosition = { x: 0, y: 0 };

    function moveSnake() {
        var newPosition = { x: currentPosition.x, y: currentPosition.y };

        if (currentDirection === 'right') {
            newPosition.x += borderWidth;
            if (newPosition.x >= screenWidth - borderWidth) {
                currentDirection = 'down';
            }
        } else if (currentDirection === 'down') {
            newPosition.y += borderWidth;
            if (newPosition.y >= screenHeight - borderWidth) {
                currentDirection = 'left';
            }
        } else if (currentDirection === 'left') {
            newPosition.x -= borderWidth;
            if (newPosition.x <= 0) {
                currentDirection = 'up';
            }
        } else if (currentDirection === 'up') {
            newPosition.y -= borderWidth;
            if (newPosition.y <= 0) {
                currentDirection = 'right';
            }
        }

        currentPosition = newPosition;

        for (var i = snakeLength - 1; i > 0; i--) {
            snakeBodies[i].style.left = snakeBodies[i - 1].style.left;
            snakeBodies[i].style.top = snakeBodies[i - 1].style.top;
        }

        snakeBodies[0].style.left = currentPosition.x + 'px';
        snakeBodies[0].style.top = currentPosition.y + 'px';
    }

    setInterval(moveSnake, 200); // Adjust the interval (in milliseconds) to control the snake's speed
});

