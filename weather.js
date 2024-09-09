//weather api symbol icon action
const symblosIcon =document.querySelector('.weather-info-main .material-symbols-outlined');

symblosIcon.addEventListener('animationend', (event) => {
  event.stopPropagation();
  symblosIcon.classList.remove('animate');
});

//Weather Api search button 
const search = document.querySelector('.weather-app-contain #weather-btn');
const weatherInput = document.querySelector('.weather-box input');

search.addEventListener('click', weatherApiCreat);

function weatherApiCreat(event){
  //event.stopPropagation();
  const APIKey ='91eb83641c55015a5fc1da13ec51432c';
  
  console.log('1');

  if(weatherInput.value.trim() == ''){
  return;
}else{
  console.log('2');
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherInput.value}&units=metric&appid=${APIKey}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
    throw new Error('API Key Error');
    }
  })
  .then(json=>{
    console.log(json);
    //json.weather[].main의 값에 따라 weather-icon 변경
   
    const symblosIcon =document.querySelector('.weather-info-main .material-symbols-outlined');
    const iconText = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const humiditySpan = document.querySelector('.info-humidity span');
    const windSpan = document.querySelector('.info-wind span');
    const weatherNotice = document.querySelector('.weather-notice');
    //const infoMain = document.querySelector('.weather-info-main');
  
    switch(json.weather[0].main){
      case 'Clear':
        iconText.innerHTML ='Sunny';
        break;

      case 'Rain':
        iconText.innerHTML ='Rainy';
        break;

      case 'Snow':
        iconText.innerHTML ='Snowing';
        break;
        
      case 'Clouds':
        iconText.innerHTML ='Cloud';
        break;

      case 'Mist':
        iconText.innerHTML ='Mist';
        break;

      default:
          iconText.innerHTML ='';
    }
    if(json.weather[0].main){
      weatherNotice.style.display='none';
      temperature.style.display='flex';
      description.style.display='flex';
      iconText.style.marginTop='33px';
      iconText.style.marginBottom='0';
      symblosIcon.classList.add('animate');
    }else{
      weatherNotice.style.display='flex';
    }

  temperature.innerHTML=`${parseInt(json.main.temp)}<span>℃</span>`;
  description.innerHTML = `날씨 : <span> ${json.weather[0].main}</span>`;
  humiditySpan.innerHTML = `${json.main.humidity}%`;
  windSpan.innerHTML  = `${parseInt(json.wind.speed)}Km/h`;
  })
  .catch(error=>{
    console.error('Error',error);
    document.querySelector('.weather-icon').innerHTML = 'sync_problem'
    document.querySelector('.material-symbols-outlined').classList.add('animate');;

    alert(`"Please enter a city name."\n"도시 이름을 입력해 주세요."`);
  });
}

}



//weather box enter key event 
const weatherInputBox = document.querySelector('.weather-box');

weatherInputBox.addEventListener('keypress',weatherEnter);

function weatherEnter(event){
  //event.stopPropagation();
  console.log('weather Input Box Enter KeyPress')
  if(event.key ==='Enter'&&!event.shiftKey){
    if(weatherInput.value.trim()===''){
      alert('weather API 의 도시 이름을 영어로 입력해 주세요...');
    }else{
      weatherApiCreat();   
    }
  }
  
}