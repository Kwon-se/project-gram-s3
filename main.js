//project gram

//to do list 이벤트
const todoBtn = document.querySelector('.todo-btn');
const inputTag = document.querySelector('#input-tag');
const ulTag = document.querySelector('#todo-list-tag');
const inputBox=document.querySelector('.input-box');

// inputTag.addEventListener('click',function stopEvent(event){
//   event.stopPropagation();
// });

todoBtn.addEventListener('click', function(){
  console.log('todoBtn');
  creatTag();
})

//to do list - new create tag  
function creatTag(){
const inputMessage = inputTag.value.trim();
const  liTag = document.createElement("li");
const spanTag0 = document.createElement("span");
const buttonTag = document.createElement("button");

if(inputMessage !==""){
ulTag.appendChild(liTag);
liTag.append(spanTag0);
spanTag0.innerText=inputMessage;

liTag.appendChild(buttonTag);
buttonTag.innerText='x';
buttonTag.classList.add('deleteBtn');

inputTag.value="";
}else{
  alert('To Do List 의 오늘 할 일을 입력해주세요...');
}

}

//todo list delete btn event 삭제버튼 이벤트
ulTag.addEventListener('click',function(event){
  event.stopPropagation();
  if(event.target.classList.contains('deleteBtn')||event.target.classList.contains('span')){
    const deleteLi = event.target.parentElement;
    deleteLi.remove();
  }else{
    console.log('delete ul li tag');
  }
});

//01. todo list enter Key 이벤트 
inputBox.addEventListener('keypress',Enter);

function Enter(event){
  //event.stopPropagation();
  console.log('Enter KeyPress')
  if(event.key ==='Enter'&&!event.shiftKey){
    if(inputTag.value.trim()===''){
      alert('To Do List 의 오늘 할 일을 입력해주세요...(key press)');
    }else{
      creatTag();   
    }
  }
  
}




