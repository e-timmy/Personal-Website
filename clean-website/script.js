const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');

tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = this.getAttribute('data-section');

        // Remove active class from all tabs and sections
        tabs.forEach(tab => tab.classList.remove('active'));
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = 0;
        });

        // Add active class to the clicked tab and corresponding section
        this.classList.add('active');
        const selectedSection = document.getElementById(targetSection);
        setTimeout(() => {
            selectedSection.classList.add('active');
            setTimeout(() => {
                selectedSection.style.opacity = 1;
            }, 50);
        }, 500); // Delay the fade-in by 500ms to ensure the previous section has faded out completely
    });
});