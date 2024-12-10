class Snake {
    constructor(x, y) {
        this.segmentSize = 20; // Increased size
        this.segmentSpacing = 5;
        this.speed = 2;

        // Initialize with 7 segments
        this.segments = [];
        for (let i = 0; i < 7; i++) {
            this.segments.push({x: x - i * (this.segmentSize + this.segmentSpacing), y});
        }

        this.targetPos = null;
        this.path = [];
    }

    update() {
        if (this.path.length > 0) {
            const nextPoint = this.path[0];
            const head = this.segments[0];

            const dx = nextPoint.x - head.x;
            const dy = nextPoint.y - head.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.speed) {
                head.x = nextPoint.x;
                head.y = nextPoint.y;
                this.path.shift();

                if (this.path.length === 0) {
                    this.targetPos = null;
                }
            } else {
                head.x += (dx / distance) * this.speed;
                head.y += (dy / distance) * this.speed;
            }

            // Update body segments
            for (let i = this.segments.length - 1; i > 0; i--) {
                const current = this.segments[i];
                const previous = this.segments[i - 1];
                const dx = previous.x - current.x;
                const dy = previous.y - current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > this.segmentSize + this.segmentSpacing) {
                    const ratio = (this.segmentSize + this.segmentSpacing) / distance;
                    current.x += dx * ratio;
                    current.y += dy * ratio;
                }
            }
        }
    }

    setTarget(x, y) {
        if (!this.targetPos || (this.targetPos.x !== x || this.targetPos.y !== y)) {
            this.targetPos = {x, y};
            this.calculatePath();
        }
    }

    calculatePath() {
        const head = this.segments[0];
        const target = this.targetPos;

        this.path = [
            {x: target.x, y: head.y},
            {x: target.x, y: target.y}
        ];
    }

    grow() {
        const lastSegment = this.segments[this.segments.length - 1];
        const newSegment = {...lastSegment};
        this.segments.push(newSegment);
    }

    hasReachedTarget() {
        return !this.targetPos && this.path.length === 0;
    }
}

class Food {
    constructor() {
        this.position = {x: 0, y: 0};
        this.size = 10; // Decreased size
        this.spawn();
    }

    spawn() {
        const contentAreas = document.querySelectorAll('header, .content-container, footer');
        let attempts = 0;
        const maxAttempts = 100;

        while (attempts < maxAttempts) {
            this.position.x = Math.random() * (window.innerWidth - 100) + 50;
            this.position.y = Math.random() * (window.innerHeight - 100) + 50;

            let validPosition = true;
            for (let area of contentAreas) {
                const rect = area.getBoundingClientRect();
                if (this.position.x >= rect.left &&
                    this.position.x <= rect.right &&
                    this.position.y >= rect.top &&
                    this.position.y <= rect.bottom) {
                    validPosition = false;
                    break;
                }
            }

            if (validPosition) return;
            attempts++;
        }

        this.position = {
            x: Math.random() < 0.5 ? 50 : window.innerWidth - 50,
            y: Math.random() < 0.5 ? 50 : window.innerHeight - 50
        };
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('snakeCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        this.snake = new Snake(100, 100);
        this.food = new Food();

        this.snake.setTarget(this.food.position.x, this.food.position.y);

        this.update = this.update.bind(this);
        requestAnimationFrame(this.update);

        window.addEventListener('resize', () => {
            this.resize();
            this.food.spawn();
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.snake.update();

        const head = this.snake.segments[0];
        const dx = head.x - this.food.position.x;
        const dy = head.y - this.food.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (this.snake.segmentSize + this.food.size) / 2) {
            this.snake.grow();
            this.food.spawn();
            this.snake.setTarget(this.food.position.x, this.food.position.y);
        } else if (this.snake.hasReachedTarget()) {
            this.snake.setTarget(this.food.position.x, this.food.position.y);
        }

        this.draw();
        requestAnimationFrame(this.update);
    }

    draw() {
        // Draw snake
        this.ctx.fillStyle = '#0ff';
        this.snake.segments.forEach((segment, index) => {
            const alpha = 1 - (index / this.snake.segments.length) * 0.5;
            this.ctx.globalAlpha = alpha;
            this.ctx.beginPath();
            this.ctx.arc(segment.x, segment.y, this.snake.segmentSize / 2, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw food
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = '#f0f';
        this.ctx.beginPath();
        this.ctx.arc(this.food.position.x, this.food.position.y, this.food.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Game();
});