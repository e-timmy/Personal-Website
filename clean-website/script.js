const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');

tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();

        const targetSection = this.getAttribute('data-section');

        sections.forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden'); // Add 'hidden' class to all sections
        });

        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
            setTimeout(() => {
                targetElement.classList.remove('hidden'); // Remove 'hidden' class from target section
            }, 500); // Adjust the delay as needed
        }
    });
});