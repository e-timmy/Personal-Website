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