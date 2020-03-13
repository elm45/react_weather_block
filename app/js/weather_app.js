import React, { useEffect, useState } from "react";
import WeatherCard from "./weather_card";

function WeatherApp() {
  const WEATHER_API_ROOT = "http://api.openweathermap.org/data/2.5/weather";
  // API Arguments
  let zip = "?zip=02109";
  let country = "US";
  let units = "&units=Imperial";
  const appID = "&appid=09225afb1d862095b22f7ea6a7e50471";
  // API Arguments String
  let weatherDataSource = `${zip},${country}${units}${appID}`;
  // Concat into API call URL.
  const url = WEATHER_API_ROOT + weatherDataSource;

  const [weatherData, setWeatherData] = useState({});

  async function fetchWeatherData() {
    const res = await fetch(url);
    const { weather, main, dt, name } = await res.json();

    function arrayToFormattedString(object, targetItem) {
      let result;
      const resultArray = [];
      // If multiple results, merge target items into an array.
      if (object) {
        weather.forEach(element => {
          resultArray.push(element[targetItem]);
        });
      }
      // If multiple results, join array with commas and last item joined by 'and'
      // else convert the array to a formatted string.
      if (resultArray.length > 1) {
        result =
          resultArray.slice(0, -1).join(",") + " and " + resultArray.slice(-1);
      } else {
        result = resultArray.toString();
      }
      return result;
    }

    function formatTemperature(temperature) {
      return Math.round(temperature) + "\u2109";
    }

    const weatherDate = new Date(dt * 1000);

    const date = {
      month: weatherDate.toLocaleString("default", { month: "long" }),
      weekday: weatherDate.toLocaleString("default", { weekday: "long" }),
      dayNum: weatherDate.toLocaleString("default", { day: "numeric" })
    };

    const icon = weather[0].icon; // If multiple weather results, use the first result's icon.
    const condition = arrayToFormattedString(weather, "main");
    const temperature = formatTemperature(main.temp);
    const feelsLike = "feels like " + formatTemperature(main.feels_like);
    const minTemperature = formatTemperature(main.temp_min);
    const maxTemperature = formatTemperature(main.temp_max);
    let description = arrayToFormattedString(weather, "description");
    description = `Currently in ${name}, expect ${description} with a high of ${maxTemperature} and a low of ${minTemperature}`;

    setWeatherData({
      icon,
      condition,
      description,
      temperature,
      feelsLike,
      main,
      date,
      name
    });
  }

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="weather-app__content">
      {weatherData.name && (
        <div className="weather-app__city">{weatherData.name}</div>
      )}
      {weatherData.date && (
        <div className="weather-app__date">
          <span className="weather-app__weekday">
            {weatherData.date.weekday}&nbsp;
          </span>
          <span className="weather-app__day">
            {weatherData.date.dayNum}&nbsp;
          </span>
          <span className="weather-app__month">
            {weatherData.date.month}&nbsp;
          </span>
        </div>
      )}
      <WeatherCard
        icon={weatherData.icon}
        condition={weatherData.condition}
        temperature={weatherData.temperature}
        feelsLike={weatherData.feelsLike}
        description={weatherData.description}
      />
    </div>
  );
}

export default WeatherApp;
