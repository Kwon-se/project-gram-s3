<?php
include $_SERVER['DOCUMENT_ROOT'].'/php/ProjectGram/dbconnection.php'; 

$email = $_POST['email-id'];
$pw = $_POST['user-pw'];
$birthday = $_POST['user-date']; 

function errorLoginForm($alert){
  header('Content-Type: application/json');
  echo json_encode(['error' =>$alert]);
  return;
}

if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
  errorLoginForm('올바른 이메일이 아닙니다.');
  exit;
}

if($pw == null || $pw ==''){
  errorLoginForm('비밀번호를 입력해주세요');
  exit;
}

$pw = sha1('php'.$pw);

if($birthday==0){
  errorLoginForm('생년월일을 입력해주세요');
}

$isEmailCheck = false;

$sql ="SELECT email FROM `member_info` WHERE email ='{$email}'";
$result = $dbConnect->query($sql);

if($result){
  $count = $result->num_rows;
  if($count == 0){
    $isEmailCheck = true;
  }else{
    errorLoginForm('이미 존재하는 이메일 입니다.');
  }
}else{
  errorLoginForm('email error');
  exit;
}

if($isEmailCheck){
  $regTime = time();
  $sql = "INSERT INTO `member_info`(email, password, birth_day, regtime)";
  $sql .= "VALUES('{$email}', '{$pw}', '{$birthday}',{$regTime})"; 
  $result = $dbConnect -> query($sql);

  if($result){
    $_SESSION['email'] = $email;
    errorLoginForm('회원가입 성공');
  }else{
    errorLoginForm('sesstion error');
    exit;
  }
}else{
  errorLoginForm('Email Check error');
  exit;
}
?>