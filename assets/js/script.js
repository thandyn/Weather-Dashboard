var lon = "";
var lat = "";
// forloop
function renderForecastEl() {
  // for (var i = 0; i < city.length; i++) {
  // }
  var forecastEl = document.createElement("div");
  forecastEl.className = "card-body m-2 text-center";
  weatherEl.innerHTML = `
                <h5>date</h5>
                <img src="#" alt="weather-icon">
                <p>temp</p>
                <p>wind</p>
                <p>humidity</p>`;
  document.getElementById("forecast").appendChild(forecastEl);
}

function renderWeatherEl() {
  // for (var i = 0; i < city.length; i++) {
  // }
  var city = "";
  var img = "";
  var temp = "";
  var wind = "";
  var humidity = "";

  var weatherEl = document.createElement("div");
  weatherEl.className = "weathertoday";
  weatherEl.innerHTML = `
            <div class="card-body text-center">
              <h2>City</h2>
              <img src="#" alt="weather-icon">
              <p>temp</p>
              <p>wind</p>
              <p>humidity</p>
            </div>`;
  document.getElementById("today").appendChild(weatherEl);
}

function fetchWeather() {
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=33c71d61d3a49f346c192acaf4618f76`;

  fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      var days = data.list;
      console.log(days);
      renderWeatherEl();
      // add dom weather function
    })
    .catch(function (err) {
      console.log(err);
    });
}

function fetchForecast() {
  var forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=33c71d61d3a49f346c192acaf4618f76`;

  fetch(forecastUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      var days = data.list;
      console.log(days);
      renderForecastEl();
      // add dom forecast function
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
  var limit = 1;
  var locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=${limit}&appid=33c71d61d3a49f346c192acaf4618f76`;

  fetch(locationUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // console.log(data);
      lon = data[0].lon;
      lat = data[0].lat;
      // console.log(lon, lat);
      fetchForecast();
      fetchWeather();
    })
    .catch(function (err) {
      console.log(err);
    });
  // history for loop
});
