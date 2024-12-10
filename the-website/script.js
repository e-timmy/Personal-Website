/ Snake Game Class
class SnakeGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.snake = [{x: 0, y: 0}];
        this.food = {x: 0, y: 0};
        this.direction = 'right';
        this.gridSize = 20;
        this.speed = 5; // Moves per second

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.spawnFood();
        this.startGameLoop();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    spawnFood() {
        const maxX = Math.floor(this.canvas.width / this.gridSize);
        const maxY = Math.floor(this.canvas.height / this.gridSize);

        do {
            this.food.x = Math.floor(Math.random() * maxX) * this.gridSize;
            this.food.y = Math.floor(Math.random() * maxY) * this.gridSize;
        } while (this.isOverContent(this.food.x, this.food.y));
    }

    isOverContent(x, y) {
        const elements = document.querySelectorAll('header, .page-content, footer');
        for (let el of elements) {
            const rect = el.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                return true;
            }
        }
        return false;
    }

    move() {
        const head = {...this.snake[0]};

        // Simple pathfinding
        if (head.y !== this.food.y) {
            head.y += (this.food.y > head.y) ? this.gridSize : -this.gridSize;
        } else if (head.x !== this.food.x) {
            head.x += (this.food.x > head.x) ? this.gridSize : -this.gridSize;
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.spawnFood();
        } else {
            this.snake.pop();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
        for (let part of this.snake) {
            this.ctx.fillRect(part.x, part.y, this.gridSize, this.gridSize);
        }

        // Draw food
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        this.ctx.fillRect(this.food.x, this.food.y, this.gridSize, this.gridSize);
    }

    startGameLoop() {
        setInterval(() => {
            this.move();
            this.draw();
        }, 1000 / this.speed);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'snake-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.insertBefore(canvas, document.body.firstChild);

    // Initialize snake game
    new SnakeGame(canvas);

    // Original script.js content

    initializeTypingEffects();

    function initializeTypingEffects() {
        // Get all text nodes in the active page content
        const activeContent = document.querySelector('.page-content.active');
        if (!activeContent) return;

        // Hide all content initially
        const elements = activeContent.querySelectorAll('h1, h2, h3, p, li, a');
        elements.forEach(el => {
            if (!el.classList.contains('typing-animation')) {
                el.classList.add('typing-animation');
                // Store original text
                el.setAttribute('data-text', el.textContent);
                // Clear text content
                el.textContent = '';
                // Add cursor element
                const cursor = document.createElement('span');
                cursor.classList.add('typing-cursor');
                el.appendChild(cursor);
            }
        });

        // Start typing sequence
        typeSequentially(Array.from(elements), 0);
    }

    function typeSequentially(elements, elementIndex) {
        if (elementIndex >= elements.length) return;

        const element = elements[elementIndex];
        const text = element.getAttribute('data-text');
        element.classList.add('visible');

        typeWriter(element, text, 0, () => {
            // Mark element as complete and remove cursor
            element.classList.add('typing-complete');
            // Move to next element
            setTimeout(() => typeSequentially(elements, elementIndex + 1), 100);
        });
    }

    function typeWriter(element, text, index, callback) {
        if (index === 0) {
            element.textContent = '';
            const cursor = document.createElement('span');
            cursor.classList.add('typing-cursor');
            element.appendChild(cursor);
        }

        if (index < text.length) {
            const cursor = element.querySelector('.typing-cursor');
            const textNode = document.createTextNode(text.charAt(index));
            element.insertBefore(textNode, cursor);
            setTimeout(() => typeWriter(element, text, index + 1, callback), 25);
        } else if (callback) {
            callback();
        }
    }

    // Glitch effect for navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', function(e) {
            const text = this.textContent;
            const glitchText = createGlitchText(text);
            this.setAttribute('data-original', text);
            this.textContent = glitchText;

            setTimeout(() => {
                this.textContent = this.getAttribute('data-original');
            }, 150);
        });
    });

    // Random glitch effect for text
    function createGlitchText(text) {
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let result = '';
        for (let i = 0; i < text.length; i++) {
            if (Math.random() < 0.3) {
                result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                result += text[i];
            }
        }
        return result;
    }

    // Page transition effects
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.addEventListener('transitionend', function(e) {
            if (e.propertyName === 'opacity' && this.classList.contains('active')) {
                const headers = this.querySelectorAll('h1, h2');
                headers.forEach(header => {
                    const text = header.textContent;
                    header.textContent = '';
                    typeWriter(header, text, 0);
                });
            }
        });
    });

    // Initialize custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect for articles
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        article.addEventListener('mouseenter', function() {
            this.style.borderColor = '#0ff';
            this.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
        });

        article.addEventListener('mouseleave', function() {
            this.style.borderColor = '#0ff';
            this.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
        });
    });
});