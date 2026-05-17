const apiKey = "a5d1109ea924711082ba56ce316686f3"

let submitBtn = document.getElementById("submitBtn")
let cityBox = document.getElementById("city")
let weatherInfo = document.getElementById("weatherInfo")
let status = document.getElementById("survivalStatus")

submitBtn.addEventListener("click", GetWeatherData);

async function GetWeatherData() {
    let zip = document.getElementById("inputZIP").value;
    let geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`
    );
    let geoData = await geoRes.json();
    let { lat, lon } = geoData;
    
    let weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    );
    let weatherData = await weatherRes.json();
    console.log(weatherData);
    cityBox.innerHTML = weatherData.name;
    weatherInfo.innerHTML = weatherData.main.temp;
    weatherInfo.innerHTML += " and ";
    weatherInfo.innerHTML += weatherData.weather[0].description;

    let temperature = weatherData.main.temp;
    let description = weatherData.weather[0].description;
    let message;

    if (temperature <= 32){
        message = "Freeze Imminent: Hypothermia risk high. Seek warmth immediately.";
    } else if (temperature > 32 && temperature < 59){
        message = "Cold Front: Thermal energy draining at increased rate. Equip thermal clothing.";
    } else if (temperature >= 60 && temperature < 84){
        message = "Optimal Conditions: Perfect time to forage.";
    } else if (temperature >= 85 && temperature < 95){
        message = "Uncomfortable Heat: Increased fluid consumption recommended.";
    } else if (temperature >= 95){
        message = "Scorched Earth: Hydration levels dropping at alarming rate. Seek shade immediately.";
    };

    console.log(status);
    status.innerHTML = message;
};