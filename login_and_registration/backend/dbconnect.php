<?php

$servername = "localhost";
$username = "root"; 
$password = "";
$databasename = "practicephp";

//use to create connection within the database
$connection = new mysqli($servername, $username, $password, $databasename);

// Condtional statement to checkk if the connection is successful or not\
if($connection -> connect_error){
 http_response_code(500); // Optional: Tell browser it's a server error
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit;
}
?>