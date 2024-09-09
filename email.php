<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Composer autoload

$mail = new PHPMailer(true);

ob_start(); 
$mailstate = [
  'message'=>''
];

// // 폼에서 전달된 데이터를 받음
// $mail->IsSMTP();

// PHP의 mail() 함수로 이메일을 보냄
try {
  // 서버 설정
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->Host       = "smtp.naver.com";
  $mail->SMTPDebug  = 2;//0~5, 0:no debug
  $mail->SMTPAuth   = true;
  $mail->Port       = 587;
  $mail->Username   = "rnjstp48@naver.com";
  $mail->Password   = "ZT3F46VHCRVV";
  $mail->SMTPSecure = 'tls'; 
  // Enable TLS encryption, `ssl` also accepted

  //form data
  $userEmail = $_POST['useremail'];
  $userEmailTitle = $_POST['title'];
  $userMessage = $_POST['message'];

   // 이메일을 보낼 대상 이메일 주소
   $to = 'rnjstp48@naver.com'; // 수신자 이메일 주소
   $subject = "새로운 메시지 from " . $userEmailTitle;

   // 이메일 본문
   $body = "발신자의 이메일 주소: " . htmlspecialchars($_POST['useremail']);
   $body .= "메시지 내용: " . nl2br(htmlspecialchars($_POST['message']));

  //수신자 설정
  $mail->AddAddress('rnjstp48@naver.com', '권세');
  $mail->SetFrom('rnjstp48@naver.com', 'user-email');
  $mail->AddReplyTo('rnjstp48@naver.com', 'my-email');
  $mail->Subject = $subject;
  
  $mail->Subject = $subject;
  $mail->isHTML(false); // HTML 사용 안 함 (텍스트 본문)
  $mail->Body = $body; // 이메일 본문 설정
  
  
  $mail->Send(); 

  $mailstate['message'] = 1;
  
 
  
} catch (phpmailerException $e) {
  $mailstate['message'] = 0; 
  echo $mail->ErrorInfo;

}
ob_end_clean(); // 모든 출력 버퍼 제거
header('Content-Type: application/json');
echo json_encode($mailstate);
?>
