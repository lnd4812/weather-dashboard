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
var locationCurrentEl = document.querySelector("#location-current");
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
  
  for (var i = 0; i < previousSearches.length && i < 10; i++) {
    var previousSearchHistory = previousSearches[i];
    console.log(previousSearchHistory);

    var buttonEl = document.createElement("button");
    // need to create event handler for this button
    buttonEl.classList = "prev-btn list-item text-uppercase";
    buttonEl.type = "submit";

    var previousSearchHistoryEl = document.createElement("span");
    previousSearchHistoryEl.innerHTML = previousSearchHistory;
    
    buttonEl.appendChild(previousSearchHistoryEl);
    buttonEl.addEventListener("click", function() {
      var searchLocation = buttonEl.value;
      console.log(searchLocation);  
      getLocationForecast(searchLocation);
    });
    previousSearchesContainerEl.appendChild(buttonEl);
    
  
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
              getPreviousSearches.push(searchLocation);
    
    // store items in reverse order in local storage so that only the most recent searches remain
    
    localStorage.setItem("previousSearches", JSON.stringify(getPreviousSearches.reverse()));
    console.log(getPreviousSearches);// add search location to previous searches buttons to max 10 - need to m
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

  // create container to hold list with list items representing weather conditions
  var weatherDetailsEl = document.createElement("div");
  weatherDetailsEl.className = "info.side";

  // list to display current weather
  var currentWeatherEl = document.createElement("div");
  currentWeatherEl.className = "weather-now";
    
  var currentDate = "(" + moment().format("MM/DD/YYYY") + ")";

  //create icon image - coding suggestions from Stack Overflow & Margaret W.N. & Beki & tutoring session
  var currentWeatherIcon = currentForecastData.weather[0].icon;
  var weatherImgEl = document.createElement("img");
  weatherImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + currentWeatherIcon + ".png");
  weatherImgEl.setAttribute("alt", "weather icon");
  var weatherIconEl = document.createElement("div");
  weatherIconEl.appendChild(weatherImgEl);

  // create rest of forecast display
  var currentTemp = currentForecastData.temp;
  var currentWind = currentForecastData.wind_speed;
  var currentHumidity = currentForecastData.humidity;
  var currentUVIndex = currentForecastData.uvi;
  console.log(currentTemp, currentWind, currentHumidity, currentUVIndex);

  
  // var listItemInfoEl = document.createElement("li");
  // listItemInfoEl.className = "list-item info";  
  // listItemInfoEl.classList = "display: inline"; 
  // listItemInfoEl.textContent = "<h3>" + searchLocation + " " + currentDate + "</h3>";
  // var listItemTempEl = document.createElement("li");
  // listItemTempEl.className = "list-item temp";  
  // listItemTempEl.classList = "display: inline"; 
  // listItemTempEl.textContent = "<p class='temp'>Temp: " + currentTemp + " °C</p>";
  // var listItemWindEl = document.createElement("li");
  // listItemWindEl.className = "list-item wind";  
  // listItemWindEl.classList = "display: inline"; 
  // listItemWindEl.textContent = "<p class='wind'>Wind: " + currentWind + " KPH</p>";
  // var listItemHumidityEl = document.createElement("li");
  // listItemHumidityEl.className = "list-item humidity";  
  // listItemHumidityEl.classList = "display: inline"; 
  // listItemHumidityEl.textContent = "<p class='humidity'>Humidity: " + currentHumidity + "%</p>";
  // var listItemUviEl = document.createElement("li");
  // listItemUviEl.className = "list-item uvi";  
  // listItemUviEl.classList = "display: inline"; 
  // listItemUviEl.textContent = "<p class=uvi'> UV Index: " + currentUVIndex + "</p>";

  // listItemInfoEl.appendChild(weatherIconEl);
  // currentWeatherEl.appendChild(listItemInfoEl);
  // currentWeatherEl.appendChild(listItemTempEl);
  // currentWeatherEl.appendChild(listItemWindEl);
  // currentWeatherEl.appendChild(listItemHumidityEl);
  // currentWeatherEl.appendChild(listItemUviEl);
  // weatherDetailsEl.appendChild(currentWeatherEl);
    
    
    //   // set current date for display in current section
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
    var dayOneEl = document.querySelector("#day1");
    var dayTwoEl = document.querySelector("#day2");
    var dayThreeEl = document.querySelector("#day3");
    var dayFourEl = document.querySelector("#day4");
    var dayFiveEl = document.querySelector("#day5");


    // for (var i=0; i < 5; i++)

    // var forecastDayNumber = getElementById("") forecastDate.[i]

    // var forecastDateOne = moment.unix(futureForecastData[i].dt).add(1, "d").format("MM/DD/YYYY");
    // // var forecastIconOne = futureForecastData.weather[0].icon;
    // var forecastTempOne = futureForecastData[i].temp.day;
    // var forecastWindOne = futureForecastData[i].wind_speed;
    // var forecastHumidityOne = futureForecastData[i].humidity;
    // console.log(forecastDateOne, forecastTempOne, forecastWindOne, forecastHumidityOne);
    
    

    var forecastDateOne = moment.unix(futureForecastData[0].dt).add(1, "d").format("MM/DD/YYYY");
    // var forecastIconOne = futureForecastData.weather[0].icon;
    var forecastTempOne = futureForecastData[0].temp.day;
    var forecastWindOne = futureForecastData[0].wind_speed;
    var forecastHumidityOne = futureForecastData[0].humidity;
    console.log(forecastDateOne, forecastTempOne, forecastWindOne, forecastHumidityOne);

    var forecastDateTwo = moment.unix(futureForecastData[1].dt).add(1, "d").format("MM/DD/YYYY");
    // var forecastIconTwo = futureForecastData.weather[1].icon;
    var forecastTempTwo = futureForecastData[1].temp.day;
    var forecastWindTwo = futureForecastData[1].wind_speed;
    var forecastHumidityTwo = futureForecastData[1].humidity;
    console.log(forecastDateTwo, forecastTempTwo, forecastWindTwo, forecastHumidityTwo);

    var forecastDateThree = moment.unix(futureForecastData[2].dt).add(1, "d").format("MM/DD/YYYY");
    // var forecastIconThree = futureForecastData.weather[2].icon;    
    var forecastTempThree = futureForecastData[2].temp.day;
    var forecastWindThree = futureForecastData[2].wind_speed;
    var forecastHumidityThree = futureForecastData[2].humidity;
    console.log(forecastDateThree, forecastTempThree, forecastWindThree, forecastHumidityThree);

    var forecastDateFour = moment.unix(futureForecastData[3].dt).add(1, "d").format("MM/DD/YYYY");
    // var forecastIconFour = futureForecastData.weather[3].icon;    
    var forecastTempFour = futureForecastData[3].temp.day;
    var forecastWindFour = futureForecastData[3].wind_speed;
    var forecastHumidityFour = futureForecastData[3].humidity;
    console.log(forecastDateFour, forecastTempFour, forecastWindFour, forecastHumidityFour);

    var forecastDateFive = moment.unix(futureForecastData[4].dt).add(1, "d").format("MM/DD/YYYY");
    // var forecastIconFive = futureForecastData.weather[4].icon;
    var forecastTempFive = futureForecastData[4].temp.day;
    var forecastWindFive = futureForecastData[4].wind_speed;
    var forecastHumidityFive = futureForecastData[4].humidity;
    console.log(forecastDateFive, forecastTempFive, forecastWindFive, forecastHumidityFive);

    // set up 1st of 5
    
    var dateOneEl = document.querySelector("#date1");
    // var iconDayOneEl = document.querySelector("#icon-future-1")
    // var iconOneEl = document.querySelector("#icon1")
    var tempOneEl = document.querySelector("#temp1");
    var windOneEl = document.querySelector("#wind1");
    var humidityOneEl = document.querySelector("#humidity1");

    var dateDayOneEl = document.createElement("p");
    dateDayOneEl.innerText = forecastDateOne;
    // var iconDayOneEl = document.createElement("img");
    // iconDayOneImgEl.setAttribute("src", "https://openweathermap.org/img/wn/"+forecastIconOne+".png");
    // iconDayOneImgEl.setAttribute("alt", "weather icon");
    // iconOneEl = document.getElementById("icon1");
    var tempDayOneEl = document.createElement("p");
    tempDayOneEl.innerText = "Temp: " + forecastTempOne + " °C";
    var windDayOneEl = document.createElement("p");
    windDayOneEl.innerText = "Wind: " + forecastWindOne + " KPH";
    var humidityDayOneEl = document.createElement("p");
    humidityDayOneEl.innerText = "Humidity: " + forecastHumidityOne + " %";

    dateOneEl.appendChild(dateDayOneEl);
    dayOneEl.appendChild(dateOneEl);
    // iconOneEl.appendChild(iconDayOneImg)
    tempOneEl.appendChild(tempDayOneEl);
    dayOneEl.appendChild(tempOneEl);
    windOneEl.appendChild(windDayOneEl);
    dayOneEl.appendChild(windOneEl);
    humidityOneEl.appendChild(humidityDayOneEl);
    dayOneEl.appendChild(humidityOneEl);

    // set up 2nd of 5
    var dateTwoEl = document.querySelector("#date2");
    var tempTwoEl = document.querySelector("#temp2");
    var windTwoEl = document.querySelector("#wind2");
    var humidityTwoEl = document.querySelector("#humidity2");

    var dateDayTwoEl = document.createElement("p");
    dateDayTwoEl.innerText = forecastDateTwo;
    var tempDayTwoEl = document.createElement("p");
    tempDayTwoEl.innerText = "Temp: " + forecastTempTwo + " °C";
    var windDayTwoEl = document.createElement("p");
    windDayTwoEl.innerText = "Wind: " + forecastWindTwo + " KPH";
    var humidityDayTwoEl = document.createElement("p");
    humidityDayTwoEl.innerText = "Humidity: " + forecastHumidityTwo + " %";

    dateTwoEl.appendChild(dateDayTwoEl);
    dayTwoEl.appendChild(dateTwoEl);
    tempTwoEl.appendChild(tempDayTwoEl);
    dayTwoEl.appendChild(tempTwoEl);
    windTwoEl.appendChild(windDayTwoEl);
    dayTwoEl.appendChild(windTwoEl);
    humidityTwoEl.appendChild(humidityDayTwoEl);
    dayTwoEl.appendChild(humidityTwoEl);
    
    // set up 3rd of 5
    var dateThreeEl = document.querySelector("#date3");
    var tempThreeEl = document.querySelector("#temp3");
    var windThreeEl = document.querySelector("#wind3");
    var humidityThreeEl = document.querySelector("#humidity3");

    var dateDayThreeEl = document.createElement("p");
    dateDayThreeEl.innerText = forecastDateThree;
    var tempDayThreeEl = document.createElement("p");
    tempDayThreeEl.innerText = "Temp: " + forecastTempThree + " °C";
    var windDayThreeEl = document.createElement("p");
    windDayThreeEl.innerText = "Wind: " + forecastWindThree + " KPH";
    var humidityDayThreeEl = document.createElement("p");
    humidityDayThreeEl.innerText = "Humidity: " + forecastHumidityThree + " %";

    dateThreeEl.appendChild(dateDayThreeEl);
    dayThreeEl.appendChild(dateThreeEl);
    tempThreeEl.appendChild(tempDayThreeEl);
    dayThreeEl.appendChild(tempThreeEl);
    windThreeEl.appendChild(windDayThreeEl);
    dayThreeEl.appendChild(windThreeEl);
    humidityThreeEl.appendChild(humidityDayThreeEl);
    dayThreeEl.appendChild(humidityThreeEl);
    
    // set up 4th of 5
    var dateFourEl = document.querySelector("#date4");
    var tempFourEl = document.querySelector("#temp4");
    var windFourEl = document.querySelector("#wind4");
    var humidityFourEl = document.querySelector("#humidity4");

    var dateDayFourEl = document.createElement("p");
    dateDayFourEl.innerText = forecastDateFour;
    var tempDayFourEl = document.createElement("p");
    tempDayFourEl.innerText = "Temp: " + forecastTempFour + " °C";
    var windDayFourEl = document.createElement("p");
    windDayFourEl.innerText = "Wind: " + forecastWindFour + " KPH";
    var humidityDayFourEl = document.createElement("p");
    humidityDayFourEl.innerText = "Humidity: " + forecastHumidityFour + " %";

    dateFourEl.appendChild(dateDayFourEl);
    dayFourEl.appendChild(dateFourEl);
    tempFourEl.appendChild(tempDayFourEl);
    dayFourEl.appendChild(tempFourEl);
    windFourEl.appendChild(windDayFourEl);
    dayFourEl.appendChild(windFourEl);
    humidityFourEl.appendChild(humidityDayFourEl);
    dayFourEl.appendChild(humidityFourEl);
    
    // set up 5th of 5
    var dateFiveEl = document.querySelector("#date5");
    var tempFiveEl = document.querySelector("#temp5");
    var windFiveEl = document.querySelector("#wind5");
    var humidityFiveEl = document.querySelector("#humidity5");

    var dateDayFiveEl = document.createElement("p");
    dateDayFiveEl.innerText = forecastDateFive;
    var tempDayFiveEl = document.createElement("p");
    tempDayFiveEl.innerText = "Temp: " + forecastTempFive + " °C";
    var windDayFiveEl = document.createElement("p");
    windDayFiveEl.innerText = "Wind: " + forecastWindFive + " KPH";
    var humidityDayFiveEl = document.createElement("p");
    humidityDayFiveEl.innerText = "Humidity: " + forecastHumidityFive + " %";

    dateFiveEl.appendChild(dateDayFiveEl);
    dayFiveEl.appendChild(dateFiveEl);
    tempFiveEl.appendChild(tempDayFiveEl);
    dayFiveEl.appendChild(tempFiveEl);
    windFiveEl.appendChild(windDayFiveEl);
    dayFiveEl.appendChild(windFiveEl);
    humidityFiveEl.appendChild(humidityDayFiveEl);
    dayFiveEl.appendChild(humidityFiveEl);

    fiveDayContainerEl.appendChild(dayOneEl);
    fiveDayContainerEl.appendChild(dayTwoEl);
    fiveDayContainerEl.appendChild(dayThreeEl);
    fiveDayContainerEl.appendChild(dayFourEl);
    fiveDayContainerEl.appendChild(dayFiveEl);

  };

}


//   var createForecastItem = function (forecastDataObj) {
//     var forecastDay1El = document.createElement("div");
    
//     forecastDay1El.className = "future-list-item";
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