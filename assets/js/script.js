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
  e.preventDefault();
  var cityInput = document.getElementById("city-input").value.trim();
  if (!cityInput) {
    return;
  }
  var limit = 5;
  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=${limit}&appid=33c71d61d3a49f346c192acaf4618f76`;

  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
});
