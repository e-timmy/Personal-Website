const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');

tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();

        // Get the target section ID from the data-section attribute
        const targetSection = this.getAttribute('data-section');

        // Remove 'active' class from all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Add 'active' class to the target section
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
        }
    });
});