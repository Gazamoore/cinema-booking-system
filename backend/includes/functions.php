<?php
    require_once '../../config/dbconn.php';

    function findUserByEmail($pdo, $email){
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    function checkEmailExists($pdo, $email){
        $stmt= $pdo->prepare("SELECT id FROM users WHERE email=?");
        $stmt->execute([$email]);
        return $stmt->fetch() !== false;
    }

    function addUser($pdo, $firstName, $email, $hashedPassword){
        try{
            $stmt = $pdo->prepare("INSERT INTO users (first_name, email, password) VALUES (?, ?, ?)");
            $stmt->execute([$firstName, $email, $hashedPassword]);
            echo json_encode([
                'success' => true,
                'message' => 'User successfully created'
            ]);

        } catch(PDOException $e){
            $pdo->rollBack();
            error_log($e->getMessage());
            echo json_encode([
                'success' => false,
                'message' => 'Error creating user',
            ]);
        }
        
    }
    function deleteOldShowtimes($pdo){
        $stmt = $pdo->prepare("DELETE FROM showtimes WHERE show_time < NOW()");
        $stmt->execute();
    }

    function generateShowtimes($pdo){
        $today = new DateTime();

        $showtimes = [
            [
                'movie_id' => 1,
                'theatre_id' => 1,
                'time' => '18:00:00'
            ],
            [
                'movie_id' => 1,
                'theatre_id' => 1,
                'time' => '21:00:00'
            ],
            [
                'movie_id' => 2,
                'theatre_id' => 2,
                'time' => '18:30:00'
            ],
            [
                'movie_id' => 2,
                'theatre_id' => 2,
                'time' => '21:30:00'
            ],
            [
                'movie_id' => 3,
                'theatre_id' => 3,
                'time' => '18:00:00'
            ],
            [
                'movie_id' => 3,
                'theatre_id' => 3,
                'time' => '21:30:00'
            ],
            [
                'movie_id' => 4,
                'theatre_id' => 4,
                'time' => '18:00:00'
            ],
            [
                'movie_id' => 4,
                'theatre_id' => 4,
                'time' => '21:30:00'
            ]
        ];

        for($i = 0; $i < 7; $i++){
            //cloning the date as I dont want it to just = $today, I want a new DateTime object because I dont want to change $today's value
            $date = clone $today;
            $date->modify("+$i days");
            foreach($showtimes as $showtime){
                $dateTime = $date->format('Y-m-d').' '.$showtime['time'];
                //checking to see if the showtime already exists
                $stmt = $pdo->prepare("SELECT id FROM showtimes WHERE movie_id=? AND theatre_id=? AND show_time=?");
                $stmt->execute([$showtime['movie_id'], $showtime['theatre_id'], $dateTime]);

                if(!$stmt->fetch()){
                    $stmt = $pdo->prepare("INSERT INTO showtimes (movie_id, theatre_id, show_time) VALUES (?, ?, ?)");
                    $stmt->execute([$showtime['movie_id'], $showtime['theatre_id'], $dateTime]);
                }
            }
        }
    }

    function getShowtimes($pdo){
        $stmt = $pdo->prepare("SELECT showtimes.id, showtimes.show_time, movies.id AS movie_id, movies.title, movies.description, movies.duration_minutes, theatres.id AS theatre_id,
        theatres.name AS theatre_name, cinemas.id AS cinema_id, cinemas.name AS cinema_name, cinemas.address FROM showtimes 
        INNER JOIN movies ON showtimes.movie_id = movies.id 
        INNER JOIN theatres ON showtimes.theatre_id = theatres.id 
        INNER JOIN cinemas ON theatres.cinema_id = cinemas.id 
        WHERE showtimes.show_time >= NOW() AND showtimes.show_time < DATE_ADD(NOW(), INTERVAL 7 DAY) 
        ORDER BY showtimes.show_time ASC");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    function isLoggedIn(){
        if(isset($_SESSION['user_id'])){
            return true;
        }
        return false;
    }

    function getShowtimeAndCapacity($pdo, $showtimeID){
        $stmt = $pdo->prepare("SELECT showtimes.id, showtimes.show_time, theatres.capacity FROM showtimes
        INNER JOIN theatres ON showtimes.theatre_id = theatres.id WHERE showtimes.id =? AND showtimes.show_time >NOW() FOR UPDATE");
        $stmt->execute([$showtimeID]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    function getBookedTickets($pdo, $showtimeID){
        $stmt = $pdo->prepare("SELECT COALESCE(SUM(number_of_tickets), 0) AS booked_tickets FROM bookings WHERE showtime_id = ?");
        $stmt->execute([$showtimeID]);
        $bookingData = $stmt->fetch(PDO::FETCH_ASSOC);
        return (int) $bookingData['booked_tickets'];
    }

    function createBooking($pdo, $userID, $showtimeID, $numberOfTickets){
        do {
            $bookingReference = 'MOV'.date('Y').rand(1000,9999);
            $stmt = $pdo->prepare('SELECT id FROM bookings WHERE booking_reference = ?');
        } while($stmt->fetch(PDO::FETCH_ASSOC));
        $stmt = $pdo->prepare("INSERT INTO bookings (user_id, showtime_id, booking_reference, number_of_tickets) VALUES (?, ?, ?, ?)");
        $stmt->execute([$userID, $showtimeID, $bookingReference, $numberOfTickets]);
        return $bookingReference;
    }
    
    function viewBookings($pdo, $userID){
        try{
            $stmt = $pdo->prepare("SELECT bookings.id AS booking_id, bookings.booking_reference, bookings.number_of_tickets, bookings.booked_at, showtimes.show_time,
            movies.title AS movie_title, cinemas.name AS cinema_name, cinemas.address AS cinema_address, theatres.name AS theatre_name FROM bookings
            INNER JOIN showtimes ON bookings.showtime_id = showtimes.id
            INNER JOIN movies ON showtimes.movie_id = movies.id
            INNER JOIN theatres ON showtimes.theatre_id = theatres.id
            INNER JOIN cinemas ON theatres.cinema_id = cinemas.id
            WHERE bookings.user_id = ?
            ORDER BY showtimes.show_time DESC");
            $stmt->execute([$userID]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch(PDOException $e){
            return null;
        }
    }
?>