//header 태그의 #page-title 태그의 택스트 랜딩 코드

//01
const headerText = document.querySelector('#page-title');
const titleText =['Project Gram'];
const textArray = titleText[0].split('');


console.log(textArray);

function printText(){
  const containArray = [];
  for(let i=0; i<textArray.length; i++){
    setTimeout(() => {
      if (i === 0) {
        containArray[i] = textArray[i];
      } else {
        containArray[i] = containArray[i - 1] + textArray[i];
      }
      headerText.innerHTML = containArray[i];
    },i*100); // 500ms 간격으로 출력
  }
}
printText();

//02 Drop List  flex/none

const dropLink = document.querySelector('.drop-link');
const dropContain = document.querySelector('#drop-contain');
const bodyTag = document.querySelector('body');

dropLink.addEventListener('click', function(event){
  event.stopPropagation();
  console.log('dropLink');
  if(dropContain.style.display==='block'){
    dropContain.style.display = 'none';
  }else{
    dropContain.style.display = 'block';
  }
})

bodyTag.addEventListener('click',function(event){
  console.log('bodyTag');
  event.stopPropagation();
  if(dropContain.style.display='block'&&!dropLink.contains(event.target)&&!dropContain.contains(event.target)){
    dropContain.style.display = 'none';
  }
  console.log('bodyTag-login-modal-box');
  if(addModalBox.style.display='flex' && !loadBtn.contains(event.target) && !addModalBox.contains(event.target)){
    addModalBox.style.display ='none';
  }
})

//03 email mobal Box  flex/none
const emailModal = document.querySelector('.email-modal-box');
const modalContain =  document.querySelector('#modal-contain');
//const masContain  = document.querySelector('.mas-contain');

emailModal.addEventListener('click', function(event){
  event.stopPropagation();
  console.log('madalBox');
  if(modalContain.style.display==='flex'){
    modalContain.style.display = 'none';
  }else{
    modalContain.style.display = 'flex';
  }
})

modalContain.addEventListener('click',function(event){
  //event.stopPropagation();
  console.log('modalContain');
  if(event.target === modalContain ){
    modalContain.style.display = 'none';
  }

})

//04 profile modal box  flex/none
const profileModalBox = document.querySelector('#profile-modal-box');
const profileContain = document.querySelector('.profile-contain');
const profileLink = document.querySelector('.profile-link');

profileLink.addEventListener('click', profileModalOpen)

function profileModalOpen(event){
  event.stopPropagation();
  console.log('profile');
  if(profileModalBox.style.display==='none' || profileModalBox.style.display === ''){
    profileModalBox.style.display  = 'flex';
  }else{
    profileContain.style.display = 'none';
  }
}

profileModalBox.addEventListener('click',profileModalClose);

function profileModalClose(event){
  event.stopPropagation();
  console.log('profileModalBox');
  if(!profileContain.contains(event.target)){
    profileModalBox.style.display = 'none';
  }
}

//04-1 footer profile link tag click event
//const footerProfileLink = document.querySelector('·mini-profile-link');mini-profile-link
//footerProfileLink.addEventListener('click',profileModalOpen);

//05 login-mobal-box  flex/none
const loadBtn = document.querySelector('.load-btn');
const addModalBox = document.querySelector('.add-modal-box');

loadBtn.addEventListener('click', function(event){
  event.stopPropagation();
  console.log('loadBtn');
  if(addModalBox.style.display === 'none' || addModalBox.style.display === ''){
    addModalBox.style.display ='flex';
  }else{
    addModalBox.style.display ='none';
  }
})

//06 #login-modal-box
//03 email mobal Box  flex/none
const loginBtn = document.querySelector('.login');
const loginModalBox =  document.querySelector('#login-modal-box');
//const masContain  = document.querySelector('.mas-contain');

loginBtn.addEventListener('click', function(event){
  event.stopPropagation();
  console.log('loginBtn');
  if(loginModalBox.style.display==='flex'){
    loginModalBox.style.display = 'none';
  }else{
    loginModalBox.style.display = 'flex';
  }
})

loginModalBox.addEventListener('click',function(event){
  event.stopPropagation();
  console.log('loginModalBox');
  if(event.target === loginModalBox ){
    loginModalBox.style.display = 'none';
  }
})

//07 #sign-modal-box 
// 07-1button tag click
const signUp = document.querySelector('.sign-up');
const signModalBox =  document.querySelector('#sign-modal-box');

signUp.addEventListener('click', function(event){
  event.stopPropagation();
  console.log('signUp');
  if(signModalBox.style.display==='flex'){
    signModalBox.style.display = 'none';
  }else{
    signModalBox.style.display = 'flex';
  }
})

signModalBox.addEventListener('click',function(event){
  event.stopPropagation();
  console.log('signModalBox');
  if(event.target === signModalBox ){
    signModalBox.style.display = 'none';
  }
})
//sign Up Form
//07-2sign btn click event
const  signBtnClick = document.querySelector('#sign-btn');

//sign Up form submit js code
signBtnClick.addEventListener('click', passwordCheck);

//비밀번호 중복 검사 
function passwordCheck(event) {
  event.preventDefault();
  console.log('submit');
  event.stopPropagation();
  event.preventDefault()
  const password = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;

  if (password !== password2) {
    alert('비밀번호가 일치하지 않습니다.');
  }else{
    signUpFormSubmit();
  }
}

//sign Up form submit js code
function signUpFormSubmit(){
 
  const signEmail = document.getElementById('email-id');
  const signPw = document.getElementById('password');
  const signDate = document.getElementById('birth-day');
  
  fetch('signform.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'email-id': signEmail.value,
      'user-pw': signPw.value,
      'user-date':signDate.value
    })
  })
  .then(response => response.json())  // 응답을 JSON으로 변환
    .then(data => {
        alert(data.error)    
        console.log(data);
        signModalBox.style.display ='none';
        loginModalBox.style.display ='flex';
      
    })
    .catch(error => console.error('Error:', error));  // 에러 처리
}

//08 tail text modal-box /class name tail-text
const tailTexts = document.querySelectorAll('.tail-text');
const tailBoxs = document.querySelectorAll('.tail-box');

//tailText mouse Hover/out
tailTexts.forEach((tailText, index) => {
  tailText.addEventListener('mouseover',function textHover(){
    //event.stopPropagation();
    tailBoxs[index].style.display= 'flex';
     
    });

  tailText.addEventListener('mouseout',function textOut(){
    //event.stopPropagation();
    tailBoxs[index].style.display= 'none';
     
    });

})
//09 main content tailBox mouse Hover/Out
tailBoxs.forEach((tailBox, index) => {
  tailBox.addEventListener('mouseover',function boxHover(){
    //event.stopPropagation();
    tailBoxs[index].style.display= 'flex';
     
    });

    tailBox.addEventListener('mouseout',function boxOut(){
    //event.stopPropagation();
    tailBoxs[index].style.display= 'none';
     
    });

})

//main content tailBox mouse Hover/Out
//Fail code--
// tailText.addEventListener('mouseover',tailHover);
// function tailHover(event){
// //event.stopPropagation();
// tailBox.style.display= 'flex';
 
// }

// tailText.addEventListener('mouseout',tailOut);

// function tailOut(event){
// //event.stopPropagation();
// tailBox.style.display= 'none';
 
// }


//10 php mailer btn event
const emailSubmitBtn = document.querySelector('.submit-btn');

emailSubmitBtn.addEventListener('click',event=>{
  console.log('emailSubmitBtn');
  event.preventDefault();

  const userEmail = document.getElementById('user-email');
  const userEmailTitleText = document.getElementById('title-text');
  const mesBoxText = document.getElementById('mes-box');

  if(!validateEmail(userEmail.value)){
    alert('이메일 형식이 옳바르지 않습니다.');
  }else if(userEmailTitleText.value.trim() =='' || mesBoxText.value.trim() == ''){
    alert('제목과 내용을 확인해 주세요!');
  }else{
  fetch('email.php', {
    method: 'POST',
    body: new URLSearchParams({
      'useremail': userEmail.value,
      'title': userEmailTitleText.value,
      'message' : mesBoxText.value,
      'dataType': 'json',

    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Server returned  ${response.status}: ${response.statusText}`);
    }
    if (!response.headers.get('content-type')?.includes('application/json')) {
      throw new Error("Invalid content-type. Must be application/json");
    }
    return response.json();
  })
  .then(data => {
    userEmailTitleText.value='';
    mesBoxText.value='';
    console.log(data);
    phpMailerEvent(data);


  })
  .catch(error => {
    console.error("PHP mailer Event Form Error:", error);
  });

}
})

//10-1 php mailer 
function phpMailerEvent(event){
  if(event){
    alert('메일이 정상석으로 전송 되었습니다.');
  }else{
    alert(event.error || '메일 전송에 실패했습니다.');
  }
 
}

//10-2 email 유효성 검사 
function validateEmail(email) {
  const re = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  return re.test(email.toLowerCase());
}


