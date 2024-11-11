<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu - Thin Jimmy's</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .menu-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            border: 2px solid #e41e31;
        }
        .menu-section {
            margin: 20px 0;
        }
        .menu-item {
            margin: 10px 0;
            padding: 10px;
            border-bottom: 1px dashed #e41e31;
        }
    </style>
</head>
<body>
<?php include 'header.php'; ?>
<div class="container">
    <h1 class="main-title">Our Menu</h1>
    <div class="menu-content">
        <div class="menu-section">
            <h2>Classic Burgers</h2>
            <div class="menu-item">
                <h3>The Jimmy Special</h3>
                <p>Our signature burger with secret sauce - $15</p>
            </div>
        </div>
    </div>
</div>
<?php include 'footer.php'; ?>
<script src="script.js"></script>
</body>
</html>