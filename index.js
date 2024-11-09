

let myWeather=document.querySelector(".my_weather");
let searchWeather=document.querySelector(".search_weather");
let searchBox=document.querySelector(".search_box");
let place=document.querySelector(".place");
let weatherName=document.querySelector(".weather_name");
let temperatur=document.querySelector(".temperature");
let property1=document.querySelector(".property1");
let property2=document.querySelector(".property2");
let property3=document.querySelector(".property3");
let searchBar=document.querySelectorAll(".search_bar");
let search=document.querySelector(".search");
let searchLogo=document.querySelector(".searchlogo");
let show=document.querySelectorAll(".show");


function updateWeatherData(weatherMain,windSpeed,temp,city,cloudPercentage,humidity,country){
 
   weatherName.textContent=weatherMain;
 property1.textContent=windSpeed+"m/s";
 property2.textContent=humidity+"%";
 property3.textContent=cloudPercentage+"%";
 place.textContent=city;
 temperatur.textContent= (temp - 273).toFixed(2)+"°C";

 const flagUrl = `https://flagsapi.com/${country}/flat/64.png`
  const flagElement = document.querySelector(".flag");
  flagElement.src = flagUrl;

  const weatherImageElement = document.querySelector(".weather-image");
  const weatherImageUrl = getWeatherImageUrl(weatherMain);
  weatherImageElement.src = weatherImageUrl;



}


function getWeatherImageUrl(weatherMain) {
  const weatherImages = {
    "Sunny": ".",
    "Cloudy": "./images/cloudy.png",
    "Rainy": "./images/rainy.png",
    "Snowy": "./images/snowy.png",
    "Thunderstorm": "./images/thunderstorm.png",
    "Drizzle": "./images/drizzle.png",
    "Mist": "./images/mist.png",
    "Clear": "./images/clear.png",
    "Smoke":"./images/smoke.png",
    "Haze":"./images/haze.png",
  };

  return weatherImages[weatherMain] || sunny.png;

}







function WeatherData(data){

  let city=data.name;
  const country = data.sys.country; 
 let weather = data.weather[0];
    let weatherMain = weather.main;
 let windSpeed=data.wind.speed;
 let temp=data.main.temp;
let clouds = data.clouds;
let cloudPercentage = clouds.all;
let humidity=data.main.humidity;

 
updateWeatherData(weatherMain,windSpeed,temp,city,cloudPercentage,humidity,country);

}


async function getWeatherData(cityName) {
  let city=cityName;


   let BASE_URL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ca1c3992632fd76f72d4593d9bab28f2`;
  try {
    let response = await fetch(BASE_URL);
    let data = await response.json();
    WeatherData(data);

  } catch (e) {
    console.log("Error is", e);
  }
}




 async function getCurrentWeather(latitude,longitude){
  let lati=latitude;
  let longi=longitude;

 

let BASE_URL=`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=ca1c3992632fd76f72d4593d9bab28f2`
  try{
let response=await fetch(BASE_URL)
let data=await response.json();

WeatherData(data);

  }catch(e){
    console.log("Error is", e);

  }

}


// users postion

function showPosition(position) {    
getCurrentWeather(position.coords.latitude,position.coords.longitude)
}


// current users location

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}



searchWeather.addEventListener("click",()=>{
   searchBar.forEach((bar)=>{
    bar.classList.add("active");
   });
 
   search.classList.add("active");
   
 });



 myWeather.addEventListener("click",()=>{

getLocation();

  search.classList.remove("active");

  searchBar.forEach((bar)=>{
    bar.classList.remove("active");
  })

 });

  

searchLogo.addEventListener("click",()=>{
if(place!==""){
   let cityName=searchBox.value;
   searchBox.value="";
getWeatherData(cityName);

}
search.classList.remove("active");

searchBar.forEach((bar)=>{
  bar.classList.remove("active");
})



});

window.onload = getLocation;













