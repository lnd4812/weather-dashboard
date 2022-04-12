
// What I want to do here is set up a loop to assign date, weather icon, temp, wind & humidity for 5 days 
    // the date is in an array - us a for loop or a forEach?
    // the date will be assigned to "p" tags with id for each day and the same classes for each weather condition
    // the p tags have date[#], temp[#], wind[#], humidity[#] and will have icon[#] for each day
    // they all have the same class names (date, temp, wind, humidity & will have icon)
    // in a for loop or for each, would the Each be forEach("day-" +[i+1], assign values to date[i], temp[i]), wind[i], humidity[])

    // var dayId = document.querySelector("p")
    // var forecast = (#day.setAttribute("#day-"+ [i+1])

    // for (var i = 0; i < 5; i++) {
      // var forecast = day
    
    // var forecastDate = moment.unix(futureForecastData[i].dt).add(1, "d").format("MM/DD/YYYY"); 
    // var 
    
    // var forecastTemp[i] = futureForecastData[i].temp.day;
    // var forecastWind[i] = futureForecastData[i].wind_speed;
    // var forecastHumidity[i] = futureForecastData[i].humidity;
    // console.log(forecastDate[i], forecastTemp[i], forecastWind[i], forecastHumidity[i]);















for (var i = 0; i < 5; i++ ) {


    
    var forecastDate[i] = moment.unix(futureForecastData[i].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastTempOne = futureForecastData[i].temp.day;
    var forecastWindOne = futureForecastData[i].wind_speed;
    var forecastHumidityOne = futureForecastData[i].humidity;
    console.log(forecastDate[i], forecastTemp[i], forecastWind[i], forecastHumidity[i]);
    
    var forecastDateTwo = moment.unix(futureForecastData[1].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastTempTwo = futureForecastData[1].temp.day;
    var forecastWindTwo = futureForecastData[1].wind_speed;
    var forecastHumidityTwo = futureForecastData[1].humidity;
    console.log(forecastDateTwo, forecastTempTwo, forecastWindTwo, forecastHumidityTwo);

    var forecastDateThree = moment.unix(futureForecastData[2].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastTempThree = futureForecastData[2].temp.day;
    var forecastWindThree = futureForecastData[2].wind_speed;
    var forecastHumidityThree = futureForecastData[2].humidity;
    console.log(forecastDateThree, forecastTempThree, forecastWindThree, forecastHumidityThree);

    var forecastDateFour = moment.unix(futureForecastData[3].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastTempFour = futureForecastData[3].temp.day;
    var forecastWindFour = futureForecastData[3].wind_speed;
    var forecastHumidityFour = futureForecastData[3].humidity;
    console.log(forecastDateFour, forecastTempFour, forecastWindFour, forecastHumidityFour);

    var forecastDateFive = moment.unix(futureForecastData[4].dt).add(1, "d").format("MM/DD/YYYY");
    var forecastTempFive = futureForecastData[4].temp.day;
    var forecastWindFive = futureForecastData[4].wind_speed;
    var forecastHumidityFive = futureForecastData[4].humidity;
    console.log(forecastDateFive, forecastTempFive, forecastWindFive, forecastHumidityFive);

    // set up 1st of 5
    var dateDayOneEl = document.querySelector("#date-future-1");
    var dateOneEl = document.querySelector("#date1");
    var tempDayOneEl = document.querySelector("#temp-future-1");
    var tempOneEl = document.querySelector("#temp1");
    var windDayOneEl = document.querySelector("#wind-future-1");
    var windOneEl = document.querySelector("#wind1");
    var humidityDayOneEl = document.querySelector("#humidity-future-1");
    var humidityOneEl = document.querySelector("#humidity1");
    
        
    var dateDayOneEl = document.createElement("p");
    dateDayOneEl.innerText = forecastDateOne;
    var tempDayOneEl = document.createElement("p");
    tempDayOneEl.innerText = "Temp: " + forecastTempOne + " °C";
    var windDayOneEl = document.createElement("p");
    windDayOneEl.innerText = "Wind: " + forecastWindOne + " KPH";
    var humidityDayOneEl = document.createElement("p");
    humidityDayOneEl.innerText = "Humidity: " + forecastHumidityOne + " %";
     
    dateOneEl.appendChild(dateDayOneEl);
    dayOneEl.appendChild(dateOneEl);
    tempOneEl.appendChild(tempDayOneEl);
    dayOneEl.appendChild(tempOneEl);
    windOneEl.appendChild(windDayOneEl);
    dayOneEl.appendChild(windOneEl);
    humidityOneEl.appendChild(humidityDayOneEl);
    dayOneEl.appendChild(humidityOneEl);

    // set up 2nd of 5
    var dateDayTwoEl = document.querySelector("#date-future-2");
    var dateTwoEl = document.querySelector("#date2");
    var tempDayTwoEl = document.querySelector("#temp-future-2");
    var tempTwoEl = document.querySelector("#temp2");
    var windDayTwoEl = document.querySelector("#wind-future-2");
    var windTwoEl = document.querySelector("#wind2");
    var humidityDayTwoEl = document.querySelector("#humidity-future-2");
    var humidityTwoEl = document.querySelector("#humidity2");
    
        
    var dateDayTwoEl = document.createElement("p");
    dateDayTwoEl.innerText = forecastDateTwo;
    var tempDayTwoEl = document.createElement("p");
    tempDayTwoEl.innerText = "Temp: " + forecastTempTwo + " °C";
    var windDayTwoEl = document.createElement("p");
    windDayTwoEl.innerText = "Wind: " + forecastWindTwo + " KPH";
    var humidityDayOneEl = document.createElement("p");
    humidityDayTwoEl.innerText = "Humidity: " + forecastHumidityTwo + " %";
     
    dateTwoEl.appendChild(dateDayTwoEl);
    dayTwoEl.appendChild(dateTwoEl);
    tempTwoEl.appendChild(tempDayTwoEl);
    dayTwoEl.appendChild(tempTwoEl);
    windTwoEl.appendChild(windDayTwoEl);
    dayTwoEl.appendChild(windTwoEl);
    humidityTwoEl.appendChild(humidityDayTwoEl);
    dayTwoEl.appendChild(humidityTwoEl);

    var dateDayThreeEl = document.querySelector("#date-future-three");
    var dateThreeEl = document.querySelector("#date3");
    var tempDayThreeEl = document.querySelector("#temp-future-three");
    var tempThreeEl = document.querySelector("#temp3");
    var windDayThreeEl = document.querySelector("#wind-future-three");
    var windThreeEl = document.querySelector("#wind3");
    var humidityDayThreeEl = document.querySelector("#humidity-future-three");
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

    var dateDayFourEl = document.querySelector("#date-future-four");
    var dateFourEl = document.querySelector("#date4");
    var tempDayFourEl = document.querySelector("#temp-future-four");
    var tempFourEl = document.querySelector("#temp4");
    var windDayFourEl = document.querySelector("#wind-future-four");
    var windFourEl = document.querySelector("#wind4");
    var humidityDayFourEl = document.querySelector("#humidity-future-four");
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


    var dateDayFiveEl = document.querySelector("#date-future-five");
    var dateFiveEl = document.querySelector("#date5");
    var tempDayFiveEl = document.querySelector("#temp-future-five");
    var tempFiveEl = document.querySelector("#temp5");
    var windDayFiveEl = document.querySelector("#wind-future-five");
    var windFiveEl = document.querySelector("#wind5");
    var humidityDayFiveEl = document.querySelector("#humidity-future-five");
    var humidityFiveEl = document.querySelector("#humidity5");
    
        
    var dateDayFiveEl = document.createElement("p");
    dateDayFiveEl.innerText = forecastDateFive;
    var tempDayFiveEl = document.createElement("p");
    tempDayFiveEl.innerText = "Temp: " + forecastTempFive + " °C";
    var windDayFiveEl = document.createElement("p");
    windDayFiveEl.innerText = "Wind: " + forecastWindFive + " KPH";
    var humidityDayFiveEl = document.createElement("p");
    humidityDayFiveEl.innerText = "Humidity: " + forecastHumidity + " %<p>";
}


var createForecastItem = function (forecastDataObj) {
    //     var forecastDay1El = document.createElement("div");
        
    //     forecastDay1El.className = "future-list-item";
    //     var forecastItemDateEl = document.createElement("li");
    //     console.log(forecastDataObj);
    //     var forecastDate = moment.unix(forecastDataObj.dt).add(1,"d").format("MM/DD/YYYY");
    //     console.log(forecastDate);
    //     var forecastItemTempEl = document.createElement("li");
    //     var forecastTemp = forecastDataObj.temp.day;
    //     console.log(forecastTemp);
    //     var forecastItemWindEl = document.createElement("li");
    //     var forecastWind = forecastDataObj.wind_speed;
    //     console.log(forecastWind);
    //     var forecastItemHumidityEl = document.createElement("li");
    //     var forecastHumidity = forecastDataObj.humidity;
    //     console.log(forecastHumidity);
    
    //     var forecastDateEl = document.createElement("span");
    //     forecastDateEl.innerText = forecastDate;
    //     forecastItemDateEl.appendChild(forecastDateEl);
    
    //     var forecastTempEl = document.createElement("span");
    //     forecastTempEl.innerText = "Temp: " + forecastTemp + " °C";
    //     forecastItemTempEl.appendChild(forecastTempEl);
        
    //     var forecastWindEl = document.createElement("span");
    //     forecastWindEl.innerText = "Wind: " + forecastWind + " KPH";
    //     forecastItemWindEl.appendChild(forecastWindEl);
    
    //     var forecastHumidityEl = document.createElement("span");
    //     forecastHumidityEl.innerText = "Humidity: " + forecastHumidity + " %";
    //     forecastItemHumidityEl.appendChild(forecastHumidityEl);
    
    //     forecastDay1El.appendChild(forecastItemDateEl);
    //     forecastDay1El.appendChild(forecastItemTempEl);
    //     forecastDay1El.appendChild(forecastItemWindEl);
    //     forecastDay1El.appendChild(forecastItemHumidityEl);
      
    //     return forecastItemDateEl, forecastItemTempEl, forecastItemWindEl, forecastItemHumidityEl;
    //   };
    
      
    //   var displayFiveDayForecast = function (futureForecastData) {
    //     var forecastListEl = document.getElementById("day1-forecast");
    
    //     var newForecastItem = createForecastItem(futureForecastData[0]);
    //     forecastListEl.appendChild(newForecastItem);
    //   };