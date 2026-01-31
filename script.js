// =============================================
// DITA KIROLL - Landing Page JavaScript
// Korean Kimbab Street Food
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    // ============ Mobile Menu Toggle ============
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ============ Header Scroll Effect ============
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============ Smooth Scroll for Navigation ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============ Active Navigation on Scroll ============
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ============ Scroll Animations (Fade In) ============
    const fadeElements = document.querySelectorAll('.menu-card, .feature-card, .testimonial-card, .about-grid, .section-header');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ============ Parallax Effect for Floating Cards ============
    const floatingCards = document.querySelectorAll('.floating-card');

    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;

        floatingCards.forEach((card, index) => {
            const speed = 0.05 * (index + 1);
            card.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ============ Counter Animation ============
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const heroSection = document.getElementById('home');
        const heroRect = heroSection.getBoundingClientRect();

        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            countersAnimated = true;

            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (!isNaN(parseInt(text))) {
                    const target = parseInt(text);
                    let current = 0;
                    const increment = target / 50;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.ceil(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target + '+';
                        }
                    };

                    updateCounter();
                }
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ============ Image Loading Animation ============
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('load', function () {
            this.classList.add('loaded');
        });

        // If image is already cached
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // ============ CTA Button Pulse Animation ============
    const ctaButton = document.querySelector('.btn-whatsapp');

    if (ctaButton) {
        setInterval(() => {
            ctaButton.classList.add('pulse');
            setTimeout(() => {
                ctaButton.classList.remove('pulse');
            }, 1000);
        }, 3000);
    }

    console.log('🍙 Dita Kiroll - Website loaded successfully!');
});

// Add pulse animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-whatsapp.pulse {
        animation: pulse 1s ease;
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
        50% { box-shadow: 0 4px 40px rgba(37, 211, 102, 0.8); }
        100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
    }
    
    img {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
