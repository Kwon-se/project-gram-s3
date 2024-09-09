<?php
$host = "localhost";
$user = "root";
$pw = "5008@rnjs@";
$dbName = "project_gram";
$dbConnect = new mysqli($host, $user, $pw, $dbName);
$dbConnect -> set_charset("utf8");

if($dbConnect->connect_error){
  die("데이터베이스 접속 실패: " . $dbConnect->connect_error);
}
?>