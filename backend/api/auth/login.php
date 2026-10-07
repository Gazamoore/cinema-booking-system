<?php
    require_once '../../config/dbconn.php';
    require_once '../../includes/functions.php';

    //because my backend is running on Ampps I need something to help with CORS, hence the first header
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Content-Type: application/json');

    // Handle browser preflight request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit;
    }

   

    //Getting the data being snet by react
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];
    $password = $data['password'];
    //calling the findUserByEmail function
    $user = findUserByEmail($pdo, $email);

    //checking to see if the user exists and sending a user not found message if they dont
    if(!$user){
        echo json_encode([
            'success' => false,
            'message' => 'User not Found'
        ]);
        exit;
    }

    if(password_verify($password, $user['password'])){
        session_start();
        $_SESSION['user_id'] = $user['id'];

        echo json_encode([
            'success' => true,
            'message' => 'Logged in Successfully'
        ]);

    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Incorrect login information'
        ]);
        exit;
    }
?>