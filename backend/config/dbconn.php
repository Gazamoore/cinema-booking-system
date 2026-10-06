<?php 
    try{
    $pdo = new PDO("mysql:host=localhost;port=3306;dbname=cinema_booking_system", "root", "Cocopop2020");
   // echo "The database is online" . "<br>";
    } catch(PDOException $e){
        echo "Connection failed" . $e->getMessage();
    }
?>