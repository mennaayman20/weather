let todayName=document.getElementById('today_name');
let todayNumber=document.getElementById('today_number');
let todayMonth=document.getElementById('today_month');

let todayLocation=document.getElementById('today_location');
let todayTemp=document.getElementById('today_temp');
let todayCondition_img=document.getElementById('today_condition_img');
let todayText=document.getElementById('today_condition_text');

let Humidity=document.getElementById('humidity');
let wind=document.getElementById('wind');
let windDirection=document.getElementById('wind_direction');


// next data

let nextDay=document.getElementsByClassName('next_day_name');
let nextMaxTemp=document.getElementsByClassName('next_max_temp');
let nextMinTemp=document.getElementsByClassName('next_min_temp');
let nextConditionImg=document.getElementsByClassName('next_condition_img');
let nextConditionText=document.getElementsByClassName('next_condition_text');

// search
let searchInput=document.getElementById('search');


let date =new Date()

// fetch

 async function getWeatherData(cityName){

    let weatherResponce= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=36ec19b8d9584a6692a134343242812&q=${cityName}&days=3`)
    
    let weatherData= await  weatherResponce.json()

   return weatherData;
}



//display today data


function displayTodayData(data)
{
let todayDate=new Date()
    todayName.innerHTML=todayDate.toLocaleDateString('en-US',{weekday:'long'})
    todayNumber.innerHTML=todayDate.getDate();
    todayMonth.innerHTML=todayDate.toLocaleDateString('en-US',{month:'long'})

    todayLocation.innerHTML=data.location.name;
    todayTemp.innerHTML=data.current.temp_c;
    todayText.innerHTML=data.current.condition.text;
    Humidity.innerHTML=data.current.wind_mph;
    wind.innerHTML=data.current.wind_kph+'km/h';
    windDirection.innerHTML=data.current.wind_dir;

     
}

function displayNextData(data){

let forecastData=data.forecast.forecastday
for(let i=0; i<2; i++){

    //error leeeeh hnaaa????
//let nextDate= new Date(forecastData[i+1].date)
//nextDay[i].innerHTML=nextDate.toLocaleDateString('en-US',{weekday:'long'})


    nextMaxTemp[i].innerHTML=forecastData[1+i].day.maxtemp_c
    nextMinTemp[i].innerHTML=forecastData[1+i].day.mintemp_c
    nextConditionText[i].innerHTML=forecastData[1+i].day.condition.text

}
}




// display next days data



// start application

async function startApp(city='bani-suef'){

    let weatherData= await getWeatherData(city);
   if(!weatherData.error){

     displayTodayData(weatherData);
     displayNextData(weatherData);
     
   }
    
}

startApp();

searchInput.addEventListener('input',function(){
   startApp(searchInput.value)
})