//01 loginHandler
const loginSubmitBtn = document.querySelector('#login-modal-box .mas-contain #login-btn');
//mini profile user email
const userEmailProfile = document.querySelector('#footer-content .top-section-title h3');
//php mailer input email value
const userEmailInput = document.querySelector('#user-email');

loginSubmitBtn.addEventListener('click', function(event) {
  console.log('loginSubmitBtn');
  event.stopPropagation();
  event.preventDefault();

  const emailValue = document.getElementById('login-email');
  const passwordValue = document.getElementById('login-password');
  
  fetch('loginform.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'email-id': emailValue.value,
      'user-pw': passwordValue.value
    })
  })
  .then(response => 
    //{
    // if (!response.ok) {
    //   throw new Error(`Server returned  ${response.status}: ${response.statusText}`);
    // }
    // if (!response.headers.get('content-type')?.includes('application/json')) {
    //   throw new Error("Invalid content-type. Must be application/json");
    // }
    // return 
    response.json()
 // }
 )
  .then(data => {
   if(data.error){
    alert(data.error);
   }else{
     //sesstionStorage
     const storedEmail = data[0].userEmail;
     sessionStorage.getItem('storedEmail',storedEmail);
     passwordValue.value='';
     updateLoginUI(data[0].userEmail);
     //#user-email input value email userEmail;
     userEmailInput.value=data[0].userEmail;
     userEmailProfile.innerHTML=data[0].userEmail;
   }
  })
  .catch(error => {
    console.error("login Form Error:", error);
  });
});

//02 login data up date ui
function updateLoginUI(data) {
  const loginText = document.querySelector('.login-box .login');
  const loginBoxSpan = document.querySelector('.login-box span');
  const loginSign = document.querySelector('.login-box .sign-up');
  const loginOut = document.querySelector('.login-box .logout');
  
  if (data) {
    loginText.style.display = 'none';
    loginBoxSpan.style.display = 'none';
    loginSign.style.display = 'none';
    loginOut.style.display = 'block';
    loginModalBox.style.display = 'none';
    loginalert();
  } else {
    console.log("php conection error");
    alert(data.error || '로그인에 실패했습니다.');
  }
}
//02-1 
function loginalert(){
  alert('로그인 되었습니다.');
  return;
};

//03 logout btn click event
const logOutBtn = document.querySelector('.logout');
logOutBtn.addEventListener('click',logout);

//04 logout js code
function logout() {
  sessionStorage.removeItem('storedEmail');
  var xhr = new XMLHttpRequest();
  xhr.open("POST","logout.php",true);
  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

  const loginText = document.querySelector('.login-box .login');
  const loginBoxSpan = document.querySelector('.login-box span');
  const loginSign = document.querySelector('.login-box .sign-up');
  const loginOut = document.querySelector('.login-box .logout');

  
  const passwordValue = document.getElementById('login-password').value;
  
  //logout success
  xhr.onreadystatechange = function(){
    if(xhr.readyState ===4 && xhr.status === 200){
      var response = JSON.parse(xhr.responseText);
      if(response.status === "success"){
        alert("로그아웃 되었습니다.");
        loginText.style.display = 'block';
        loginBoxSpan.style.display = 'block';
        loginSign.style.display = 'block';
        loginOut.style.display = 'none';
        userEmailInput.value='';
        userEmailProfile.innerHTML='Project Web Page';
        passwordValue.trim()='';
      }
    }
  };

  xhr.send();
}
