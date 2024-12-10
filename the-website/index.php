<?php
$pages = array(
    'Home' => 'home',
    'News' => 'news',
    'Writing' => 'writing',
    'Publications' => 'publications',
    'Education' => 'education',
    'CV' => 'cv'
);

$page = isset($_GET['page']) ? $_GET['page'] : 'home';
$page_title = ucfirst($page);

if (!in_array($page, $pages)) {
    $page = 'home';
    $page_title = 'Home';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?> - Research Student</title>
    <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body class="retro-theme">
<canvas id="snakeCanvas"></canvas>
<!-- Grid overlay -->
<div class="grid-overlay"></div>

<header>
    <div class="glitch-container">
        <nav>
            <ul>
                <?php
                $index = 0;
                foreach ($pages as $name => $url):
                    ?>
                    <li<?php echo $page === $url ? ' class="active"' : ''; ?> data-page-index="<?php echo $index; ?>">
                        <a href="index.php?page=<?php echo $url; ?>" data-page="<?php echo $url; ?>" class="nav-link">
                            <span class="nav-text"><?php echo $name; ?></span>
                        </a>
                    </li>
                    <?php
                    $index++;
                endforeach;
                ?>
            </ul>
        </nav>
    </div>
</header>

<div class="content-container">
    <?php foreach ($pages as $name => $url): ?>
        <main class="page-content <?php echo $url; ?><?php echo $page === $url ? ' active' : ''; ?>" data-page="<?php echo $url; ?>">
            <div class="retro-container">
                <?php
                $content_file = $url . '_content.php';
                if (file_exists($content_file)) {
                    include $content_file;
                } else {
                    echo '<p class="error-message">// Error: Content not found</p>';
                }
                ?>
            </div>
        </main>
    <?php endforeach; ?>
</div>

<footer>
    <div class="footer-content">
        <p>&copy; <?php echo date("Y"); ?> Research Student // All rights reserved</p>
    </div>
</footer>
<script src="snake.js"></script>
<script src="script.js"></script>
</body>
</html>