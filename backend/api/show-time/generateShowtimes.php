<?php
    require_once '../../config/dbconn.php';
    require_once '../../includes/functions.php';

    
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit;
    }

    deleteOldShowtimes($pdo);
    generateShowtimes($pdo);
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Showtimes generated successfully'
    ]);
?>