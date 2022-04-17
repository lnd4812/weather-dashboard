
  
    // for (var i = 0; i < 5; i++) {
    //   var forecastDate = moment.unix(futureForecastData[i].dt).add(1, "d").format("MM/DD/YYYY");
    //   var forecastIcon = futureForecastData[i].weather[0].icon;
    //   var forecastTemp = futureForecastData[i].temp.day;
    //   var forecastWind = futureForecastData[i].wind_speed;
    //   var forecastHumidity = futureForecastData[i].humidity;
    //   var dailyForecast = {
    //     date: forecastDate,
    //     icon: forecastIcon,
    //     temp: forecastTemp,
    //     wind: forecastWind,
    //     humidity: forecastHumidity
    //   }
    //     console.log(dailyForecast) 
         
    // for (var i = 0; i <5; i++) {
    //   var dailyForecastDetails = dailyForecast[i];
    //   var dateEl = dailyForecastdetails.forecast.date;
    //   var dateElId = document.createElement("p");
    //   dateElId.innerText = dateEl;
    //   dateElId.appendChild(dateEl);
    //   dayEl = document.getElementById("day" + [i]);
    //   dayEl.appendChild(dateElId);
    //   var iconEl = dailyForecastDetails.forecast.icon;
    //   var iconImgElId = document.createElement("p");
    //   iconImgElId.setAttribute("src", "https://openweathermap.org/img/wn/" +iconEl+ ".png");
    //   iconImgElId.setAttribute("alt", "weather icon");
    //   iconEl = document.getElementById("icon"+[i]);
    //   iconImgElId.appendChild(iconImgEl);
    //   iconEl.appendChild(iconImgElId);
    //   dayEl.appendChild(iconEl);
    //   var tempEl = dailyForecastDetails.forecast.temp;
    //   var tempElId = document.createElement("p");
    //   tempElId.innerText = "Temp: " + tempEl + " °C";
    //   tempElId.appendChild(tempEl);
    //   dayEl.appendChild(tempElId);
    //   var windEl = dailyForecastDetails.forecast.wind;
    //   var windElId = document.createElement("p");
    //   windElId.innerText = "Wind: " + windEl + " KPH";
    //   windOneElId.appendChild(windEl);
    //   dayEl.appendChild(windElId);
    //   var humidityEl = dailyForecastDetails.forecast.humidity;
    //   var humidityElId = document.createElement("p");
    //   humidityElId.innerText = "Humidity: " + humidityEl + " %";  
    //   humidityElId.appendChild(humidityEl);
    //   dayEl.appendChild(humidityEl);
    //   fiveDayContainerEl.appendChild(dayEl);
    // };  
    // };