<?php
    require_once '../../includes/functions.php';
    
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit;
    }

    session_start();

    if(isLoggedIn()){
        http_response_code(202);
        echo json_encode([
            'success' => true,
            'loggedIn' =>true,
            'user_id' =>$_SESSION['user_id']
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'loggedIn' => false,
            'message' => 'User is not logged in'
        ]);
    }
?>