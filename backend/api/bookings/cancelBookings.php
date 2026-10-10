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

    if($_SERVER['REQUEST_METHOD'] !== 'POST'){
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'message' => 'Method not allowed'
        ]);
        exit;
    }

    session_start();

    if(!isset($_SESSION['user_id'])){
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'You must be logged in to cancel a booking'
        ]);
        exit;
    }

    $userID = $_SESSION['user_id'];
    $data = json_decode(file_get_contents('php://input'), true);
    $bookingID = $data['booking_id'] ?? null;
    //checking that bookingID is valid and not negative or 0
    if(!is_numeric($bookingID) || (int)$bookingID < 1){
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'A valid booking id must be sent'
        ]);
        exit;
    }

    $cancelled = cancelBooking($pdo, (int)$bookingID, (int)$userID);

    if($cancelled){
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Booking cancelled'
        ]);
    } else {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Booking cancellation faield'
        ]);
    }
?>