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

    /**
     * Creates formatted string from multiple object keys.
     *
     * Compiles keys for multiple keys into an array and then joins the array,
     * if it has more than one item, into a comma separated string, using `and`
     * as the separator for the last item. The formatted string is returned.
     *
     * @param {string} keyName   The name of the key that should be pushed to the array.
     * @param {Object} objectVar  The object that should be looped through for the provided keyName.
     *
     * @return {string} Return value description.
     */
    function arrayToFormattedString(objectVar, keyName) {
      let result;
      const resultArray = [];
      // If multiple results, merge target items into an array.
      if (objectVar) {
        weather.forEach(element => {
          resultArray.push(element[keyName]);
        });
      }
      // If multiple results, join array with commas and last item joined by 'and'
      // else convert the array to a formatted string.
      if (resultArray.length > 1) {
        result =
          resultArray.slice(0, -1).join(", ") + " and " + resultArray.slice(-1);
      } else {
        result = resultArray.toString();
      }
      return result;
    }

    /**
     * Temperature format.
     *
     * Rounds a number to the nearest whole number and adds a degrees fahrenheit suffix.
     *
     * @param {number} temperature The number to be formatted.
     *
     * @return {string} Returns a string representing the temperature as degrees fabrenheit.
     */
    function formatTemperature(temperature) {
      return Math.round(temperature) + "\u2109";
    }

    const weatherDate = new Date(dt * 1000),
      date = {
        month: weatherDate.toLocaleString("default", { month: "long" }),
        weekday: weatherDate.toLocaleString("default", { weekday: "long" }),
        dayNum: weatherDate.toLocaleString("default", { day: "numeric" })
      },
      iconPath =
        window.drupalSettings.path.baseUrl +
        "modules/custom/react_weather_block/app/icons/",
      icon = iconPath + weather[0].icon + "@2x.png", // If multiple weather results, use the first result's icon.
      condition = arrayToFormattedString(weather, "main"),
      temperature = formatTemperature(main.temp),
      feelsLike = "feels like " + formatTemperature(main.feels_like),
      minTemperature = formatTemperature(main.temp_min),
      maxTemperature = formatTemperature(main.temp_max),
      description = `Currently in ${name}, expect ${arrayToFormattedString(
        weather,
        "description"
      )} with a high of ${maxTemperature} and a low of ${minTemperature}`;

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
