// functions required to meet acceptance criteria
//    
//                   when button for one of the previous searches is clicked, current/future forecast as of that point in time comes up
//    function to display current weather for the searchCity
//        display -> city name, date, icon representing weather conditions, humidity, windspeed and UV index
//                   the UV index should assume class of favourable, moderate or severe
//    function to display next 5 days weather for that city
//        display -> future forecast comprised of 5 list items distributed horizonally in a flex-row
//                   each item should display an icon reflecting current conditions, temperature, windspeed and humidity
var inputLocationEl = document.querySelector("#input-form");
var searchLocationEl = document.querySelector("#search-location");
// prevous search history list
var previousSearchesContainerEl = document.querySelector("#previous-searches-container")
var buttonEl = document.querySelector(".prev-btn");
var previousSearchHistoryEl = document.querySelector("#previous-search-history");
var searchedPreviouslyEl = document.querySelector("#searched-previously");
// display current weather conditions
var currentDetailsEl = document.querySelector("#current-details");
var currentLocationEl = document.querySelector("#current-location")
var locationCurrentEl = document.querySelector("#location-current");
var dateCurrentEl = document.querySelector("#date-current");
var currentContainerEl = document.querySelector("#current-container");
var statisticsEl = document.querySelector("#statistics");
var tempCurrentEl = document.querySelector("#temp-current");
var tempEl = document.querySelector("#temp");
var windCurrentEl = document.querySelector("#wind-current");
var windEl = document.querySelector("#wind");
var humidityCurrentEl = document.querySelector("#humidity-current");
var humidityEl = document.querySelector("#humidity");
var uviCurrentEl = document.querySelector("#uvi-current");
var uviEl = document.querySelector("#uvi");
var weatherIconEl = document.querySelector(".weather-icon");
// display upcoming 5 day forecast
var futureContainerEl = document.querySelector("#future-container");

// create function to fetch required data from API (click event to search, fetch from APL and function to display information requested)

// function to enable input of location and sent to API function call (and store previous searches)
var inputRequestHandler = function(event) {
  event.preventDefault();
  // get value from input element
  var searchLocation = searchLocationEl.value.trim();
    

    // create an array variable in which to store searched locations for later recall
    const previousSearches = JSON.parse(localStorage.previousSearches || "[]");
    // clear the array (will need to fix this so that there are no duplicates and it only resets for initial run)
    // if (previousSearches.length > 10) {
    //   return;
    // } else {
    
    // if searchLocation is blank or is the same as a previous seach, don't add to the array...
    previousSearches.push(searchLocation);
    localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
    console.log(previousSearches);   
  
    // if information has been entered into input field, proceed to retrieve data
      if (searchLocation) {
        getLocationForecast(searchLocation);
      
        // add search location to previous searches buttons to max 10 
        for(var i = 0; i < previousSearches.length && i < 10; i++) {
        var previousSearchHistory = previousSearches[i];
        console.log(previousSearchHistory)
    
        var buttonEl = document.createElement("button");
        // need to create event handler for this button
        buttonEl.classList = "prev-btn list-item text-uppercase";
        buttonEl.type = "submit";
      
        var previousSearchHistoryEl = document.createElement("span");
        previousSearchHistoryEl.innerHTML = previousSearchHistory;

        buttonEl.appendChild(previousSearchHistoryEl);
        previousSearchesContainerEl.appendChild(buttonEl);
        }  
      // if nothing entered, require input
      } else {
        alert("Please input a city name");
      }
   
  };     
// function to call API
var getLocationForecast = function (searchLocation) {
  // first get the longitude and latitude required by the onecall API to retrieve acceptance criteria data
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchLocation +
    "&appid=dd67d89c4ca8c93446f0946598c5ffce&units=metric";

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          // create variables for latitude and longitude to apply to the onecall API
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          var oneCallApiUrl =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lon +
            "&appid=dd67d89c4ca8c93446f0946598c5ffce&units=metric";
          // retrieve the onecall data sets
          fetch(oneCallApiUrl).then(function (response) {
            if (response.ok) {
             
            // add Location and Date for current weather display
           
            response.json().then(function (oneCallApiData) {
            console.log(oneCallApiData);
              // call functions to display the current and future forecasts
              displayCurrentForecast(oneCallApiData.current);
              displayFiveDayForecast(oneCallApiData.daily);  
              });
            }
          });
        });
      } else {
        // if no location by the name that was input
        alert("Error: that location is not in our database");
      }
    })
    .catch(function (error) { //catch network errors
      alert("Unable to access weather dashboard");
    });


// display information retrieved from API call related to current conditions
var displayCurrentForecast = function (currentForecastData) {  
// 
var currentPartEl = document.createElement("div");
currentPartEl.className = "current-part";

// set current date for display in current section 
var locationCurrent = searchLocation;
console.log(locationCurrent);

var dateCurrent = "(" + moment().format("MM/DD/YYYY") + ")";
console.log(dateCurrent);


// var weatherIcon.innerHTML = (img src="http://openweathermap.org/img/wn/" + currentForecastData.icon + "@2x.png"); 

// create h2 elements to hold information
var currentInfoEl = document.createElement("h3");  
currentInfoEl.innerHTML = "<h3 class='current-location text-uppercase'>" + locationCurrent + " " + dateCurrent +"</h3>";

// append location/date/icon to div h3 tags
currentLocationEl.appendChild(currentInfoEl);
// append h3 tag contents to div
currentDetailsEl.appendChild(currentLocationEl);
             
var currentTemp = currentForecastData.temp; 
var currentWind = currentForecastData.wind_speed;
var currentHumidity = currentForecastData.humidity;
var currentUVIndex = currentForecastData.uvi;
console.log(currentTemp, currentWind, currentHumidity, currentUVIndex);


// create elements to hold each weather detail
var currentContainerEl = document.createElement("div");
currentContainerEl.className = "stats";

// create each weather detail line
var tempCurrentEl = document.createElement("p");
tempCurrentEl.innerHTML = "<p class='temp'>Temp: " + currentTemp + " °C</p>";
var windCurrentEl = document.createElement("p");
windCurrentEl.innerHTML = "<p class='wind'>Wind: " + currentWind + " KPH</p>";
var humidityCurrentEl = document.createElement("p");
humidityCurrentEl.innerHTML = "<p class=humidity'>Humidity: " + currentHumidity + "%</p>";
var uviCurrentEl = document.createElement("p");
uviCurrentEl.innerHTML = "<p class=uvi'> UV Index: " + currentUVIndex + "</p>";

tempEl.appendChild(tempCurrentEl);
statisticsEl.appendChild(tempEl);
windEl.appendChild(windCurrentEl);
statisticsEl.appendChild(windEl);
humidityEl.appendChild(humidityCurrentEl);
statisticsEl.appendChild(humidityEl);
uviEl.appendChild(uviCurrentEl);
statisticsEl.appendChild(uviEl);
}

var displayFiveDayForecast = function(futureForecastData) {
console.log(futureForecastData)

const futureForecast = JSON.parse(localStorage.futureForecastData.daily || "[]");
    // clear the array (will need to fix this so that there are no duplicates and it only resets for initial run)
    // if (previousSearches.length > 10) {
    //   return;
    // } else {
    // // save locations in local storage in an array for future callback
    // create elements to hold each weather detail
var dailyContainerEl = document.createElement("div");
dailyContainerEl.className = "future-list-item";

for (var i = 0; i < futureForecast.length && i < 5; i++);

// create each weather detail line
var dateFutureEl = document.createElement("h3");
dateFutureEl.innerHTML = "(" + moment().add([i]+1,'d').format("MM/DD/YYYY") + ")";
console.log(dateFutureEl);
// // need to add weather icon here
// var tempFutureEl = document.createElement("p");
// tempFutureEl.innerHTML = "<p class='temp'>Temp: " + futureTemp[i] + " °C</p>";
// var windFutureEl = document.createElement("p");
// windFutureEl.innerHTML = "<p class='wind'>Wind: " + futureWind[i] + " KPH</p>";
// var humidityFutureEl = document.createElement("p");
// humidityFutureEl.innerHTML = "<p class=humidity'>Humidity: " + futureHumidity[i] + "%</p>";


// tempEl.appendChild(tempFutureEl);
// statisticsEl.appendChild(tempEl);
// windEl.appendChild(windFutureEl);
// statisticsEl.appendChild(windEl);
// humidityEl.appendChild(humidityFutureEl);
// statisticsEl.appendChild(humidityEl);

        

// for (var i = 0; i < futureForecastData.length; i++) {
// //   var futureForecast = futureForecastData[i].

// }
};
}

// add event listeners to forms
inputLocationEl.addEventListener("submit", inputRequestHandler);
