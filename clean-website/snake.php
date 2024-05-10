<!-- snake.php -->

<div id="snake">
    <div class="snake-body"></div>
    <div class="snake-body"></div>
    <div class="snake-body"></div>
    <div class="snake-body"></div>
    <div class="snake-body"></div>
</div>

<style>
    #snake {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }

    .snake-body {
        width: 20px;
        height: 20px;
        background-color: #b4dab4;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.8;
        border-radius: 50%;
    }

    .food {
        background-color: #ffb4b4;
        opacity: 0.8;
        z-index: -1;
    }
</style>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var snake = document.getElementById('snake');
        var snakeBodies = document.querySelectorAll('.snake-body');
        var snakeLength = snakeBodies.length;
        var borderWidth = 20; // Adjust this value to match the snake's width/height
        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;
        var currentDirection = 'right';
        var currentPosition = { x: 0, y: 0 };
        var food = null;
        var gameInterval = null;
        var snakeToggle = document.getElementById('snakeToggle');
        var isSnakeVisible = true;

        function createFood() {
            food = document.createElement('div');
            food.className = 'food';
            food.style.width = borderWidth + 'px';
            food.style.height = borderWidth + 'px';
            food.style.position = 'absolute';
            food.style.borderRadius = '50%';
            placeFoodRandomly();
            document.body.appendChild(food);
        }

        function placeFoodRandomly() {
            var maxX = screenWidth - borderWidth;
            var maxY = screenHeight - borderWidth;
            var randomX = Math.floor(Math.random() * (maxX / borderWidth)) * borderWidth;
            var randomY = Math.floor(Math.random() * (maxY / borderWidth)) * borderWidth;
            food.style.left = randomX + 'px';
            food.style.top = randomY + 'px';
        }

        function growSnake() {
            var newBody = document.createElement('div');
            newBody.className = 'snake-body';
            snake.appendChild(newBody);
            snakeBodies = document.querySelectorAll('.snake-body');
            snakeLength++;
        }

        function seekFood() {
            var deltaX = parseInt(food.style.left) - currentPosition.x;
            var deltaY = parseInt(food.style.top) - currentPosition.y;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    currentDirection = 'right';
                } else {
                    currentDirection = 'left';
                }
            } else {
                if (deltaY > 0) {
                    currentDirection = 'down';
                } else {
                    currentDirection = 'up';
                }
            }
        }

        function moveSnake() {
            var newPosition = { x: currentPosition.x, y: currentPosition.y };

            if (currentDirection === 'right') {
                newPosition.x += borderWidth;
            } else if (currentDirection === 'down') {
                newPosition.y += borderWidth;
            } else if (currentDirection === 'left') {
                newPosition.x -= borderWidth;
            } else if (currentDirection === 'up') {
                newPosition.y -= borderWidth;
            }

            if (newPosition.x < 0 || newPosition.x >= screenWidth || newPosition.y < 0 || newPosition.y >= screenHeight) {
                clearInterval(gameInterval);
                return;
            }

            currentPosition = newPosition;

            for (var i = snakeLength - 1; i > 0; i--) {
                snakeBodies[i].style.left = snakeBodies[i - 1].style.left;
                snakeBodies[i].style.top = snakeBodies[i - 1].style.top;
            }

            snakeBodies[0].style.left = currentPosition.x + 'px';
            snakeBodies[0].style.top = currentPosition.y + 'px';

            if (currentPosition.x === parseInt(food.style.left) && currentPosition.y === parseInt(food.style.top)) {
                document.body.removeChild(food);
                growSnake();
                createFood();
            }
        }

        function toggleSnake() {
            if (isSnakeVisible) {
                clearInterval(gameInterval);
                snake.style.display = 'none';
                food.style.display = 'none';
                isSnakeVisible = false;
                snakeToggle.textContent = 'Snake';
            } else {
                snake.style.display = 'block';
                food.style.display = 'block';
                isSnakeVisible = true;
                snakeToggle.textContent = 'Snake';
                gameInterval = setInterval(function() {
                    seekFood();
                    moveSnake();
                }, 200);
            }
        }

        snakeToggle.addEventListener('click', toggleSnake);

        createFood();
        gameInterval = setInterval(function() {
            seekFood();
            moveSnake();
        }, 200); // Adjust the interval (in milliseconds) to control the snake's speed
    });
</script>