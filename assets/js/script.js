
var locationsSideEl = document.querySelector("#locations-side")
var inputLocationEl = document.querySelector("#input-form");
var searchLocationEl = document.querySelector("#search-location");
// prevous search history list
var previousSearchesContainerEl = document.querySelector(
  "#previous-searches-container"
);
var buttonEl = document.querySelector(".prev-btn");
var previousSearchHistoryEl = document.querySelector(
  "#previous-search-history"
);
// display current weather conditions
var currentDetailsEl = document.querySelector("#current-details");
var currentLocationEl = document.querySelector("#current-location");

var currentDateEl = document.querySelector("#date-current");
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
var dateEl = document.querySelector(".date");

// set up container for future forecast
var fiveDayContainerEl = document.querySelector("#five-day-container");

var loadPreviousSearches = function() {
  // create an array variable in which to store searched locations for later recall
  const previousSearches = JSON.parse(localStorage.previousSearches || "[]");
  previousSearchesContainerEl.innerHTML = "";

  for (var i = 0; i < previousSearches.length && i < 10; i++) {
    const previousSearchHistory = previousSearches[i];
    
    var buttonEl = document.createElement("button");
    buttonEl.classList = "prev-btn list-item text-uppercase";
    buttonEl.type = "submit";

    var previousSearchHistoryEl = document.createElement("span");
    previousSearchHistoryEl.innerHTML = previousSearchHistory;
  
    buttonEl.appendChild(previousSearchHistoryEl);
    previousSearchesContainerEl.appendChild(buttonEl);
    
    buttonEl.addEventListener("click", function() {
      // clear input field
      searchLocationEl.value = "";
      // need to work on correct coding to clear current and future forecast info on click to add new data without page refresh 
      var searchLocation = previousSearchHistory;
      getLocationForecast(searchLocation);
    });
  };
}; 

// function to handle previous search local storage
var previousSearchHandler = function(locationName) {

  var getPreviousSearches = JSON.parse(localStorage.getItem("previousSearches"));
    
  // if searchLocation is the same as a previous search, don't add to the array / limit length to locations
  if ((locationName !='') && getPreviousSearches && (getPreviousSearches.includes(locationName) === false)) {
      if (getPreviousSearches.length === 10) {
        getPreviousSearches.shift();
      }
      getPreviousSearches.push(locationName);
  
  // to initialize and enable creation of array if nothing in local storage
   } else if (!getPreviousSearches || !getPreviousSearches.length && locationName != Null) {
    getPreviousSearches = [];
    getPreviousSearches.push(locationName);
  }
  
  localStorage.setItem("previousSearches", JSON.stringify(getPreviousSearches));
 }

// function to enable input of location and sent to API function call (and store previous searches)
var inputRequestHandler = function (event) {
  event.preventDefault();
    
  // get value from input element (current/future forecast values need to be removed first)
  var searchLocation = searchLocationEl.value.trim();
   
  // if information has been entered into input field, proceed to retrieve data
  if (searchLocation) {
    getLocationForecast(searchLocation);

  // clear old content
    searchLocationEl.value = ""; 

    // if nothing entered, require input
  } else {
    alert("Please input a city name");
  }
};

loadPreviousSearches();

// function to call API
function getLocationForecast(searchLocation) {
  
  // first get the longitude and latitude required by the onecall API to retrieve acceptance criteria data
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +
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
          var oneCallApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
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
                displayFutureForecast(oneCallApiData.daily);
                
                // add location to array in location storage and create search history button
                previousSearchHandler(searchLocation);
                loadPreviousSearches();
              });
            }
          });
        });
      } else {
        // if no location by the name that was input
        alert("Error: that location is not in our database");
      }
    })
    .catch(function (error) {
      //catch network errors
      alert("Unable to access weather dashboard");
    });

  // display information retrieved from API call related to current conditions
  var displayCurrentForecast = function (currentForecastData) {
  
  // create container to hold list with list items representing weather conditions
  var currentWeatherEl = document.createElement("div");
  currentWeatherEl.className = "weather-now";
    
    // set current date for display in current section
    var currentDate = "(" + moment().format("MM/DD/YYYY") + ")";

    // create h3 elements to hold information
    var currentInfoEl = document.createElement("h3");
    currentInfoEl.innerHTML = searchLocation + ' ' + currentDate;

    // coding suggestions from Stack Overflow & Margaret W.N. & Beki & tutoring session
    var currentWeatherIcon = currentForecastData.weather[0].icon;
    var weatherImgEl = document.createElement("img");
    weatherImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + currentWeatherIcon + ".png");
    weatherImgEl.setAttribute("alt", "weather icon");
    var weatherIconEl = document.getElementById("weatherIcon");
    weatherIconEl.appendChild(weatherImgEl);

    // append location/date/icon to div h3 tags
    currentLocationEl.appendChild(currentInfoEl);
    // append h3 tag contents to div
    currentDetailsEl.appendChild(currentLocationEl);

    // create forecast display
    var currentTemp = currentForecastData.temp;
    var currentWind = currentForecastData.wind_speed;
    var currentHumidity = currentForecastData.humidity;
    var currentUVIndex = currentForecastData.uvi;
    currentUVIndex.className = 'uvreading';
   
    // create elements to hold each weather detail
    var currentContainerEl = document.createElement("div");
    currentContainerEl.className = "stats";

    // create each weather detail line
    var tempCurrentEl = document.createElement("p");
    tempCurrentEl.innerHTML =
      "<p class='temp'>Temp: " + currentTemp + " ??C</p>";
    var windCurrentEl = document.createElement("p");
    windCurrentEl.innerHTML =
      "<p class='wind'>Wind: " + currentWind + " KPH</p>";
    var humidityCurrentEl = document.createElement("p");
    humidityCurrentEl.innerHTML =
      "<p class='humidity'>Humidity: " + currentHumidity + "%</p>";
    var uviCurrentEl = document.createElement("p");
    uviCurrentEl.innerHTML =
    "<p class='uvi'> UV Index: " + currentUVIndex + "</p>";
      // getting the correct coding to set the uv index reading colour needs further attention
      // if (parseFloat(currentUVIndex) <=2) {
      //   currentUVIndex.ClassName = "uvreading favorable";
      // } else if (parseFloat(currentUVIndex) >= 3 && currentUVIndex <= 5) {
      //   currentUVIndex.ClassName = "uvreading moderate";
      // } else if (parseFloat(currentUVIndex) >=6 && currentUVIndex <= 8) {
      //   currentUVIndex.ClassName = "uvreading high";
      // } else if (parseFloat(currentUVIndex) > 10) {
      //   currentUVIndex.ClassName = "uvreading severe";
      // }; 
    
    // append all items to current weather display container
    tempEl.appendChild(tempCurrentEl);
    statisticsEl.appendChild(tempEl);
    windEl.appendChild(windCurrentEl);
    statisticsEl.appendChild(windEl);
    humidityEl.appendChild(humidityCurrentEl);
    statisticsEl.appendChild(humidityEl);
    uviEl.appendChild(uviCurrentEl);
    statisticsEl.appendChild(uviEl);
  };

  var displayFutureForecast = function (futureForecastData) {

    // display upcoming 5 day forecast - this sets up the divs for each day's forecast information
    // fix for loop coding in 'weather back-up-1.js' file to replace below coding
   
    var dayOneEl = document.querySelector("#day1");
    var dayTwoEl = document.querySelector("#day2");
    var dayThreeEl = document.querySelector("#day3");
    var dayFourEl = document.querySelector("#day4");
    var dayFiveEl = document.querySelector("#day5");
    
    var forecastDateOne = moment.unix(futureForecastData[0].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastIconOne = futureForecastData[0].weather[0].icon;
    var forecastTempOne = futureForecastData[0].temp.day;
    var forecastWindOne = futureForecastData[0].wind_speed;
    var forecastHumidityOne = futureForecastData[0].humidity;
    
    var forecastDateTwo = moment.unix(futureForecastData[1].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastIconTwo = futureForecastData[1].weather[0].icon;
    var forecastTempTwo = futureForecastData[1].temp.day;
    var forecastWindTwo = futureForecastData[1].wind_speed;
    var forecastHumidityTwo = futureForecastData[1].humidity;
    
    var forecastDateThree = moment.unix(futureForecastData[2].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastIconThree = futureForecastData[2].weather[0].icon;    
    var forecastTempThree = futureForecastData[2].temp.day;
    var forecastWindThree = futureForecastData[2].wind_speed;
    var forecastHumidityThree = futureForecastData[2].humidity;
    
    var forecastDateFour = moment.unix(futureForecastData[3].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastIconFour = futureForecastData[3].weather[0].icon;    
    var forecastTempFour = futureForecastData[3].temp.day;
    var forecastWindFour = futureForecastData[3].wind_speed;
    var forecastHumidityFour = futureForecastData[3].humidity;
    
    var forecastDateFive = moment.unix(futureForecastData[4].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastIconFive = futureForecastData[4].weather[0].icon;
    var forecastTempFive = futureForecastData[4].temp.day;
    var forecastWindFive = futureForecastData[4].wind_speed;
    var forecastHumidityFive = futureForecastData[4].humidity;
    
    // set up 1st of 5
    var dateOneEl = document.querySelector("#date1");
    var iconDayOneEl = document.querySelector("#icon-future-1");
    var iconOneEl = document.querySelector("#icon1")
    var tempOneEl = document.querySelector("#temp1");
    var windOneEl = document.querySelector("#wind1");
    var humidityOneEl = document.querySelector("#humidity1");

    var dateDayOneEl = document.createElement("p");
    dateDayOneEl.innerText = forecastDateOne;
    var iconDayOneImgEl = document.createElement("img");
    iconDayOneImgEl.setAttribute("src", "https://openweathermap.org/img/wn/"+forecastIconOne+".png");
    iconDayOneImgEl.setAttribute("alt", "weather icon");
    iconOneEl = document.getElementById("icon1");
    var tempDayOneEl = document.createElement("p");
    tempDayOneEl.innerText = "Temp: " + forecastTempOne + " ??C";
    var windDayOneEl = document.createElement("p");
    windDayOneEl.innerText = "Wind: " + forecastWindOne + " KPH";
    var humidityDayOneEl = document.createElement("p");
    humidityDayOneEl.innerText = "Humidity: " + forecastHumidityOne + " %";

    dateOneEl.appendChild(dateDayOneEl);
    dayOneEl.appendChild(dateOneEl);
    iconOneEl.appendChild(iconDayOneImgEl);
    iconDayOneEl.appendChild(iconOneEl);
    dayOneEl.appendChild(iconDayOneEl);
    tempOneEl.appendChild(tempDayOneEl);
    dayOneEl.appendChild(tempOneEl);
    windOneEl.appendChild(windDayOneEl);
    dayOneEl.appendChild(windOneEl);
    humidityOneEl.appendChild(humidityDayOneEl);
    dayOneEl.appendChild(humidityOneEl);
    fiveDayContainerEl.appendChild(dayOneEl);

    // set up 2nd of 5
    var dateTwoEl = document.querySelector("#date2");
    var iconDayTwoEl = document.querySelector("#icon-future-2");
    var iconTwoEl = document.querySelector("#icon2");
    var tempTwoEl = document.querySelector("#temp2");
    var windTwoEl = document.querySelector("#wind2");
    var humidityTwoEl = document.querySelector("#humidity2");

    var dateDayTwoEl = document.createElement("p");
    dateDayTwoEl.innerText = forecastDateTwo;
    var iconDayTwoImgEl = document.createElement("img");
    iconDayTwoImgEl.setAttribute("src", "https://openweathermap.org/img/wn/"+forecastIconTwo+".png");
    iconDayTwoImgEl.setAttribute("alt", "weather icon");
    iconTwoEl = document.getElementById("icon2");
    var tempDayTwoEl = document.createElement("p");
    tempDayTwoEl.innerText = "Temp: " + forecastTempTwo + " ??C";
    var windDayTwoEl = document.createElement("p");
    windDayTwoEl.innerText = "Wind: " + forecastWindTwo + " KPH";
    var humidityDayTwoEl = document.createElement("p");
    humidityDayTwoEl.innerText = "Humidity: " + forecastHumidityTwo + " %";

    dateTwoEl.appendChild(dateDayTwoEl);
    dayTwoEl.appendChild(dateTwoEl);
    iconTwoEl.appendChild(iconDayTwoImgEl);
    iconDayTwoEl.appendChild(iconTwoEl);
    dayTwoEl.appendChild(iconDayTwoEl);
    tempTwoEl.appendChild(tempDayTwoEl);
    dayTwoEl.appendChild(tempTwoEl);
    windTwoEl.appendChild(windDayTwoEl);
    dayTwoEl.appendChild(windTwoEl);
    humidityTwoEl.appendChild(humidityDayTwoEl);
    dayTwoEl.appendChild(humidityTwoEl);
    fiveDayContainerEl.appendChild(dayTwoEl);

    // set up 3rd of 5
    var dateThreeEl = document.querySelector("#date3");
    var iconDayThreeEl = document.querySelector("#icon-future-3");
    var iconThreeEl = document.querySelector("#icon3");
    var tempThreeEl = document.querySelector("#temp3");
    var windThreeEl = document.querySelector("#wind3");
    var humidityThreeEl = document.querySelector("#humidity3");

    var dateDayThreeEl = document.createElement("p");
    dateDayThreeEl.innerText = forecastDateThree;
    var iconDayThreeImgEl = document.createElement("img");
    iconDayThreeImgEl.setAttribute("src", "https://openweathermap.org/img/wn/"+forecastIconThree+".png");
    iconDayThreeImgEl.setAttribute("alt", "weather icon");
    iconThreeEl = document.getElementById("icon3");
    var tempDayThreeEl = document.createElement("p");
    tempDayThreeEl.innerText = "Temp: " + forecastTempThree + " ??C";
    var windDayThreeEl = document.createElement("p");
    windDayThreeEl.innerText = "Wind: " + forecastWindThree + " KPH";
    var humidityDayThreeEl = document.createElement("p");
    humidityDayThreeEl.innerText = "Humidity: " + forecastHumidityThree + " %";

    dateThreeEl.appendChild(dateDayThreeEl);
    dayThreeEl.appendChild(dateThreeEl);
    iconThreeEl.appendChild(iconDayThreeImgEl);
    iconDayThreeEl.appendChild(iconThreeEl);
    dayThreeEl.appendChild(iconDayThreeEl);
    tempThreeEl.appendChild(tempDayThreeEl);
    dayThreeEl.appendChild(tempThreeEl);
    windThreeEl.appendChild(windDayThreeEl);
    dayThreeEl.appendChild(windThreeEl);
    humidityThreeEl.appendChild(humidityDayThreeEl);
    dayThreeEl.appendChild(humidityThreeEl);
    fiveDayContainerEl.appendChild(dayThreeEl);

    // set up 4th of 5
    var dateFourEl = document.querySelector("#date4");
    var iconDayFourEl = document.querySelector("#icon-future-4");
    var iconFourEl = document.querySelector("#icon4");
    var tempFourEl = document.querySelector("#temp4");
    var windFourEl = document.querySelector("#wind4");
    var humidityFourEl = document.querySelector("#humidity4");

    var dateDayFourEl = document.createElement("p");
    dateDayFourEl.innerText = forecastDateFour;
    var iconDayFourImgEl = document.createElement("img");
    iconDayFourImgEl.setAttribute("src", "https://openweathermap.org/img/wn/"+forecastIconFour+".png");
    iconDayFourImgEl.setAttribute("alt", "weather icon");
    iconFourEl = document.getElementById("icon4");
    var tempDayFourEl = document.createElement("p");
    tempDayFourEl.innerText = "Temp: " + forecastTempFour + " ??C";
    var windDayFourEl = document.createElement("p");
    windDayFourEl.innerText = "Wind: " + forecastWindFour + " KPH";
    var humidityDayFourEl = document.createElement("p");
    humidityDayFourEl.innerText = "Humidity: " + forecastHumidityFour + " %";

    dateFourEl.appendChild(dateDayFourEl);
    dayFourEl.appendChild(dateFourEl);
    iconFourEl.appendChild(iconDayFourImgEl);
    iconDayFourEl.appendChild(iconFourEl);
    dayFourEl.appendChild(iconDayFourEl);
    tempFourEl.appendChild(tempDayFourEl);
    dayFourEl.appendChild(tempFourEl);
    windFourEl.appendChild(windDayFourEl);
    dayFourEl.appendChild(windFourEl);
    humidityFourEl.appendChild(humidityDayFourEl);
    dayFourEl.appendChild(humidityFourEl);
    fiveDayContainerEl.appendChild(dayFourEl);

    // set up 5th of 5
    var dateFiveEl = document.querySelector("#date5");
    var iconDayFiveEl = document.querySelector("#icon-future-5");
    var iconFiveEl = document.querySelector("#icon5");
    var tempFiveEl = document.querySelector("#temp5");
    var windFiveEl = document.querySelector("#wind5");
    var humidityFiveEl = document.querySelector("#humidity5");

    var dateDayFiveEl = document.createElement("p");
    dateDayFiveEl.innerText = forecastDateFive;
    var iconDayFiveImgEl = document.createElement("img");
    iconDayFiveImgEl.setAttribute("src", "https://openweathermap.org/img/wn/"+forecastIconFive+".png");
    iconDayFiveImgEl.setAttribute("alt", "weather icon");
    iconFiveEl = document.getElementById("icon5");
    var tempDayFiveEl = document.createElement("p");
    tempDayFiveEl.innerText = "Temp: " + forecastTempFive + " ??C";
    var windDayFiveEl = document.createElement("p");
    windDayFiveEl.innerText = "Wind: " + forecastWindFive + " KPH";
    var humidityDayFiveEl = document.createElement("p");
    humidityDayFiveEl.innerText = "Humidity: " + forecastHumidityFive + " %";

    dateFiveEl.appendChild(dateDayFiveEl);
    dayFiveEl.appendChild(dateFiveEl);
    iconFiveEl.appendChild(iconDayFiveImgEl);
    iconDayFiveEl.appendChild(iconFiveEl);
    dayFiveEl.appendChild(iconDayFiveEl);
    tempFiveEl.appendChild(tempDayFiveEl);
    dayFiveEl.appendChild(tempFiveEl);
    windFiveEl.appendChild(windDayFiveEl);
    dayFiveEl.appendChild(windFiveEl);
    humidityFiveEl.appendChild(humidityDayFiveEl);
    dayFiveEl.appendChild(humidityFiveEl);
    fiveDayContainerEl.appendChild(dayFiveEl);
    
  };

};


// add event listener to location input
inputLocationEl.addEventListener("submit", inputRequestHandler);
// need to add function(?) to clear current and future containers when search or previous search buttons are clicked