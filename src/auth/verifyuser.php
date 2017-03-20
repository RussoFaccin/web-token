<?php
include 'inc/connect.php';
$SECRET = "EtCngPx6";
$auth_header = getallheaders()['Authorization'];
$raw_token = explode(".", $auth_header);
$payload = base64_decode($raw_token[0]);
$user_obj = json_decode($payload);
$user_name = $user_obj->name;
$user_mail = $user_obj->mail;
$raw_signature = $raw_token[1];
$signature = hash_hmac( "sha256" , $raw_token[0] , $SECRET );
// if ($signature == $raw_signature) {
//   echo "TOKEN VERIFYED";
//}
// Query Database
$query_str = 'SELECT signature FROM users WHERE user_name = ?';
$stmt = $conn->prepare($query_str);
$stmt->execute([$user_name]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$user_signature = $result[0]["signature"];

if ($user_signature == $signature) {
  echo "USER VERIFYED!";
}else{
  echo "TOKEN INVALID";
}

// Close the connection
$conn = null;
 ?>
