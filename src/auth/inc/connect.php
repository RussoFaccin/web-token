<?php
$servername = "localhost";
$username = "root";
$password = "root";
$database = "web-token";

try{
	// Create connection
	$conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
	// set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
	echo "Error: " . $e->getMessage();
}
?>
