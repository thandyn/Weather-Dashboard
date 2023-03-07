// function appendToHistory(search) {
//   // If there is no search term return the function
//   if (searchHistory.indexOf(search) !== -1) {
//     return;
//   }
//   searchHistory.push(search);
// };

//   localStorage.setItem('search-history', JSON.stringify(searchHistory));
//   renderSearchHistory();

document.getElementById("searchBtn").addEventListener("click", function (e) {
  var cityInput = document.getElementById("city-input").value;
  e.preventDefault();
  if (!cityInput.value) {
    return;
  }

  var city = cityInput.value.trim();
  var limit = 5;
  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=33c71d61d3a49f346c192acaf4618f76`;

  fetch(requestUrl).then(function (res) {
    return res.json();
  });
  then(function (data) {
    console.log(data);
  });
});
