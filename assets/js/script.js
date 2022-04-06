// functions required to meet acceptance criteria
//    function to retrieve information on click of search button to inputForm
//       function to store that name into localStorage and display up to 10 previous searches
//                   when button for one of the previous searches is clicked, current/future forecast as of that point in time comes up  
//    function to display current weather for the searchCity
//        display -> city name, date, icon representing weather conditions, humidity, windspeed and UV index
//                   the UV index should assume class of favourable, moderate or severe
//    function to display next 5 days weather for that city
//        display -> future forecast comprised of 5 list items distributed horizonally in a flex-row
//                   each item should display an icon reflecting current conditions, temperature, windspeed and humidity
var inputLocationEl = document.querySelector("#input-form");
var searchLocationEl = document.querySelector("#search-location");
// var locationSearchTermEl = document.querySelector("#");
var historyButtonsEl = document.querySelector("#history");
var currentContainerEl = document.querySelector("#current-container");
var futureContainerEl = document.querySelector("#future-container");
var forecast = document.querySelector("#current-conditions");
var units = "&units=metric"

// if date no directly available from API call
var currentDate = null;
var date = null;

var dateDisplay = function () {
  date = moment(new Date())
  currentDate.html(date.format('DD MMMM YYYY, HH:mm:ss'));
};

// create function to fetch required data from API (click event to search, fetch from APL and function to display information requested)

  // enter name of location for which weather is being requested
  var inputRequestHandler = function(event) {
    event.preventDefault();
  
    // get value from input element
    var searchLocation = searchLocationEl.value.trim();
    // create an array variable in which to store searched locations for later recall
    const previousSearches = JSON.parse(localStorage.previousSearches || '[]');  
  
    // save locations in local storage in an array for future callback
    previousSearches.push(searchLocation);
    localStorage.setItem("previousSearches", JSON.stringify(previousSearches));

    // if information has been entered into input field, proceed to retrieve data
    if (searchLocation) {
      getLocationForecast(searchLocation);

      // // clear old content
      // forecastContainerEl.textContent = "";
      // locationSearchTermEl.value = "";
  
    // if nothing entered, require input
    } else {
      alert("Please input a city name");
    }
  };

  // function to call API
  var getLocationForecast = function(searchLocation) {
        
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+searchLocation+"&appid=dd67d89c4ca8c93446f0946598c5ffce&units=metric";
 
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayForecast(data, searchLocation);
        });
      } else {  // if no location by the name that was input
        alert("Error: that location is not in our database" );
       }
      })
      .catch(function(error) {
      alert("Unable to access weather dashboard");
    });
  };

// set current date for display in current section (unless included in API call)
var moment = moment().format('MM/DD/YYYY');
console.log(moment);

// display information retrieved from API call related to current  
var displayForecast = function(searchLocation, forecast) {
  // check if api returned any information
  console.log(searchLocation);
  console.log(forecast);
  if (forecast.length === 0) {
    currentContainerEl.textContent = "There is no information available for that location.";
    return;
  }
  // check format - create div for display and list elements?
  // locationSearchTerm.textContent = forecast;

  // // display 5 day forecast here? - need to create list and append to container
  for (var i = 0; i < locationForecast.length; i++) {
  //   // format fix this
     var forecastLocation = locationForecast[i] + "/" + locationForecast[i].name;

  //   // create a container for the 5 day forecast 
     var locationFutureListingEl = document.createElement("div");
     locationFutureListingEl.classList = "list-item flex-row justify-space-between align-center";

  //   // create a span element to hold forecast details
   var fiveDayForecastEl = document.createElement("span");
   fiveDayForecastEl.textContent = forecastLocation;

  //   // append to container
    locationSearchEl.appendChild(fiveDayForecastEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";
  };
// need if/else statements to check and display icon for current weather conditions (fontawesome)
    //  if (locationForecast.weatherCondition ===  0) {
    //    statusEl.innerHTML =
    //      "<i class='fas fa-times status-icon icon-danger'></i>" + locationSearch[i].weatherCondition;
    //  } else {
    //    statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    //  }

    // // append to container
    // locationSearchEl.appendChild(statusEl);

//     // append container to the dom
    // forecastContainerEl.appendChild(locationSearchEl);
  // }

 // function to move past search locations into prev-btns 
//  var getPastSearches = function(PastSearches) {
//    var previous = JSON.parse(window.localStorage.getItem("previousSearches"));
   
//    // allocate up to 10 previous searches from local storage to list below Input Form
//    if(previous) {
//      for (var i = 0; i < previous.length; i++) {
//        var previousLocation = previous[i];
//        var previousContainerElId = previousLocation.previousContainerEl;
//        var previousLocationHTMLEl = document.getElementById(previousContainerElId);
//        previousLocationHTMLEl.innerText = previousLocation;

//      }
     
 };

// add event listeners to forms
inputLocationEl.addEventListener("submit", inputRequestHandler);
