<?php 
    $env = parse_ini_file(__DIR__ . '/../.env');
    if($env === false){
        error_log('.env not found');
        http_response_code(500);
        header('Content-Type:application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Server error'
        ]);
        exit;
    }
    try{
    $pdo = new PDO("mysql:host={$env['DB_HOST']};port={$env['DB_PORT']};dbname={$env['DB_NAME']}", $env['DB_USER'], $env['DB_PASS'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,]);
   // echo "The database is online" . "<br>";
    } catch(PDOException $e){
        error_log("DB connection failed: " . $e->getMessage());
        http_response_code(500);
        echo "Connection failed" . $e->getMessage();
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Connection to DB failed'
        ]);
        exit;
    }
?>