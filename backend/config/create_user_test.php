<?php
    require_once "dbconn.php";
    //I know this is tracked by git - this is just a utility function dummy password used
    $firstName = 'Gareth';
    $email = 'gazaseanmoore09@gmail.com';
    $password = password_hash('strongpass', PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO users (first_name, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$firstName, $email, $password]);

    echo "User Created";
?>