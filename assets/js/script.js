// functions required to meet acceptance criteria
//
//                   when button for one of the previous searches is clicked, current/future forecast as of that point in time comes up
//    function to display current weather for the searchCity
//        display -> city name, date, icon representing weather conditions, humidity, windspeed and UV index
//                   the UV index should assume class of favourable, moderate or severe
//    function to display next 5 days weather for that city
//        display -> future forecast comprised of 5 list items distributed horizonally in a flex-row
//                   each item should display an icon reflecting current conditions, temperature, windspeed and humidity
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

var loadPreviousSearches = function() {
  // create an array variable in which to store searched locations for later recall
  const previousSearches = JSON.parse(localStorage.previousSearches || "[]");

  for (var i = 0; i < previousSearches.length; i++) {
    // if array reaches 10 search locations, remove the last to make room for the most recent location
   
    var previousSearchHistory = previousSearches[i];
        
    var buttonEl = document.createElement("button");
    // need to create event handler for this button
    buttonEl.classList = "prev-btn list-item text-uppercase";
    buttonEl.type = "submit";

    var previousSearchHistoryEl = document.createElement("span");
    previousSearchHistoryEl.innerHTML = previousSearchHistory;
    
    buttonEl.appendChild(previousSearchHistoryEl);
    previousSearchesContainerEl.appendChild(buttonEl);
   
  // // function to enable click on previously searched locations to load to input field
  // var previousLocationRequestHandler = function() {
  //   var searchLocation = previousSearchHistory  
  //   getLocationForecast(searchLocation);
  //   }
  };
    // add eventlistener for click on previous search button
  // previousSearchHistoryEl.addEventListener("submit",previousLocationRequestHandler); 
} 

// function to enable input of location and sent to API function call (and store previous searches)
var inputRequestHandler = function (event) {
  event.preventDefault();
    
  // get value from input element
  var searchLocation = searchLocationEl.value.trim();
   
  // if information has been entered into input field, proceed to retrieve data
  if (searchLocation) {
    getLocationForecast(searchLocation);
     
    var getPreviousSearches = JSON.parse(localStorage.getItem("previousSearches"));
    
    // if searchLocation is the same as a previous search, don't add to the array..need to ensure valid entry & not blank.
    if ((getPreviousSearches.includes(searchLocation) === false)) {
      // if (getPreviousSearches.length >= 10) {
      //   getPreviousSearches.pop(); }
      getPreviousSearches.push(searchLocation);
    
    // store latest lookup in array of previously searched locastions
    localStorage.setItem("previousSearches", JSON.stringify(getPreviousSearches));
    console.log(getPreviousSearches);// add search location to previous searches buttons to max 10 
    };
    
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
    //
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
    
   // append location & date to h3 tags
    currentLocationEl.appendChild(currentInfoEl);
    // append h3 tag contents to div
    currentDetailsEl.appendChild(currentLocationEl);

    // create forecast display
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
    tempCurrentEl.innerHTML =
      "<p class='temp'>Temp: " + currentTemp + " °C</p>";
    var windCurrentEl = document.createElement("p");
    windCurrentEl.innerHTML =
      "<p class='wind'>Wind: " + currentWind + " KPH</p>";
    var humidityCurrentEl = document.createElement("p");
    humidityCurrentEl.innerHTML =
      "<p class=humidity'>Humidity: " + currentHumidity + "%</p>";
    var uviCurrentEl = document.createElement("p");
    uviCurrentEl.innerHTML =
      "<p class=uvi'> UV Index: " + currentUVIndex + "</p>";

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
    var fiveDayContainerEl = document.querySelector("#five-day-container");
    var dayOneEl = document.querySelector("#day-1");
    var dayTwoEl = document.querySelector("#day-2");
    var dayThreeEl = document.querySelector("#day-3");
    var dayFourEl = document.querySelector("#day-4");
    var dayFiveEl = document.querySelector("#day-5");


    // var dailyDateEl = document.createElement("p");
    // var dailyTempEl = document.createElement("p");
    // var dailyWindEl = document.createElement("p");
    // var dailyHumidityEl = document.createElement("p");


    // // create a container for each day and the forecast items for each of those days
    // // for loop to create the containers for each daily forecast
    // for (var i = 0; i < 5; i++) {
    //   var dailyForecast = futureForecastData[i];
    //   var dailyForecastEl = document.querySelector(".forecast-info");
    //   dailyforecastEl.setAttribute("#day-" + [i]+1);
    //   dailyforecastEl.innerHTML = dailyForecast
    //     // for loop to create the forecast conditions for each daily forecast container
    //     for (var i = 0; i < 5; i++) {
    //       dailyDateEl.date = document.getElementById("#date-" + [i]+1);
    //       dailyDateEl.innerText = moment.unix(futureForecastData[i].date);
    //       dailyTempEl.temp = document.getElementById("#temp-" + [i]+1);
    //       dailyTempEl.innerText = "Temp: " + futureForecastData[i].temp + " °C";
    //       dailyWindEl.wind = document.getElementById("#wind-" + [i]+1);
    //       dailyWindEl.innnerText = "Wind: " + futureForecastData[i].wind + " KPH";
    //       dailyHumidityEl.humidity = document.getElementById("#humidity-" + [i]+1);
    //       dailyHumidityEl.innerText = "Humidity: " + futureForecastData[i].humidity  + " %";
    //   }
    // }



    // dateOneEl.appendChild(dateDayOneEl);
    // dayOneEl.appendChild(dateOneEl);
    // // iconOneEl.appendChild(iconDayOneImg)
    // tempOneEl.appendChild(tempDayOneEl);
    // dayOneEl.appendChild(tempOneEl);
    // windOneEl.appendChild(windDayOneEl);
    // dayOneEl.appendChild(windOneEl);
    // humidityOneEl.appendChild(humidityDayOneEl);
    // dayOneEl.appendChild(humidityOneEl);
              
// set up 1st of 5
    var forecastDateOne = moment.unix(futureForecastData[0].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastWeatherIconOne = futureForecastData[0].icon;
    var forecastTempOne = futureForecastData[0].temp.day;
    var forecastWindOne = futureForecastData[0].wind_speed;
    var forecastHumidityOne = futureForecastData[0].humidity;
        
    var dateOneEl = document.querySelector("#date-1");
    var iconOneEl = document.querySelector("#icon-1")
    var tempOneEl = document.querySelector("#temp-1");
    var windOneEl = document.querySelector("#wind-1");
    var humidityOneEl = document.querySelector("#humidity-1");

    var dateDayOneEl = document.createElement("p");
    dateDayOneEl.innerText = forecastDateOne;
    var dayOneImgEl = document.createElement("img");
    dayOneImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastWeatherIconOne + ".png");
    dayOneImgEl.setAttribute("alt", "weather icon");
    var tempDayOneEl = document.createElement("p");
    tempDayOneEl.innerText = "Temp: " + forecastTempOne + " °C";
    var windDayOneEl = document.createElement("p");
    windDayOneEl.innerText = "Wind: " + forecastWindOne + " KPH";
    var humidityDayOneEl = document.createElement("p");
    humidityDayOneEl.innerText = "Humidity: " + forecastHumidityOne + " %";

    dateOneEl.appendChild(dateDayOneEl);
    dayOneEl.appendChild(dateOneEl);
    iconOneEl.appendChild(dayOneImgEl);
    dayOneEl.appendChild(iconOneEl);
    tempOneEl.appendChild(tempDayOneEl);
    dayOneEl.appendChild(tempOneEl);
    windOneEl.appendChild(windDayOneEl);
    dayOneEl.appendChild(windOneEl);
    humidityOneEl.appendChild(humidityDayOneEl);
    dayOneEl.appendChild(humidityOneEl);

// set up 2nd of 5
    var forecastDateTwo = moment.unix(futureForecastData[1].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastWeatherIconTwo = futureForecastData[1].icon;
    var forecastTempTwo = futureForecastData[1].temp.day;
    var forecastWindTwo = futureForecastData[1].wind_speed;
    var forecastHumidityTwo = futureForecastData[1].humidity;
    
    var dateTwoEl = document.querySelector("#date-2");
    var iconTwoEl = document.getElementById("icon-2");
    var tempTwoEl = document.querySelector("#temp-2");
    var windTwoEl = document.querySelector("#wind-2");
    var humidityTwoEl = document.querySelector("#humidity-2");

    var dateDayTwoEl = document.createElement("p");
    dateDayTwoEl.innerText = forecastDateTwo;
    var dayTwoImgEl = document.createElement("img");
    dayTwoImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastWeatherIconTwo + ".png");
    dayTwoImgEl.setAttribute("alt", "weather icon");
    var tempDayTwoEl = document.createElement("p");
    tempDayTwoEl.innerText = "Temp: " + forecastTempTwo + " °C";
    var windDayTwoEl = document.createElement("p");
    windDayTwoEl.innerText = "Wind: " + forecastWindTwo + " KPH";
    var humidityDayTwoEl = document.createElement("p");
    humidityDayTwoEl.innerText = "Humidity: " + forecastHumidityTwo + " %";

    dateTwoEl.appendChild(dateDayTwoEl);
    dayTwoEl.appendChild(dateTwoEl);
    iconTwoEl.appendChild(dayTwoImgEl);
    dayTwoEl.appendChild(iconTwoEl);
    tempTwoEl.appendChild(tempDayTwoEl);
    dayTwoEl.appendChild(tempTwoEl);
    windTwoEl.appendChild(windDayTwoEl);
    dayTwoEl.appendChild(windTwoEl);
    humidityTwoEl.appendChild(humidityDayTwoEl);
    dayTwoEl.appendChild(humidityTwoEl);
     
 // set up 3rd of 5
    var forecastDateThree = moment.unix(futureForecastData[2].dt).add(1, "d").format("MM/DD/YYYY");
    // var forecastWeatherIconThree = futureForecastData[2].icon;
    var forecastTempThree = futureForecastData[2].temp.day;
    var forecastWindThree = futureForecastData[2].wind_speed;
    var forecastHumidityThree = futureForecastData[2].humidity;
       
    var dateThreeEl = document.querySelector("#date-3");
    // var iconThreeEl = document.getElementById("#icon-3");
    var tempThreeEl = document.querySelector("#temp-3");
    var windThreeEl = document.querySelector("#wind-3");
    var humidityThreeEl = document.querySelector("#humidity-3");

    var dateDayThreeEl = document.createElement("p");
    dateDayThreeEl.innerText = forecastDateThree;
    // var dayThreeImgEl = document.createElement("img");
    // dayThreeImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastWeatherIconThree + ".png");
    // dayThreeImgEl.setAttribute("alt", "weather icon");
    var tempDayThreeEl = document.createElement("p");
    tempDayThreeEl.innerText = "Temp: " + forecastTempThree + " °C";
    var windDayThreeEl = document.createElement("p");
    windDayThreeEl.innerText = "Wind: " + forecastWindThree + " KPH";
    var humidityDayThreeEl = document.createElement("p");
    humidityDayThreeEl.innerText = "Humidity: " + forecastHumidityThree + " %";

    dateThreeEl.appendChild(dateDayThreeEl);
    dayThreeEl.appendChild(dateThreeEl);
    // iconThreeEl.appendChild(dayThreeImgEl);
    // dayThreeEl.appendChild(iconThreeEl);
    tempThreeEl.appendChild(tempDayThreeEl);
    dayThreeEl.appendChild(tempThreeEl);
    windThreeEl.appendChild(windDayThreeEl);
    dayThreeEl.appendChild(windThreeEl);
    humidityThreeEl.appendChild(humidityDayThreeEl);
    dayThreeEl.appendChild(humidityThreeEl);
    
// set up 4th of 5
    var forecastDateFour = moment.unix(futureForecastData[3].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastWeatherIconFour = futureForecastData[3].icon;
    var forecastTempFour = futureForecastData[3].temp.day;
    var forecastWindFour = futureForecastData[3].wind_speed;
    var forecastHumidityFour = futureForecastData[3].humidity;
    
    var dateFourEl = document.querySelector("#date-4");
    var iconFourEl = document.getElementById("#icon-4");
    var tempFourEl = document.querySelector("#temp-4");
    var windFourEl = document.querySelector("#wind-4");
    var humidityFourEl = document.querySelector("#humidity-4");

    var dateDayFourEl = document.createElement("p");
    dateDayFourEl.innerText = forecastDateFour;
    var dayFourImgEl = document.createElement("img");
    dayFourImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastWeatherIconFour + ".png");
    dayFourImgEl.setAttribute("alt", "weather icon");
    var tempDayFourEl = document.createElement("p");
    tempDayFourEl.innerText = "Temp: " + forecastTempFour + " °C";
    var windDayFourEl = document.createElement("p");
    windDayFourEl.innerText = "Wind: " + forecastWindFour + " KPH";
    var humidityDayFourEl = document.createElement("p");
    humidityDayFourEl.innerText = "Humidity: " + forecastHumidityFour + " %";

    dateFourEl.appendChild(dateDayFourEl);
    // dayFourEl.appendChild(dateFourEl);
    // iconFourEl.appendChild(dayFourImgEl);
    // dayFourEl.appendChild(iconFourEl);
    tempFourEl.appendChild(tempDayFourEl);
    // dayFourEl.appendChild(tempFourEl);
    windFourEl.appendChild(windDayFourEl);
    // dayFourEl.appendChild(windFourEl);
    humidityFourEl.appendChild(humidityDayFourEl);
    // dayFourEl.appendChild(humidityFourEl);
    
 // set up 5th of 5
    var forecastDateFive = moment.unix(futureForecastData[4].dt).add(1, "d").format("MM/DD/YYYY");
    // var forecastWeatherIconFive = futureForecastData[4].icon;
    var forecastTempFive = futureForecastData[4].temp.day;
    var forecastWindFive = futureForecastData[4].wind_speed;
    var forecastHumidityFive = futureForecastData[4].humidity;
       
    var dateFiveEl = document.querySelector("#date-5");
    // var iconFiveEl = document.querySelector("#icon-5");
    var tempFiveEl = document.querySelector("#temp-5");
    var windFiveEl = document.querySelector("#wind-5");
    var humidityFiveEl = document.querySelector("#humidity-5");

    var dateDayFiveEl = document.createElement("p");
    dateDayFiveEl.innerText = forecastDateFive;
    // var dayFiveImgEl = document.createElement("img");
    // dayFiveImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastWeatherIconFive + ".png");
    // dayFiveImgEl.setAttribute("alt", "weather icon");
    var tempDayFiveEl = document.createElement("p");
    tempDayFiveEl.innerText = "Temp: " + forecastTempFive + " °C";
    var windDayFiveEl = document.createElement("p");
    windDayFiveEl.innerText = "Wind: " + forecastWindFive + " KPH";
    var humidityDayFiveEl = document.createElement("p");
    humidityDayFiveEl.innerText = "Humidity: " + forecastHumidityFive + " %";

    dateFiveEl.appendChild(dateDayFiveEl);
    // dayFiveEl.appendChild(dateFiveEl);
    // iconFiveEl.appendChild(dayFiveImgEl);
    // dayFiveEl.appendChild(iconFiveEl);
    tempFiveEl.appendChild(tempDayFiveEl);
    // dayFiveEl.appendChild(tempFiveEl);
    windFiveEl.appendChild(windDayFiveEl);
    // dayFiveEl.appendChild(windFiveEl);
    humidityFiveEl.appendChild(humidityDayFiveEl);
    // dayFiveEl.appendChild(humidityFiveEl);

    fiveDayContainerEl.appendChild(dayOneEl);
    fiveDayContainerEl.appendChild(dayTwoEl);
    fiveDayContainerEl.appendChild(dayThreeEl);
    // fiveDayContainerEl.appendChild(dayFourEl);
    // fiveDayContainerEl.appendChild(dayFiveEl);

  };

}
//   var createForecastItem = function (forecastDataObj) {
//     var forecastDay1El = document.createElement("div");
//       forecastDay1El.className = "future-list-item";
//     var forecastItemDateEl = document.createElement("li");
//     console.log(forecastDataObj);
//     
//     var forecastDateEl = document.createElement("span");
//     forecastDateEl.innerText = forecastDate;
//     forecastItemDateEl.appendChild(forecastDateEl);

//     forecastDay1El.appendChild(forecastItemDateEl);
//       
//     return forecastItemDateEl
//   };

  
//   var displayFiveDayForecast = function (futureForecastData) {
//     var forecastListEl = document.getElementById("day1-forecast");

//     var newForecastItem = createForecastItem(futureForecastData[0]);
//     forecastListEl.appendChild(newForecastItem);
//   };
 
// // add event listener to location input
inputLocationEl.addEventListener("submit", inputRequestHandler);
