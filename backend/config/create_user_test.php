<?php
    require_once "dbconn.php";

    $firstName = 'Gareth';
    $email = 'gazaseanmoore09@gmail.com';
    $password = password_hash('strongpass', PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO users (first_name, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$firstName, $email, $password]);

    echo "User Created";
?>