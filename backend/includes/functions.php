<?php
    require_once '../../config/dbconn.php';

    function findUserByEmail($pdo, $email){
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        //returning an associative array of users
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    function checkEmailExists($pdo, $email){
        $stmt= $pdo->prepare("SELECT id FROM users WHERE email=?");
        $stmt->execute([$email]);
        //returning false if no user was found
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
            $error = $e->getMessage();
            echo json_encode([
                'success' => false,
                'message' => 'Error creating user',
                'error' => $error
            ]);
        }
        
    }
?>