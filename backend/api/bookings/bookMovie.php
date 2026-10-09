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

    if(!isLoggedIn()){
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Please log inbefore booking a movie'
        ]);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);

    if(!is_array($data) || !isset($data['showtime_id']) || !isset($data['number_of_tickets'])){
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Showtime and ticket quantity cannot be blank.'
        ]);
        exit;
    }

    $showtimeID = filter_var($data['showtime_id'], FILTER_VALIDATE_INT);
    $numberOfTickets = filter_var($data['number_of_tickets'], FILTER_VALIDATE_INT);
    
    if($showtimeID === false || $showtimeID < 1){
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid showtime selected'
        ]);
        exit;
    }
    
    if($numberOfTickets === false || $numberOfTickets <1){
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'You must book at least one ticket'
        ]);
        exit;
    }

    $userID = $_SESSION['user_id'];

    try{
        $pdo->beginTransaction();
        $showtime = getShowtimeAndCapacity($pdo, $showtimeID);

        if(!$showtime){
            $pdo->rollBack();
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Time unavailable'
            ]);
            exit;
        }

        $bookedTickets = getBookedTickets($pdo, $showtimeID);
        $availableSeats = (int) $showtime['capacity'] - $bookedTickets;

        if($numberOfTickets > $availableSeats){
            $pdo->rollBack();
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Not enough available seats'
            ]);
            exit;
        }

        $bookingReference = createBooking($pdo, $userID, $showtimeID, $numberOfTickets);
        $pdo->commit();
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Tickets Booked successfully',
            'booking_reference' => $bookingReference
        ]);

    } catch(PDOException $e){
        if($pdo->inTransaction()){
            $pdo->rollBack();
        }
        error_log($e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'An error occured while creating the booking',
        ]);
    }
?>