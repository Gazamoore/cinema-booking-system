<?php
    require_once '../../config/dbconn.php';

    function findUserByEmail($pdo, $email){
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        //returning an associative array of users
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
?>