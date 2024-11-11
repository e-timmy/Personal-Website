<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thin Jimmy's - Classic American Diner</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="homepage-styles.css">
</head>
<body data-page="index">
<?php include 'header.php'; ?>
<div class="container">
    <h1 class="main-title">Thin Jimmy's</h1>
    <div class="animated-graphics">
        <div class="coffee-animation">
            <svg viewBox="0 0 200 200" class="coffee-svg">
                <path class="mug" d="M40,80 L40,160 Q40,180 60,180 L140,180 Q160,180 160,160 L160,80 Z" />
                <path class="handle" d="M160,100 Q190,100 190,130 Q190,160 160,160" />
                <rect class="coffee" x="40" y="80" width="120" height="0">
                    <animate attributeName="height" from="0" to="80" dur="3s" repeatCount="indefinite" />
                </rect>
                <path class="steam steam1" d="M70,80 Q80,50 90,80" />
                <path class="steam steam2" d="M100,80 Q110,50 120,80" />
                <path class="steam steam3" d="M130,80 Q140,50 150,80" />
            </svg>
        </div>
        <div class="pancake-animation">
            <svg viewBox="0 0 200 200" class="pancake-svg">
                <circle class="pancake" cx="100" cy="150" r="80" />
                <circle class="pancake" cx="100" cy="130" r="75" />
                <circle class="pancake" cx="100" cy="110" r="70" />
                <rect class="butter" x="85" y="90" width="30" height="20" rx="5" ry="5" />
                <path class="steam steam1" d="M70,80 Q80,50 90,80" />
                <path class="steam steam2" d="M100,60 Q110,30 120,60" />
                <path class="steam steam3" d="M130,80 Q140,50 150,80" />
            </svg>
        </div>
    </div>
    <div class="logo-container">
        <img src="resources/logo.jpeg" alt="Thin Jimmy's Logo" class="logo">
        <div class="hover-links">
            <a href="menu.php" class="menu-link">Menu</a>
            <a href="contact.php" class="contact-link">Contact</a>
            <a href="reservations.php" class="reservations-link">Reservations</a>
        </div>
    </div>
</div>
<?php include 'footer.php'; ?>
<script src="script.js"></script>
</body>
</html>