const apiKey = "a5d1109ea924711082ba56ce316686f3"

let submitBtn = document.getElementById("submitBtn")
let cityBox = document.getElementById("city")
let weatherInfo = document.getElementById("weatherInfo")

submitBtn.addEventListener("click", getWeatherData);

async function getWeatherData() {
    let zip = document.getElementById("inputZIP").value
    let geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`
    );
    let geoData = await geoRes.json();
    console.log(geoData)
    let { lat, lon } = geoData;
    
    let weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    );
    let weatherData = await weatherRes.json();
    console.log(weatherData);
};