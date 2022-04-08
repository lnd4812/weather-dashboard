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
var historyButtonsEl = document.querySelector("#history");
var currentContainerEl = document.querySelector("#current-container");
var locationCurrentEl = document.querySelector("#location-current");
var dateCurrentEl = document.querySelector("#date-current");
var futureContainerEl = document.querySelector("#future-container");

// create function to fetch required data from API (click event to search, fetch from APL and function to display information requested)

// function to enable input of location and sent to API function call (and store previous searches)
var inputRequestHandler = function(event) {
  event.preventDefault();

  // get value from input element
  var searchLocation = searchLocationEl.value.trim();

    // create an array variable in which to store searched locations for later recall
    const previousSearches = JSON.parse(localStorage.previousSearches || "[]");
    // save locations in local storage in an array for future callback
    previousSearches.push(searchLocation);
    localStorage.setItem("previousSearches", JSON.stringify(previousSearches));

  // if information has been entered into input field, proceed to retrieve data
  if (searchLocation) {
    getLocationForecast(searchLocation);
    
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
           
            var currentPartEl = document.createElement("div");
            currentPartEl.className = "current-part";

            // set current date for display in current section 
            var locationCurrent = searchLocation;
            console.log(locationCurrent);
            
            var dateCurrent = "(" + moment().format("MM/DD/YYYY") + ")";
            console.log(dateCurrent);

            // create h2 elements to hold information
            var currentInfoEl = document.createElement("h2");  
            currentInfoEl.innerHTML = "<h2 class='current-location text-uppercase'>" + locationCurrent + ", " + dateCurrent + "</h2>";
            
            currentPartEl.appendChild(currentInfoEl);
            currentContainerEl.appendChild(currentPartEl);


                        
             
              response.json().then(function (oneCallApiData) {
              // console.log(oneCallApiData);
                // call functions to display the current and future forecasts
                displayCurrentForecast(oneCallApiData.current);
                // displayFiveDayForecast(oneCallApiData.daily);  
                              
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
 };



// display information retrieved from API call related to current
var displayCurrentForecast = function (currentForecastData) {  
// 
var currentTemp = currentForecastData.temp; 
var currentWind = currentForecastData.wind_speed;
var currentHumidity = currentForecastData.humidity;
var currentUVIndex = currentForecastData.uvi;
console.log(currentTemp, currentWind, currentHumidity, currentUVIndex);
}




var displayFiveDayForecast = function(futureForecastData) {
console.log(futureForecastData)
// // for (var i = 0; i < futureForecastData.length; i++) {
// //   var futureForecast = futureForecastData[i].
// // }

}

// add event listeners to forms
inputLocationEl.addEventListener("submit", inputRequestHandler);
