<?php
    //using the dbconn to access the db
    require_once '../../config/dbconn.php';
    //because my backend is running on Ampps I need something to help with CORS, hence the first header
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Content-Type: application/json');

    try{
        //fetching all the data in the cinemas table
        $stmt = $pdo->query("SELECT * FROM cinemas");
        $cinemas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($cinemas);

    } catch (PDOException $e){
        //showing that something went wrong when fetching the data
        echo json_encode([
            'error' => 'Failed to retrieve cinemas'
        ]);
    }
?>