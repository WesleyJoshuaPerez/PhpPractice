<?php 
header('Content-Type: application/json');
include 'dbconnect.php';

// Collect user data
$username = $_POST['username'];
$password = $_POST['password'];
$email = $_POST['email'];

// Hash the password securely
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Prepare SQL query using placeholders to prevent SQL injection make user the password value is 255 to be able to hash the correct value with the password
$stmt = $connection->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $hashedPassword, $email);

// Execute and respond
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User registered successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}
?>
