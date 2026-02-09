const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuration
let config = {
    particleCount: 50,
    particleSize: 3,
    maxSpeed: 2,
    connectionDistance: 150
};

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.maxSpeed;
        this.vy = (Math.random() - 0.5) * config.maxSpeed;
        this.radius = config.particleSize;
        this.mass = this.radius;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = [
            '#00d4ff',
            '#667eea',
            '#764ba2',
            '#f093fb',
            '#4facfe',
            '#00f2fe',
            '#43e97b',
            '#38f9d7'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx = -this.vx;
            this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.vy = -this.vy;
            this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Particle system
let particles = [];

function initParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle());
    }
}

// Collision detection and response
function detectCollisions() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Check for collision
            if (distance < p1.radius + p2.radius) {
                // Resolve collision using elastic collision physics
                const angle = Math.atan2(dy, dx);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);

                // Rotate particle positions
                const pos1 = { x: 0, y: 0 };
                const pos2 = rotate(dx, dy, sin, cos, true);

                // Rotate velocities
                const vel1 = rotate(p1.vx, p1.vy, sin, cos, true);
                const vel2 = rotate(p2.vx, p2.vy, sin, cos, true);

                // Collision reaction
                const vxTotal = vel1.x - vel2.x;
                vel1.x = ((p1.mass - p2.mass) * vel1.x + 2 * p2.mass * vel2.x) / (p1.mass + p2.mass);
                vel2.x = vxTotal + vel1.x;

                // Update positions to avoid overlap
                const absV = Math.abs(vel1.x) + Math.abs(vel2.x);
                const overlap = (p1.radius + p2.radius) - Math.abs(pos2.x);
                pos1.x += vel1.x / absV * overlap;
                pos2.x += vel2.x / absV * overlap;

                // Rotate positions back
                const pos1F = rotate(pos1.x, pos1.y, sin, cos, false);
                const pos2F = rotate(pos2.x, pos2.y, sin, cos, false);

                p2.x = p1.x + pos2F.x;
                p2.y = p1.y + pos2F.y;
                p1.x = p1.x + pos1F.x;
                p1.y = p1.y + pos1F.y;

                // Rotate velocities back
                const vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
                const vel2F = rotate(vel2.x, vel2.y, sin, cos, false);

                p1.vx = vel1F.x;
                p1.vy = vel1F.y;
                p2.vx = vel2F.x;
                p2.vy = vel2F.y;
            }
        }
    }
}

function rotate(x, y, sin, cos, reverse) {
    return {
        x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
        y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
}

// Draw connections between nearby particles
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < config.connectionDistance) {
                const opacity = (1 - distance / config.connectionDistance) * 0.5;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawConnections();
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    detectCollisions();

    requestAnimationFrame(animate);
}

// Mouse interaction
let mouse = {
    x: undefined,
    y: undefined,
    radius: 100
};

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;

    // Push particles away from mouse
    particles.forEach(particle => {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            particle.vx += Math.cos(angle) * force * 0.5;
            particle.vy += Math.sin(angle) * force * 0.5;
        }
    });
});

canvas.addEventListener('click', (e) => {
    // Add new particle at click position
    particles.push(new Particle(e.x, e.y));
    if (particles.length > config.particleCount) {
        particles.shift();
    }
});

// Window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Controls
const particleCountSlider = document.getElementById('particleCount');
const particleCountValue = document.getElementById('particleCountValue');
const particleSizeSlider = document.getElementById('particleSize');
const particleSizeValue = document.getElementById('particleSizeValue');
const resetBtn = document.getElementById('resetBtn');

particleCountSlider.addEventListener('input', (e) => {
    config.particleCount = parseInt(e.target.value);
    particleCountValue.textContent = config.particleCount;
    initParticles();
});

particleSizeSlider.addEventListener('input', (e) => {
    config.particleSize = parseInt(e.target.value);
    particleSizeValue.textContent = config.particleSize;
    particles.forEach(particle => {
        particle.radius = config.particleSize;
        particle.mass = particle.radius;
    });
});

resetBtn.addEventListener('click', () => {
    initParticles();
});

// Initialize and start
initParticles();
animate();
