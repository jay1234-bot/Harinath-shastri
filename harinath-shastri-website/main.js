// Astrology Website Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Cursor trail effect
    const body = document.querySelector('body');
    let trailTimeout;
    
    body.addEventListener('mousemove', function(e) {
        // Create a new trail element
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        
        // Random color for variety
        const colors = [
            'rgba(255, 0, 255, 0.5)', // Magenta
            'rgba(0, 255, 0, 0.5)',   // Green
            'rgba(255, 153, 0, 0.5)', // Orange
            'rgba(0, 255, 255, 0.5)'  // Blue
        ];
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        trail.style.background = randomColor;
        
        // Add shadow based on color
        if (randomColor === 'rgba(255, 0, 255, 0.5)') {
            trail.style.boxShadow = '0 0 10px rgba(255, 0, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.4)';
        } else if (randomColor === 'rgba(0, 255, 0, 0.5)') {
            trail.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.4)';
        } else if (randomColor === 'rgba(255, 153, 0, 0.5)') {
            trail.style.boxShadow = '0 0 10px rgba(255, 153, 0, 0.8), 0 0 20px rgba(255, 153, 0, 0.4)';
        } else {
            trail.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.4)';
        }
        
        // Add to DOM
        document.body.appendChild(trail);
        
        // Remove after animation completes
        setTimeout(() => {
            if (document.body.contains(trail)) {
                document.body.removeChild(trail);
            }
        }, 1000);
        
        // Throttle trail creation for performance
        clearTimeout(trailTimeout);
        trailTimeout = setTimeout(() => {}, 10);
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                // Get animation class
                const animationClass = element.classList.contains('animate__fadeIn') ? 'animate__fadeIn' : 
                                      element.classList.contains('animate__fadeInUp') ? 'animate__fadeInUp' :
                                      element.classList.contains('animate__fadeInLeft') ? 'animate__fadeInLeft' :
                                      element.classList.contains('animate__fadeInRight') ? 'animate__fadeInRight' : '';
                
                // Apply animation with delay if specified
                if (animationClass) {
                    element.style.opacity = '1';
                    element.style.visibility = 'visible';
                    
                    const delay = element.getAttribute('data-delay');
                    if (delay) {
                        element.style.animationDelay = delay;
                    }
                    
                    element.classList.add(animationClass);
                }
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
    
    // Fix for cookie consent popup
    const privacyNotification = document.getElementById('privacyNotification');
    const acceptPrivacyBtn = document.getElementById('acceptPrivacy');
    
    // Check if user has already accepted privacy policy
    if (localStorage.getItem('privacyAccepted') !== 'true') {
        if (privacyNotification) {
            privacyNotification.style.display = 'flex';
        }
    }
    
    // Add event listener to accept button
    if (acceptPrivacyBtn) {
        acceptPrivacyBtn.addEventListener('click', function() {
            localStorage.setItem('privacyAccepted', 'true');
            if (privacyNotification) {
                privacyNotification.style.opacity = '0';
                setTimeout(() => {
                    privacyNotification.style.display = 'none';
                }, 500);
            }
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navLinks = document.querySelector('.nav-links');
                
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    if (navLinks) navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Add neon glow to section headers on scroll
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    
    const glowOnScroll = function() {
        sectionHeaders.forEach(header => {
            const headerPosition = header.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (headerPosition < screenPosition) {
                header.classList.add('neon-glow');
            }
        });
    };
    
    window.addEventListener('scroll', glowOnScroll);
    glowOnScroll(); // Run once on page load
    
    // Testimonial slider functionality
    let currentSlide = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const navDots = document.querySelectorAll('.nav-dot');
    
    if (testimonialCards.length > 0 && navDots.length > 0) {
        // Show initial slide
        showSlide(currentSlide);
        
        // Set up navigation dots
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-advance slides every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        }, 5000);
        
        function showSlide(index) {
            // Hide all slides
            testimonialCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateX(50px)';
                card.style.zIndex = '-1';
            });
            
            // Show current slide
            testimonialCards[index].style.opacity = '1';
            testimonialCards[index].style.transform = 'translateX(0)';
            testimonialCards[index].style.zIndex = '1';
            
            // Update nav dots
            navDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
    
    // Floating animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Random floating animation
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        card.style.animationDelay = `${randomDelay}s`;
        card.style.animationDuration = `${randomDuration}s`;
        card.classList.add('floating');
    });
    
    // Contact form redirect button with authentication check
    const contactRedirectBtn = document.getElementById('contactRedirectBtn');
    if (contactRedirectBtn) {
        contactRedirectBtn.addEventListener('click', async function() {
            try {
                // Check if user is authenticated before proceeding
                const { data, error } = await supabaseClient.auth.getSession();
                
                if (error || !data.session) {
                    // User is not logged in, show neon notification and redirect to login
                    showNeonNotification('Please sign up or login to access the consultation form', 'info');
                    
                    // Redirect to login page after a short delay
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                    return;
                }
                
                // User is logged in, redirect to Tally form in a new tab
                window.open('https://tally.so/r/npzR7q', '_blank');
            } catch (error) {
                console.error('Authentication check error:', error);
                showNeonNotification('An error occurred. Please try again.', 'error');
            }
        });
    }

    // Show neon notification function
    function showNeonNotification(message, type = 'info') {
        // Remove any existing notification
        const existingNotification = document.querySelector('.neon-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `neon-notification ${type}`;
        
        // Create content
        const content = document.createElement('div');
        content.className = 'notification-content';
        content.textContent = message;
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Assemble notification
        notification.appendChild(content);
        notification.appendChild(closeBtn);
        
        // Add to document
        document.body.appendChild(notification);
        
        // Add animation class
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
});

// Add floating animation
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes floating {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    
    .floating {
        animation: floating 3s ease-in-out infinite;
    }
    
    .navbar-scrolled {
        background: rgba(0, 0, 0, 0.9) !important;
        box-shadow: 0 5px 20px rgba(255, 0, 255, 0.3) !important;
    }
    
    .neon-glow {
        animation: neon-pulse 1.5s ease-in-out infinite alternate;
    }
    
    @keyframes neon-pulse {
        from {
            text-shadow: 0 0 5px rgba(255, 0, 255, 0.5), 0 0 10px rgba(255, 0, 255, 0.3);
        }
        to {
            text-shadow: 0 0 10px rgba(255, 0, 255, 0.8), 0 0 20px rgba(255, 0, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.3);
        }
    }
    
    .neon-notification {
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        color: #000;
        font-size: 14px;
        font-weight: bold;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    
    .neon-notification.show {
        opacity: 1;
    }
    
    .neon-notification.fade-out {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    
    .neon-notification.info {
        background-color: #dff0d8;
        border: 1px solid #d6e9c6;
        color: #3c763d;
    }
    
    .neon-notification.error {
        background-color: #f2dede;
        border: 1px solid #ebccd1;
        color: #a94442;
    }
    
    .notification-content {
        margin-bottom: 10px;
    }
    
    .notification-close {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 18px;
        cursor: pointer;
    }
</style>
`);
