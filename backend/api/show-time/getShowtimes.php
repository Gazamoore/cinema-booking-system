<?php 
    require_once '../../config/dbconn.php';
    require_once '../../includes/functions.php';

    //because my backend is running on Ampps I need something to help with CORS, hence the first header
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Content-Type: application/json');

    // ending if an OPTIONS request is sent
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit;
    }

    deleteOldShowtimes($pdo);
    generateShowtimes($pdo);
    $showtimes = getShowtimes($pdo);
    echo json_encode([
        'success' => true,
        'message' => $showtimes
    ]);
?>