/* ========================================
   PORTFOLIO WEBSITE - INTERACTIVE JAVASCRIPT
   This file handles all interactivity, animations,
   and dynamic behavior for the portfolio website
   ======================================== */

// ========================================
// 1. MOBILE MENU TOGGLE
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu when hamburger is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// 2. SCROLL TO TOP BUTTON
// ========================================
const scrollTop = document.getElementById('scrollTop');

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

// Smooth scroll to top
scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// 3. SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// 4. SCROLL ANIMATIONS - REVEAL ELEMENTS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .cert-item, .info-item'
).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ========================================
// 5. CONTACT FORM HANDLING
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(this);
    const name = this.children[0].children[0].value;
    const email = this.children[1].children[0].value;
    const message = this.children[2].children[0].value;
    
    // Simple validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }
    
    // Simulate form submission
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        showNotification('Message sent successfully! ✓', 'success');
        contactForm.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
});

// ========================================
// 6. NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#00d4ff' : type === 'error' ? '#e94560' : '#0f3460'};
        color: ${type === 'success' || type === 'error' ? '#ffffff' : '#e8e8e8'};
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        animation: slideInRight 0.5s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ========================================
// 7. ANIMATED COUNTER
// ========================================
function animateCounter(element, target, duration = 1000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// 8. STATS COUNTER ANIMATION ON SCROLL
// ========================================
let statsAnimated = false;

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            const statElements = document.querySelectorAll('.stat h3');
            statElements.forEach(element => {
                const targetText = element.textContent;
                const target = parseInt(targetText.match(/\d+/)[0]);
                animateCounter(element, target, 1000);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========================================
// 9. PARALLAX SCROLL EFFECT
// ========================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPosition = `0% ${scrollPosition * 0.5}px`;
    }
});

// ========================================
// 10. ACTIVE NAV LINK HIGHLIGHTING
// ========================================
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 11. TYPING ANIMATION FOR HERO TEXT
// ========================================
function typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Animate hero title on page load
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        typeWriter(nameElement, originalText, 50);
    }
});

// ========================================
// 12. SKILL ITEMS - HOVER ANIMATION
// ========================================
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ========================================
// 13. PROJECT CARDS - FLIP ANIMATION
// ========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) translateZ(0)';
        this.style.boxShadow = '0 30px 60px rgba(0, 212, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) translateZ(0)';
        this.style.boxShadow = '0 20px 50px rgba(0, 212, 255, 0.2)';
    });
});

// ========================================
// 14. PAGE LOAD ANIMATION
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Add a subtle entrance animation
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animation = `slideInUp 0.8s ease ${index * 0.1}s backwards`;
    });
});

// ========================================
// 15. MOUSE FOLLOW GLOW EFFECT (Optional)
// ========================================
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Create subtle glow effect on hero section
    const hero = document.querySelector('.hero');
    if (hero && window.innerHeight > 800) {
        // This can be extended for more visual effects
    }
});

// ========================================
// 16. KEYBOARD SHORTCUTS
// ========================================
document.addEventListener('keydown', (e) => {
    // Press 'H' to scroll to hero
    if (e.key.toLowerCase() === 'h') {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' to scroll to contact
    if (e.key.toLowerCase() === 'c') {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ========================================
// 17. CONSOLE EASTER EGG
// ========================================
console.log('%c🎨 Welcome to Samved\'s Portfolio!', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%cDeveloped with HTML, CSS & JavaScript', 'font-size: 14px; color: #e94560;');
console.log('%cFeel free to explore the code and connect! 🚀', 'font-size: 12px; color: #e8e8e8;');

// ========================================
// 18. ACCESSIBILITY - SKIP TO MAIN CONTENT
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #00d4ff;
        color: #0f3460;
        padding: 8px;
        z-index: 100;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.prepend(skipLink);
});

// ========================================
// 19. PERFORMANCE OPTIMIZATION - LAZY LOADING
// ========================================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// 20. THEME TOGGLE (Optional - for future enhancement)
// ========================================
// Uncomment to enable dark/light theme toggle
/*
function toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
*/

// ========================================
// Summary of Features Implemented:
// ✓ Mobile menu toggle with hamburger
// ✓ Scroll-to-top button
// ✓ Smooth anchor link scrolling
// ✓ Intersection Observer for scroll animations
// ✓ Contact form validation and submission
// ✓ Notification system for user feedback
// ✓ Animated counters for statistics
// ✓ Parallax scroll effect
// ✓ Active navigation link highlighting
// ✓ Typing animation for hero text
// ✓ Interactive skill items
// ✓ Project card hover animations
// ✓ Page load animations
// ✓ Mouse tracking (optional)
// ✓ Keyboard shortcuts (H = Home, C = Contact)
// ✓ Console easter egg
// ✓ Accessibility features
// ✓ Lazy loading for images
// ========================================
