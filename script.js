document.addEventListener('DOMContentLoaded', () => {
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
    let slidesToShow = window.innerWidth <= 768 ? 1 : 2; // Show 1 in mobile, 2 in desktop
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


        // // Calculate the range of slides to show
        // const startIndex = currentSlide * slidesToShow;
        // const endIndex = Math.min(startIndex + slidesToShow, slides.length);

        // // Show only the slides in the current range
        // for (let i = startIndex; i < endIndex; i++) {
        //     slides[i].style.display = 'block';
        // }

        // // Adjust the slider transform for smooth sliding
        // const offset = -(currentSlide * (100 / slidesToShow));
        // slider.style.transform = `translateX(${offset}%)`;
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

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    } else {
        console.error("Slider buttons not found in the DOM.");
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
        updateSlider();
    });

    // Initialize slider and auto-scroll
    updateSlider();
    startAutoScroll();

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
