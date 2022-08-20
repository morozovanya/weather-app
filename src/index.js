//feature1
function formatDate(date) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let weekday = days[now.getDay()];
  return `${weekday} ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return forecastDays[day];
}

let date = document.querySelector("#date");
let now = new Date();
date.innerHTML = formatDate(now);

function cityDate(timestamp) {
  let date = new Date(timestamp);
  let actualday = days[date.getDay()];
  let actualhours = date.getHours();
  let actualminutes = date.getMinutes();
  return `${actualday} ${actualhours}:${actualminutes}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastItem = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDays, index) {
    if (index < 6) {
    forecastHTML =
      forecastHTML + `
  <div class="col-2">
  <p id="day1">${formatDay(forecastDays.dt)}</p>
  <img src="http://openweathermap.org/img/wn/${forecastDays.weather[0].icon}@2x.png" alt="" width="42" id=emoji1/>
  <br/>
  <span class="temperature-max">${Math.round(forecastDays.temp.max)}º</span>
  <span class="temperature-min">${Math.round(forecastDays.temp.min)}º</span>
  </div>`;
      }
  });
  
  forecastHTML = forecastHTML + `</div>`;
  forecastItem.innerHTML = forecastHTML;
  
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "670149a988417f0bd9de2e4879ba6c8b";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function responseRealTemp(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let temperatureReal = document.querySelector("h1");
  let requestedCity = document.querySelector("#location");
  let changeMainEmoji = document.querySelector("#main-emoji");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");

  temperatureReal.innerHTML = `${cityTemp}`;
  requestedCity.innerHTML = response.data.name;
  changeMainEmoji.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  celsiusTemperature = response.data.main.temp;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;

  getForecast(response.data.coord);
}



function search(city) {
  let apiKey = "670149a988417f0bd9de2e4879ba6c8b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(responseRealTemp);

}

//feature2
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#field").value;
  search(city);
}





function localise() {
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(location) {
  let latitude = location.coords.latitude;
  let longitude = location.coords.longitude;
  let apiKey = "670149a988417f0bd9de2e4879ba6c8b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);
}
}

function showTemperature(response) {
    let cityLocal = response.data.name;
    let changeCityToLocal = document.querySelector("#location");
    changeCityToLocal.innerHTML = `${cityLocal}`;
    let temperatureLocal = Math.round(response.data.main.temp);
    let changeTemperature = document.querySelector("h1");
  changeTemperature.innerHTML = `${temperatureLocal}`;
  let changeMainEmoji = document.querySelector("#main-emoji");
  changeMainEmoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  getForecast(response.data.coord);

}

let buttonaction = document.querySelector("button");
buttonaction.addEventListener("click", localise);
  

let searchcity = document.querySelector("#search-form");
searchcity.addEventListener("submit", handleSubmit);


search("Kyiv");




