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

    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];
    $password = $data['password'];
    $user = findUserByEmail($pdo, $email);

    if(!$user){
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'User not Found'
        ]);
        exit;
    }

    if(password_verify($password, $user['password'])){
        session_start();
        $_SESSION['user_id'] = $user['id'];
        http_response_code(202);
        echo json_encode([
            'success' => true,
            'message' => 'Logged in Successfully'
        ]);

    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Incorrect login information'
        ]);
        exit;
    }
?>