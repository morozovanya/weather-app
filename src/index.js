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

let date = document.querySelector("#date");
let now = new Date();
date.innerHTML = formatDate(now);

function responseRealTemp(response) {
  console.log(response);
  let cityTemp = Math.round(response.data.main.temp);
  let temperatureReal = document.querySelector("h1");
  temperatureReal.innerHTML = `${cityTemp}`;
  let requestedCity = document.querySelector("#location");
  requestedCity.innerHTML = response.data.name;
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


//feature3
function convertToCelsium(event) {
  event.preventDefault();
  let celsiumDegree = document.querySelector("h1");
  celsiumDegree.innerHTML = `${cityTemp}`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitDegree = document.querySelector("h1");
  fahrenheitDegree.innerHTML = 64;
}

let temperatureCelsium = document.querySelector("#celsius");
temperatureCelsium.addEventListener("click", convertToCelsium);

let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", convertToFahrenheit);


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

}

let buttonaction = document.querySelector("button");
buttonaction.addEventListener("click", localise);
  


let searchcity = document.querySelector("#search-form");
searchcity.addEventListener("submit", handleSubmit);

search("Kyiv");


