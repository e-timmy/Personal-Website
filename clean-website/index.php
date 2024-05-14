<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jersey+10&family=Oswald:wght@200..700&display=swap" rel="stylesheet">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Name</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <nav id="navbar">
                <ul>
                    <li><a href="#" class="tab" data-section="home">Home</a></li>
                    <li><a href="#" class="tab" data-section="about">About</a></li>
                    <li><a href="#" class="tab" data-section="education">Education</a></li>
                    <li><a href="#" class="tab" data-section="writing">Writing</a></li>
                    <li><a href="#" class="tab" data-section="projects">Projects</a></li>
                    <li><a href="#" class="tab" data-section="contact">Contact</a></li>
<!--                    <button id="snakeToggle" class="tab-button">Snake</button>-->
                </ul>
            </nav>
        </header>

        <main>
            <?php include 'sections/home.php'; ?>
            <?php include 'sections/about.php'; ?>
            <?php include 'sections/education.php'; ?>
            <?php include 'sections/writing.php'; ?>
            <?php include 'sections/projects.php'; ?>
            <?php include 'sections/contact.php'; ?>
        </main>
<!--        --><?php //include 'snake.php'; ?>
    <script src="script.js"></script>
    </div>
</body>
</html>