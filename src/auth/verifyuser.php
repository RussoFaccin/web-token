<?php
include 'inc/connect.php';
$SECRET = "EtCngPx6";
$auth_header = getallheaders()['Authorization'];
$raw_token = explode(".", $auth_header);
$payload = base64_decode($raw_token[0]);
$raw_signature = $raw_token[1];
$signature = hash_hmac( "sha256" , $raw_token[0] , $SECRET );

if ($signature == $raw_signature) {
  echo "TOKEN VERIFYED";
}
 ?>
