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
