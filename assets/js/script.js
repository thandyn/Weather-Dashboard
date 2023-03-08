var lon = "";
var lat = "";

function renderWeatherEl(weatherDay) {
  document.getElementById("today").innerHTML = "";
  console.log(weatherDay);
  var city = weatherDay.name;
  var img = weatherDay.weather[0].icon;
  var temp = weatherDay.main.temp;
  var wind = weatherDay.wind.speed;
  var humidity = weatherDay.main.humidity;

  var weatherEl = document.createElement("div");
  weatherEl.className = "weathertoday";
  weatherEl.innerHTML = `
    <div class="card-body text-center">
    <h2>${city}</h2>
    <img src="https://openweathermap.org/img/wn/${img}@2x.png" alt="weather-icon">
    <p>Temp:${temp}</p>
    <p>Wind:${wind}</p>
    <p>Humidity:${humidity}</p>
    </div>`;
  document.getElementById("today").appendChild(weatherEl);
}

function renderForecastEl(forecastDay) {
  document.getElementById("forecast").innerHTML = "";
  console.log(forecastDay);
  for (var i = 0; i < forecastDay.length; i += 8) {
    var date = forecastDay[i].dt_txt;
    var img = forecastDay[i].weather[0].icon;
    var temp = forecastDay[i].main.temp;
    var wind = forecastDay[i].wind.speed;
    var humidity = forecastDay[i].main.humidity;
    var forecastEl = document.createElement("div");
    forecastEl.className = "card-body m-2 text-center";
    forecastEl.innerHTML = `
      <h5>${date}</h5>
      <img src="https://openweathermap.org/img/wn/${img}@2x.png" alt="weather-icon">
      <p>Temp:${temp}</p>
      <p>Wind:${wind}</p>
      <p>Humidity:${humidity}</p>`;
    document.getElementById("forecast").appendChild(forecastEl);
  }
}

function fetchWeather() {
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=33c71d61d3a49f346c192acaf4618f76&units=imperial`;

  fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      var weatherDay = data;
      console.log(weatherDay);
      renderWeatherEl(weatherDay);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function fetchForecast() {
  var forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=33c71d61d3a49f346c192acaf4618f76&units=imperial`;

  fetch(forecastUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      var forecastDay = data.list;
      console.log(forecastDay);
      renderForecastEl(forecastDay);
    })
    .catch(function (err) {
      console.log(err);
    });
}

document.getElementById("searchBtn").addEventListener("click", function (e) {
  e.preventDefault();
  var cityInput = document.getElementById("city-input").value.trim();
  if (!cityInput) {
    return;
  }
  var locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=33c71d61d3a49f346c192acaf4618f76`;

  fetch(locationUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      lon = data[0].lon;
      lat = data[0].lat;
      fetchForecast();
      fetchWeather();
    })
    .catch(function (err) {
      console.log(err);
    });
  // history for loop
});
