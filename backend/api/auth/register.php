<?php
    

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

    require_once '../../config/dbconn.php';
    require_once '../../includes/functions.php';

    $data = json_decode(file_get_contents("php://input"), true);
    $firstName = $data['first_name'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    //checking to ensure all fields were entered
    if(empty($firstName) || empty($email) || empty($password)){
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Please ensure that all fields are filled in'
        ]);
        exit;
    }
    
    if(checkEmailExists($pdo, $email)){
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'Error creating account as an account with that email already exists.'
        ]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    addUser($pdo, $firstName, $email, $hashedPassword);
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Account created successfully'
    ]);
    
?>