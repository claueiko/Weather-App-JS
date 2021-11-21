let now = new Date();
let h3 = document.querySelector("h3");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
h3.innerHTML = `${day}, ${hour}:${minute}`;

// Search City
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let city = `${searchInput.value}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
  info(city);
}
// Api info
function info(city) {
  let apiKey = "11d998cbbca6bedaa384d917305d3b9a";

  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(updateApp);
}
// Display all info
function updateApp(response) {
  let city = response.data.name;
  let cityUpdate = document.querySelector("h1");
  cityUpdate.innerHTML = `${city}`;
  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp-today");
  temperature.innerHTML = `${currentTemperature}°C`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let currentDescription = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${currentDescription}`;

  let highTemperature = Math.round(response.data.main.temp_max);
  let lowTemperature = Math.round(response.data.main.temp_min);
  let highLowDisplay = document.querySelector("#min-max");
  highLowDisplay.innerHTML = `Max - Min: ${highTemperature}°C / ${lowTemperature}°C`;

  let currentRealFeel = Math.round(response.data.main.feels_like);
  let realFeel = document.querySelector("#real-feel");
  realFeel.innerHTML = `Real Feel: ${currentRealFeel}°C`;

  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "11d998cbbca6bedaa384d917305d3b9a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateApp);
}

let geolocationButton = document.querySelector("#find");
geolocationButton.addEventListener("click", getCurrentLocation);

function changeCelcius(event) {
  let tempToday = document.querySelector("#temp-today");

  tempToday.innerHTML = `22°C`;
}

function changeFahr(event) {
  let tempToday = document.querySelector("#temp-today");
  tempToday.innerHTML = `66°F`;
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeCelcius);
let fahr = document.querySelector("#fahr");
fahr.addEventListener("click", changeFahr);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
