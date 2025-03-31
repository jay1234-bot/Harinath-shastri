// Consultation Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Stars animation
    initStars();
    
    // Cursor trail effect
    initCursorTrail();
});

// Initialize stars animation
function initStars() {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Star properties
    const stars = [];
    const starCount = 200;
    const starSizeMin = 0.5;
    const starSizeMax = 2;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: starSizeMin + Math.random() * (starSizeMax - starSizeMin),
            speed: 0.05 + Math.random() * 0.1,
            brightness: 0.5 + Math.random() * 0.5,
            color: getRandomStarColor()
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw stars
        stars.forEach(star => {
            // Update star position
            star.y += star.speed;
            
            // Reset star position if it goes off screen
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
            
            // Draw star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.brightness;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Get random star color
    function getRandomStarColor() {
        const colors = [
            '#ffffff', // White
            '#ffffcc', // Pale yellow
            '#ffccff', // Pale pink
            '#ccffff', // Pale blue
            '#ff00ff', // Magenta
            '#00ff00', // Green
            '#00ffff'  // Cyan
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Initialize cursor trail effect
function initCursorTrail() {
    const body = document.querySelector('body');
    let trailTimeout;
    
    body.addEventListener('mousemove', function(e) {
        // Create a new trail element
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        
        // Add styles to the trail element
        trail.style.position = 'absolute';
        trail.style.width = '10px';
        trail.style.height = '10px';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.transform = 'translate(-50%, -50%)';
        trail.style.animation = 'cursor-fade 1s forwards';
        
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
    
    // Add cursor fade animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes cursor-fade {
            0% {
                opacity: 0.8;
                width: 5px;
                height: 5px;
            }
            100% {
                opacity: 0;
                width: 25px;
                height: 25px;
            }
        }
    `;
    document.head.appendChild(style);
}
