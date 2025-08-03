<?php 
header('Content-Type: application/json');
include 'dbconnect.php';

$username = $_POST['username'];
$password = $_POST['password'];

// Fetch hashed password based on username use prepare statemet to prevent sql injection
$stmt = $connection->prepare("SELECT password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows === 1) {
    $row = $result->fetch_assoc();
    $storedHash = $row['password'];

    //Use password_verify to compare entered password with hashed one
    if (password_verify($password, $storedHash)) {
        echo json_encode(["status" => "success", "message" => "Login successful."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect password."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Username not found."]);
}
?>
