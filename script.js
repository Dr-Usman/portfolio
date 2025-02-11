
document.addEventListener('DOMContentLoaded', () => {
    // Typing animation
    const titles = ['Flutter Developer', 'Software Engineer', 'Mobile App Architect', 'Cross-Platform Expert', 'UI/UX Specialist'];
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
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

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
    const slider = document.querySelector('.project-slider');
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentSlide = 0;

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    });

    // Initialize slider
    updateSlider();

    // Project image slider
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const images = card.querySelectorAll('.project-images img');
        const prevBtn = card.querySelector('.img-prev');
        const nextBtn = card.querySelector('.img-next');
        let currentImg = 0;

        function updateImages() {
            images.forEach(img => img.classList.remove('active'));
            images[currentImg].classList.add('active');
        }

        prevBtn.addEventListener('click', () => {
            currentImg = (currentImg - 1 + images.length) % images.length;
            updateImages();
        });

        nextBtn.addEventListener('click', () => {
            currentImg = (currentImg + 1) % images.length;
            updateImages();
        });

        // Initialize images
        updateImages();
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
});
