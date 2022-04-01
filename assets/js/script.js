var inputFormEl = document.querySelector("#input-form");
var searchCityEl = document.querySelector("#searchCity");
var forecastContainerEl = document.querySelector("#forecast-container");
var forecast = document.querySelector("#forecast");


var formSubmitHandler = function(event) {
  event.preventDefault();
  
  // get value from input element
  var searchCity = searchCityEl.value.trim();
  
  if (searchCity) {
    getCityForecast(searchCity);

    // clear old content
    forecastContainerEl.textContent = "";
    searchCityEl.value = "";
  } else {
    alert("City Name");
  }
};

var getCityForecast = function(searchCity) {
  // format the open weather api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=9dea78eebfbe4a83335e9217f42409a6"
 
  // make a request to the url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
        displayForecast(data, searchCity);
  });
  } else {
    alert("Error: " + response.statusText);
  }
  })
  .catch(function(error) {
    alert("Unable to access dashboard");
  });
};

                // var getPastSearches = function(PastSearches) {
                //     // format the github api url
                //     //localStorageget
                
                //     // make a get request to url
                //     fetch(apiUrl).then(function(response) {
                //     // request was successful
                //     if (response.ok) {
                //         response.json().then(function(data) {
                //         (data.items, language);
                //         });
                //     } else {
                //         alert("Error: " + response.statusText);
                //     }
                //     });
                // };



var displayForecast = function(cityForecast, citySearchTerm) {
  // check if api returned the city entered
  if (cityForecast.length === 0) {
    forecastContainerEl.textContent = "There is no information available for that location.";
    return;
  }
  
  citySearch.textContent = citySearchTerm;

  // loop over cities
  for (var i = 0; i < cityForecast.length; i++) {
    // format fixt this
    var forecastLocation = cityForecast[i] + "/" + cityForecast[i].name;

    // create a container for the 5 day forecast 
    var citySearchEl = document.createElement("div");
    citySearchEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold forecast details
    var titleEl = document.createElement("span");
    titleEl.textContent = forecastLocation;

    // append to container
    citySearchEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current xxxxxxxxxxxxxxxxxxxxxxxxx
    if (cityForecast[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + citySearch[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    citySearchEl.appendChild(statusEl);

    // append container to the dom
    forecastContainerEl.appendChild(citySearchEl);
  }
};

// add event listeners to forms
inputFormEl.addEventListener("submit", formSubmitHandler);
