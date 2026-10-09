<?php
    require_once '../../config/dbconn.php';
    
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Content-Type: application/json');

    try{
        
        $stmt = $pdo->query("SELECT * FROM cinemas");
        $cinemas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);
        echo json_encode($cinemas);

    } catch (PDOException $e){
        http_response_code(400);
        echo json_encode([
            'error' => 'Failed to retrieve cinemas'
        ]);
    }
?>