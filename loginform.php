<?php
session_start(); 
include $_SERVER['DOCUMENT_ROOT'].'/php/ProjectGram/dbconnection.php';

$email = $_POST['email-id'];
$pw = $_POST['user-pw'];

function errorLoginForm($alert){
  header('Content-Type: application/json');
  echo json_encode(['error' => $alert]);
  return;
}
if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
  errorLoginForm('이메일이 찾을 수 없습니다.');
  exit;
}

if($pw == null || $pw == ''){
  errorLoginForm('비밀번호를 다시 확인해주세요.');
  exit;
}
$pw = sha1('php'.$pw);

$sql = "SELECT email FROM `member_info` "; 
$sql .= "WHERE email = '{$email}' AND password = '{$pw}'";
$result = $dbConnect->query($sql);

$response = array();

if($result){
  if($result->num_rows == 0){
    errorLoginForm('로그인 정보가 일치하지 않습니다.');
  }else{
    $memberInfo = $result->fetch_array(MYSQLI_ASSOC);
    $_SESSION['email'] = $memberInfo['email'];
    $_SESSION['loggedin'] = true;
    
    $loginData = array(
      'isLoggedIn' => true,
      'userEmail' => $memberInfo['email']
    );
    $response[] = $loginData; 
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
  }
}else{
  errorLoginForm('회원정보가 존재하지 않습니다.');
  exit;
}

?>