// Supabase configuration
const SUPABASE_URL = 'https://xyzcompany.supabase.co';
const SUPABASE_KEY = 'public-anon-key';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginError = document.getElementById('login-error');
const signupError = document.getElementById('signup-error');
const verifyContainer = document.getElementById('verify-container');
const verifyEmail = document.getElementById('verify-email');
const verifyClose = document.getElementById('verify-close');
const verifyResend = document.getElementById('verify-resend');
const forgotPassword = document.getElementById('forgot-password');
const rememberMe = document.getElementById('remember-me');
const notificationContainer = document.getElementById('notification-container');
const authOptions = document.querySelectorAll('.auth-option');

// Initialize particles
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializePasswordToggles();
    checkRememberedUser();
});

// Initialize particles
function initializeParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 5 + 2;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
    });
}

// Initialize password toggle buttons
function initializePasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordInput.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
}

// Check for remembered user
function checkRememberedUser() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    
    if (rememberedEmail) {
        document.getElementById('login-email').value = rememberedEmail;
    }
}

// Auth switcher functionality
authOptions.forEach(option => {
    option.addEventListener('click', function() {
        const formToShow = this.getAttribute('data-form');
        
        // Update active state
        authOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        
        // Show/hide forms
        if (formToShow === 'login-form') {
            loginForm.style.display = 'flex';
            signupForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'flex';
        }
        
        // Clear error messages
        loginError.textContent = '';
        signupError.textContent = '';
    });
});

// Login form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Logging in...';
        submitButton.disabled = true;
        
        // Attempt login
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        if (error) {
            loginError.textContent = error.message;
            showNotification('Error', error.message, 'error');
        } else {
            // Check if remember me is checked
            if (rememberMe.classList.contains('active')) {
                localStorage.setItem('rememberedEmail', email);
            }
            
            // Redirect to dashboard
            showNotification('Success', 'Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }
    } catch (error) {
        loginError.textContent = 'An unexpected error occurred. Please try again.';
        showNotification('Error', 'An unexpected error occurred', 'error');
    }
});

// Signup form submission
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    try {
        // Validate hCaptcha
        const hCaptchaResponse = hcaptcha.getResponse();
        
        if (!hCaptchaResponse && !isLocalhost()) {
            signupError.textContent = 'Please complete the captcha verification';
            showNotification('Error', 'Please complete the captcha verification', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Signing up...';
        submitButton.disabled = true;
        
        // Attempt signup
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name
                }
            }
        });
        
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Reset hCaptcha
        if (hcaptcha && typeof hcaptcha.reset === 'function') {
            hcaptcha.reset();
        }
        
        if (error) {
            signupError.textContent = error.message;
            showNotification('Error', error.message, 'error');
        } else {
            // Show verification message
            showVerifyEmailModal(email);
            showNotification('Success', 'Signup successful! Please verify your email.', 'success');
        }
    } catch (error) {
        signupError.textContent = 'An unexpected error occurred. Please try again.';
        showNotification('Error', 'An unexpected error occurred', 'error');
    }
});

// Forgot password functionality
forgotPassword.addEventListener('click', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    
    if (!email) {
        loginError.textContent = 'Please enter your email address';
        showNotification('Error', 'Please enter your email address', 'error');
        return;
    }
    
    try {
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/reset-password.html',
        });
        
        if (error) {
            loginError.textContent = error.message;
            showNotification('Error', error.message, 'error');
        } else {
            loginError.textContent = '';
            showNotification('Success', 'Password reset email sent. Please check your inbox.', 'success');
        }
    } catch (error) {
        loginError.textContent = 'An unexpected error occurred. Please try again.';
        showNotification('Error', 'An unexpected error occurred', 'error');
    }
});

// Remember me functionality
rememberMe.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.toggle('active');
    
    if (this.classList.contains('active')) {
        showNotification('Info', 'Your email will be remembered for next time', 'info');
    } else {
        localStorage.removeItem('rememberedEmail');
        showNotification('Info', 'Your email will not be remembered', 'info');
    }
});

// Verify email modal
function showVerifyEmailModal(email) {
    verifyEmail.textContent = email;
    verifyContainer.style.display = 'flex';
    
    // Add animation
    verifyContainer.style.opacity = '0';
    setTimeout(() => {
        verifyContainer.style.opacity = '1';
    }, 10);
}

// Close verify modal
verifyClose.addEventListener('click', function() {
    verifyContainer.style.opacity = '0';
    setTimeout(() => {
        verifyContainer.style.display = 'none';
    }, 300);
});

// Resend verification email
verifyResend.addEventListener('click', async function() {
    const email = verifyEmail.textContent;
    
    try {
        const { error } = await supabaseClient.auth.resend({
            type: 'signup',
            email: email
        });
        
        if (error) {
            showNotification('Error', error.message, 'error');
        } else {
            showNotification('Success', 'Verification email resent. Please check your inbox.', 'success');
        }
    } catch (error) {
        showNotification('Error', 'An unexpected error occurred', 'error');
    }
});

// Show notification
function showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${getIconForType(type)}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Add event listener for close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Get icon for notification type
function getIconForType(type) {
    switch (type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        case 'info':
        default:
            return 'fa-info-circle';
    }
}

// Check if running on localhost
function isLocalhost() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname === '';
}

// Add neon effect to cursor
document.addEventListener('mousemove', function(e) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});
