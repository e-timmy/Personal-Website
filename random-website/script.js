document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const footer = document.querySelector('.site-footer');
    const container = document.querySelector('.container');
    const currentPage = window.location.pathname.split('/').pop() || 'index.php';

    // Initialize transition state from session storage
    const isFirstLoad = !sessionStorage.getItem('lastPage');
    const lastPage = sessionStorage.getItem('lastPage') || '';
    sessionStorage.setItem('lastPage', currentPage);

    // Set page state
    document.body.setAttribute('data-page', currentPage.replace('.php', ''));

    // Initialize header/footer state
    if (currentPage !== 'index.php') {
        if (lastPage === 'index.php') {
            // Coming from homepage, animate in
            setTimeout(() => {
                header.classList.add('visible');
                footer.classList.add('visible');
            }, 0);
        } else {
            // Direct load or subpage transition, show immediately
            header.classList.add('visible');
            footer.classList.add('visible');
        }
    }

    // Fade in content
    requestAnimationFrame(() => {
        container.style.opacity = '1';
    });

    // Handle page transitions
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').endsWith('.php')) {
                e.preventDefault();
                const targetPage = this.getAttribute('href');
                handlePageTransition(currentPage, targetPage);
            }
        });
    });
});

function handlePageTransition(currentPage, targetPage) {
    const container = document.querySelector('.container');
    const header = document.querySelector('.site-header');
    const footer = document.querySelector('.site-footer');

    // Fade out content first
    container.style.opacity = '0';

    if (currentPage === 'index.php') {
        // From homepage to any page
        setTimeout(() => {
            if (targetPage !== 'index.php') {
                header.classList.add('visible');
                footer.classList.add('visible');
            }
            setTimeout(() => {
                sessionStorage.setItem('lastPage', currentPage);
                window.location.href = targetPage;
            }, 500);
        }, 100);
    } else if (targetPage === 'index.php') {
        // To homepage from any page
        setTimeout(() => {
            header.classList.remove('visible');
            footer.classList.remove('visible');
            setTimeout(() => {
                sessionStorage.setItem('lastPage', currentPage);
                window.location.href = targetPage;
            }, 500);
        }, 100);
    } else {
        // Between subpages
        setTimeout(() => {
            sessionStorage.setItem('lastPage', currentPage);
            window.location.href = targetPage;
        }, 500);
    }
}
