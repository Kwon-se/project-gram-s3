<?php
session_start();
unset($_SESSION['email']);
unset($_SESSION['email-id']);
unset($_SESSION['user-pw']);
$_SESSION['loggedin'] = false;
echo json_encode(["status" => "success"]);
?>