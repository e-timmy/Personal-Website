document.addEventListener('DOMContentLoaded', function() {
    const mapPins = document.querySelectorAll('.map-pin');
    const infoContents = document.querySelectorAll('.info-content');

    mapPins.forEach(pin => {
        pin.addEventListener('click', function() {
            const infoType = this.getAttribute('data-info');
            showInfo(infoType);
        });
    });

    function showInfo(infoType) {
        infoContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${infoType}-info`).classList.add('active');

        mapPins.forEach(pin => {
            pin.style.transform = 'scale(1)';
            pin.style.boxShadow = 'none';
        });
        document.querySelector(`.${infoType}-pin`).style.transform = 'scale(1.2)';
        document.querySelector(`.${infoType}-pin`).style.boxShadow = '0 0 15px rgba(228, 30, 49, 0.7)';
    }

    // Show location info by default
    showInfo('location');

    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Here you would typically send the form data to your server
        // For this example, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Dynamic subject line based on selection
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');

    subjectSelect.addEventListener('change', function() {
        let defaultMessage = '';
        switch(this.value) {
            case 'reservation':
                defaultMessage = 'I would like to make a reservation for...';
                break;
            case 'feedback':
                defaultMessage = 'I recently dined at Thin Jimmy\'s and wanted to share my experience...';
                break;
            case 'catering':
                defaultMessage = 'Im interested in your catering services for an upcoming event...';
                break;
            default:
                defaultMessage = '';
        }
        messageTextarea.value = defaultMessage;
    });
});