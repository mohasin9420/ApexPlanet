
// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 1000);
});

// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 100);

    // Scroll to top button visibility
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

// Scroll to top button click
document.querySelector('.scroll-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links and active nav highlighting
const navLinks = document.querySelectorAll('a[href^="#"]');

// Set active nav link based on scroll position
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.parentElement.classList.add('active');
        }
    });
});

// Smooth scrolling
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        // Add animation to clicked link
        this.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
            this.classList.remove('animate__animated', 'animate__pulse');
        }, 1000);

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Remove active class from all links
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });

        // Add active class to clicked link
        this.parentElement.classList.add('active');

        // Close mobile menu if open
        document.querySelector('nav').classList.remove('active');
    });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Initialize Typed.js
if (document.getElementById('typed-text')) {
    const typed = new Typed('#typed-text', {
        strings: [
            'I build web applications.',
            'I develop mobile apps.',
            'I work with databases.',
            'I solve problems.'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Initialize Particles.js
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#2563eb'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#2563eb',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('[name="name"]').value;
        const email = this.querySelector('[name="email"]').value;
        const message = this.querySelector('[name="message"]').value;

        // Show success message with animation
        const formContainer = this.parentElement;
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message animate__animated animate__fadeInUp';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Thank you, ${name}!</h3>
            <p>Your message has been received. I'll get back to you soon.</p>
            <button class="btn btn-glow close-message">Close</button>
        `;

        formContainer.appendChild(successMessage);
        this.style.display = 'none';

        // Close message and reset form
        successMessage.querySelector('.close-message').addEventListener('click', function() {
            successMessage.classList.remove('animate__fadeInUp');
            successMessage.classList.add('animate__fadeOutDown');

            setTimeout(() => {
                successMessage.remove();
                contactForm.style.display = 'block';
                contactForm.reset();
            }, 500);
        });
    });
}

// Add animation to skill bars on scroll
const skillSections = document.querySelectorAll('.skills-item');
const animateSkills = function() {
    skillSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionTop < screenPosition) {
            const skillBars = section.querySelectorAll('.skill-per');
            skillBars.forEach(bar => {
                const percent = bar.getAttribute('per');
                bar.style.maxWidth = percent;
            });
        }
    });
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);