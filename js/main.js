//currentDay
let currentDay = document.getElementById('currentDay');
let currentMonth = document.getElementById('currentMonth');
let currentLocation = document.getElementById('currentLocation');
let currentTemp = document.getElementById('currentTemp');
let currentTempImage = document.getElementById('currentTempImage');
let currentTempCondition = document.getElementById('currentTempCondition');
let currentRain = document.getElementById('currentRain');
let currentWindSpeed = document.getElementById('currentWindSpeed');
let currentDirection = document.getElementById('currentDirection');

//search
let cityName = document.getElementById('cityName');


//nextDay
let nextDay = document.getElementsByClassName('nextDay');
let nextTempImage = document.getElementsByClassName('nextTempImage');
let nextMaxTemp = document.getElementsByClassName('nextMaxTemp');
let nextMinTemp = document.getElementsByClassName('nextMinTemp');
let nextTempCondition = document.getElementsByClassName('nextTempCondition');


async function getWeatherData(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=02b830efb1f242afa4e154348232808&q=${city}&days=3`);
    let finalResult = await response.json();
    return finalResult;
}

function displayWeatherData(data) {
    currentLocation.innerHTML = data.location.name;
    currentTemp.innerHTML = data.current.temp_c+'<span>&deg;C</span>';
    currentTempImage.setAttribute('src', data.current.condition.icon);
    currentTempCondition.innerHTML = data.current.condition.text;
    currentRain.innerHTML = data.current.humidity+'%';
    currentWindSpeed.innerHTML = data.current.wind_kph+'km/h';
    currentDirection.innerHTML = data.current.wind_dir;
    let currentDate = new Date(data.forecast.forecastday[0].date);
    currentDay.innerHTML = currentDate.toLocaleDateString('en-US', {weekday: "long"});
    currentMonth.innerHTML = currentDate.getDate()+`<span>${currentDate.toLocaleDateString('en-US', {month: "long"})}</span>`;
    // console.log(currentDate.getDate());
    // console.log(currentDate.toLocaleDateString('en-US', {weekday: "long"}));
    // console.log(currentDate.toLocaleDateString('en-US', {month: "long"}));
    for (let i = 0; i < 2; i++) {
        nextTempImage[i].setAttribute('src', data.forecast.forecastday[i+1].day.condition.icon);
        nextMaxTemp[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c+'<span>&deg;C</span>';
        nextMinTemp[i].innerHTML = data.forecast.forecastday[i+1].day.mintemp_c+'<span>&deg;C</span>';
        nextTempCondition[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text;
        let nextDayAPI = new Date(data.forecast.forecastday[i+1].date);
        nextDay[i].innerHTML = nextDayAPI.toLocaleDateString('en-US', {weekday: "long"});
    }
}

async function startApp(city = 'cairo') {
    let weatherData = await getWeatherData(city);
    if (!weatherData.error) {
        displayWeatherData(weatherData);
    }
}

startApp();

cityName.addEventListener('input', function() {
    startApp(cityName.value);
});

