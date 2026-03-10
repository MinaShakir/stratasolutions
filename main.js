document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ===================================
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
        });
    }

    // ===================================
    // 2. SMOOTH SCROLLING AND ACTIVE LINK
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('.nav-links li a');

    // Function to handle scroll-based active link highlighting
    const setActiveLinkOnScroll = () => {
        let current = '';
        const headerHeight = document.querySelector('.site-header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20; // Adjust for header height
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            // Use includes to handle the service link pointing to primary-services
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    };

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Check if the link points to a service page (e.g., services-page.html)
            if (targetId.includes('.html')) {
                // Let the browser handle external navigation
                window.location.href = targetId; 
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const offset = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ===================================
    // 3. FADE-IN ON SCROLL EFFECT
    // (Addresses the "effect when it was scroll down" request)
    // ===================================
    const faders = document.querySelectorAll('.fade-in-on-scroll');

    const appearOptions = {
        threshold: 0.3, // Element must be 30% visible to trigger
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // Add scroll event listener for active link highlighting
    window.addEventListener('scroll', setActiveLinkOnScroll);
    setActiveLinkOnScroll(); // Run once on load

    // ===================================
    // 4. COOKIE CONSENT
    // ===================================
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookiesBtn = document.getElementById('acceptCookies');

    // Check if cookie consent has been given
    if (!localStorage.getItem('cookieConsentGiven')) {
        cookieConsent.style.display = 'flex';
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsentGiven', 'true');
            cookieConsent.style.display = 'none';
        });
    }
});
