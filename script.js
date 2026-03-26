/* ============================================
   NORDIX DEVELOPMENT - JAVASCRIPT
   Interactive Elements & Smooth Scrolling
   ============================================ */

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const targetOffset = target.offsetTop - 80; // Account for sticky navbar
            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// CTA BUTTON SMOOTH SCROLL
// ============================================

const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function () {
        const target = document.querySelector(this.getAttribute('data-scroll'));
        if (target) {
            const targetOffset = target.offsetTop - 80;
            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (name && email && message) {
            // Show success feedback
            showFormFeedback('success', 'Thank you! We will get back to you shortly.');
            
            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
            }, 500);
            
            // Log the data (In a real application, this would be sent to a server)
            console.log('Form submitted:', { name, email, message });
        } else {
            showFormFeedback('error', 'Please fill in all fields.');
        }
    });
}

/**
 * Display form feedback message
 * @param {string} type - 'success' or 'error'
 * @param {string} message - Message to display
 */
function showFormFeedback(type, message) {
    // Remove existing feedback if any
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `form-feedback form-feedback-${type}`;
    feedback.textContent = message;
    
    // Add dynamic styles for feedback
    const style = document.createElement('style');
    style.textContent = `
        .form-feedback {
            padding: 12px 15px;
            margin-bottom: 1.5rem;
            border-radius: 5px;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
        }
        
        .form-feedback-success {
            background-color: rgba(0, 255, 0, 0.15);
            border: 1px solid rgba(0, 255, 0, 0.5);
            color: #00FF00;
        }
        
        .form-feedback-error {
            background-color: rgba(255, 0, 0, 0.15);
            border: 1px solid rgba(255, 0, 0, 0.5);
            color: #ff6b6b;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    if (!document.querySelector('style[data-feedback="true"]')) {
        style.setAttribute('data-feedback', 'true');
        document.head.appendChild(style);
    }
    
    // Insert feedback above form
    const formGroup = contactForm.querySelector('.form-group');
    contactForm.insertBefore(feedback, formGroup);
    
    // Auto-remove feedback after 5 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => feedback.remove(), 300);
    }, 5000);
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

/**
 * Trigger animations when elements come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation for cards
const animateElements = document.querySelectorAll(
    '.service-card, .project-card, .section-title'
);

// Add animation cleanup
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

animateElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ============================================
// SCROLL EFFECT FOR NAVBAR
// ============================================

let lastScrollY = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    // Add glow effect to navbar on scroll
    if (lastScrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 0, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

/**
 * Add ripple effect to buttons on click
 */
function createRipple(event) {
    const button = event.currentTarget;
    
    // Check if ripple container already exists
    let ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }
    
    ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    // Auto-remove ripple
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple effect to all buttons
const addRippleStyle = document.createElement('style');
addRippleStyle.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 0, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(addRippleStyle);

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

/**
 * Navigate sections with arrow keys
 */
const sections = document.querySelectorAll('section');

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateToNextSection();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateToPreviousSection();
    }
});

function navigateToNextSection() {
    const currentSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight;
    });
    
    if (currentSection) {
        const nextSection = currentSection.nextElementSibling;
        if (nextSection && nextSection.tagName === 'SECTION') {
            const offset = nextSection.offsetTop - 80;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    }
}

function navigateToPreviousSection() {
    const currentSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight;
    });
    
    if (currentSection) {
        const prevSection = currentSection.previousElementSibling;
        if (prevSection && prevSection.tagName === 'SECTION') {
            const offset = prevSection.offsetTop - 80;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    }
}

// ============================================
// FORM INPUT VALIDATION
// ============================================

/**
 * Real-time email validation
 */
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#ff6b6b';
            this.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.2)';
        } else {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        }
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

/**
 * Lazy load images (for future use)
 */
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-lazy]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.lazy;
                img.removeAttribute('data-lazy');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// CONTACT CTA SMOOTH SCROLL
// ============================================

function scrollToContact() {
    window.location.href = 'index.html#contact';
}
