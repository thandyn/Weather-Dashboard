var lon = "";
var lat = "";
var historyStorage = JSON.parse(window.localStorage.getItem("city")) || [];

function renderWeatherEl(weatherDay) {
  document.getElementById("today").innerHTML = "";
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
      var weatherDay = data;
      console.log(weatherDay);
      renderWeatherEl(weatherDay);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function fetchForecast() {
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=33c71d61d3a49f346c192acaf4618f76&units=imperial`;

  fetch(forecastUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var forecastDay = data.list;
      console.log(forecastDay);
      renderForecastEl(forecastDay);
    })
    .catch(function (err) {
      console.log(err);
    });
}
document.querySelector("body").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target && e.target.matches(".history")) {
    console.log(e.target);
  }
});
document.getElementById("searchBtn").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("city-input").innerText = "";
  var cityInput = document.getElementById("city-input").value.trim();
  if (!cityInput) {
    return;
  }
  var locationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=33c71d61d3a49f346c192acaf4618f76`;

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
  var historyBtn = document.createElement("div");
  historyBtn.innerHTML = `<button class="history btn btn-secondary">${cityInput}</button>`;
  document.getElementById("break").append(historyBtn);
  console.log(historyStorage);

  if (!historyStorage.includes(cityInput)) {
    historyStorage.push(cityInput);
  }
  localStorage.setItem("city", JSON.stringify(historyStorage));
  document.getElementById("history").addEventListener("click", function (e) {
    console.log("historyBtn");
  });
});

function displayRecentCity(array) {
  var historyContainer = document.getElementById("recentcity");
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    var item = document.createElement("button");
    item.classList.add("list-group-item", "list-group-item-action", "history");
    item.textContent = array[index];
    historyContainer.append(item);
  }
}
displayRecentCity(historyStorage);
{
  /* <div class="list-group">
  <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
    The current button
  </button>
  <button type="button" class="list-group-item list-group-item-action">A second button item</button>
  <button type="button" class="list-group-item list-group-item-action">A third button item</button>
  <button type="button" class="list-group-item list-group-item-action">A fourth button item</button>
  <button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button>
</div> */
}
