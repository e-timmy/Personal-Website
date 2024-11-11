<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Build Your Burger - Thin Jimmy's</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="order-styles.css">
</head>
<body>
<?php include 'header.php'; ?>
<div class="container">
    <h1 class="main-title">Build Your Burger</h1>
    <div class="burger-builder">
        <div class="burger-preview">
            <div class="burger">
                <div class="bun-top"></div>
                <div class="ingredients-container"></div>
                <div class="bun-bottom"></div>
            </div>
        </div>
        <div class="ingredients-panel">
            <div class="ingredients-available">
                <h2>Available Ingredients</h2>
                <div class="ingredients-list" id="available-ingredients">
                    <div class="ingredient-item" draggable="true" data-ingredient="beef" data-color="#8b4513">
                        <span class="ingredient-color" style="background-color: #8b4513"></span>
                        <span>Beef Patty</span>
                    </div>
                    <div class="ingredient-item" draggable="true" data-ingredient="lettuce" data-color="#90EE90">
                        <span class="ingredient-color" style="background-color: #90EE90"></span>
                        <span>Lettuce</span>
                    </div>
                    <div class="ingredient-item" draggable="true" data-ingredient="tomato" data-color="#ff6347">
                        <span class="ingredient-color" style="background-color: #ff6347"></span>
                        <span>Tomato</span>
                    </div>
                    <div class="ingredient-item" draggable="true" data-ingredient="cheese" data-color="#ffd700">
                        <span class="ingredient-color" style="background-color: #ffd700"></span>
                        <span>Cheese</span>
                    </div>
                    <div class="ingredient-item" draggable="true" data-ingredient="pickle" data-color="#2e8b57">
                        <span class="ingredient-color" style="background-color: #2e8b57"></span>
                        <span>Pickle</span>
                    </div>
                    <div class="ingredient-item" draggable="true" data-ingredient="onion" data-color="#fff5e6">
                        <span class="ingredient-color" style="background-color: #fff5e6"></span>
                        <span>Onion</span>
                    </div>
                    <div class="ingredient-item" draggable="true" data-ingredient="bacon" data-color="#d2691e">
                        <span class="ingredient-color" style="background-color: #d2691e"></span>
                        <span>Bacon</span>
                    </div>
                </div>
            </div>
            <div class="burger-builder-area">
                <h2>Build Your Burger</h2>
                <div class="burger-builder-container" id="burger-builder">
                    <p class="empty-state">Drag ingredients here to build your burger</p>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include 'footer.php'; ?>
<script src="script.js"></script>
<script src="burger-builder.js"></script>
</body>
</html>