<?php
header('Content-Type: application/json');

// In a real application, you would fetch this data from a database
// For this example, we'll generate random availability
$date = $_GET['date'] ?? '';
$time = $_GET['time'] ?? '';

// Seed the random number generator with the date and time to get consistent results for the same input
srand(crc32($date . $time));

$tables = range(1, 12);
$unavailableTables = array_slice($tables, 0, rand(0, 5));

echo json_encode($unavailableTables);
?>