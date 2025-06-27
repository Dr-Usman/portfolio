document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Particle animation for hero section
    createParticleAnimation();
    
    // Enhanced scroll animations
    initScrollAnimations();
    
    // Typing animation
    const titles = ['Senior Flutter Developer', 'Senior Software Engineer', 'Mobile App Architect', 'Cross-Platform Expert', 'UI/UX Specialist'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseEnd = 2000;

    function typeText() {
        const titleElement = document.querySelector('.typing-text');
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            titleElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            titleElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            setTimeout(() => isDeleting = true, pauseEnd);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }

        setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
    }
    typeText();

    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Project slider
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentSlide = 0;
    let slidesToShow = window.innerWidth <= 768 ? 1 : 2;
    let autoScrollInterval;

    function updateSlidesToShow() {
        slidesToShow = window.innerWidth <= 768 ? 1 : 2;
    }

    function updateSlider() {
        // Hide all slides initially
        slides.forEach(slide => slide.style.display = 'none');

        // Ensure `currentSlide` is within bounds
        currentSlide = Math.max(0, Math.min(currentSlide, slides.length - slidesToShow));

        for (let i = currentSlide; i < currentSlide + slidesToShow && i < slides.length; i++) {
            slides[i].style.display = 'block';
        }
    }

    function nextSlide() {
        updateSlidesToShow();
        if (currentSlide + slidesToShow < slides.length) {
            currentSlide = currentSlide + slidesToShow;
        } else {
            currentSlide = 0; // Loop back to the start
        }
        updateSlider();
        resetAutoScroll();
    }

    function prevSlide() {
        updateSlidesToShow();
        if (currentSlide - slidesToShow >= 0) {
            currentSlide = currentSlide - slidesToShow;
        } else {
            currentSlide = slides.length - slidesToShow; // Loop back to the end
        }
        updateSlider();
        resetAutoScroll();
    }

    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Initialize slider and auto-scroll
        updateSlider();
        startAutoScroll();
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    // Update slidesToShow on window resize
    window.addEventListener('resize', () => {
        updateSlidesToShow();
        if (slides.length > 0) {
            updateSlider();
        }
    });

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    revealElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.05)';
            header.style.backdropFilter = 'blur(30px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            header.style.backdropFilter = 'blur(20px)';
        }
    });
});

// Particle animation function
function createParticleAnimation() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
        pointer-events: none;
    `;
    
    hero.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 20;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.4 + 0.8});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: 100%;
        animation: floatUp ${duration}s linear ${delay}s infinite;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
    `;
    
    container.appendChild(particle);
}

// Enhanced scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.tech-icons div, .project-card, .service-card, .timeline-item');
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.9)';
        element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        animateOnScroll.observe(element);
    });
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .tech-icons div {
        animation: pulse 4s ease-in-out infinite;
    }
    
    .tech-icons div:nth-child(even) {
        animation-delay: 1s;
    }
    
    .tech-icons div:nth-child(3n) {
        animation-delay: 2s;
    }
`;
document.head.appendChild(style);