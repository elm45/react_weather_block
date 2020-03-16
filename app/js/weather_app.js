import React, { useEffect, useState } from "react";
import WeatherCard from "./weather_card";

function WeatherApp() {
  const { apiKey, zipCode } = drupalSettings.ReactWeatherBlock;
  const WEATHER_API_ROOT = "http://api.openweathermap.org/data/2.5/weather";
  // API Arguments
  let zip = zipCode ? `?zip=${zipCode}` : "?zip=02109"; // Defaults to Boston if not set.
  let country = "US";
  let units = "&units=Imperial";
  const appID = `&appid=${apiKey}`;
  // API Arguments String
  let weatherDataSource = `${zip},${country}${units}${appID}`;
  // Concat into API call URL.
  const weatherUrl = WEATHER_API_ROOT + weatherDataSource;
  const [weatherData, setWeatherData] = useState({});

  // Call Open Weather API and configure data.
  async function fetchWeatherData() {
    // let defaultContent = '<div class="weather-app__loading">Loading...</div>';
    const response = await fetch(weatherUrl);
    const weatherJson = await response.json();
    const { cod, message, weather, main, dt, name } = weatherJson;

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

    const weatherDate = dt ? new Date(dt * 1000) : null,
      date = {
        month: weatherDate
          ? weatherDate.toLocaleString("default", { month: "long" })
          : null,
        weekday: weatherDate
          ? weatherDate.toLocaleString("default", { weekday: "long" })
          : null,
        dayNum: weatherDate
          ? weatherDate.toLocaleString("default", { day: "numeric" })
          : null
      },
      iconPath =
        drupalSettings.path.baseUrl +
        "modules/custom/react_weather_block/app/icons/",
      icon = weather ? iconPath + weather[0].icon + "@2x.png" : null, // If multiple weather results, use the first result's icon.
      condition = arrayToFormattedString(weather, "main"),
      temperature = main ? formatTemperature(main.temp) : null,
      feelsLike = main
        ? "feels like " + formatTemperature(main.feels_like)
        : null,
      minTemperature = main ? formatTemperature(main.temp_min) : null,
      maxTemperature = main ? formatTemperature(main.temp_max) : null,
      description = name
        ? `Currently in ${name}, expect ${arrayToFormattedString(
            weather,
            "description"
          )} with a high of ${maxTemperature} and a low of ${minTemperature}`
        : null;

    setWeatherData({
      cod,
      message,
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
      {!weatherData.name ? <p>{weatherData.defaultContent}</p> : null}
      {weatherData.cod < 200 || weatherData.cod >= 300
        ? weatherData.message
        : null}
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
      {weatherData.temperature && (
        <WeatherCard
          icon={weatherData.icon}
          condition={weatherData.condition}
          temperature={weatherData.temperature}
          feelsLike={weatherData.feelsLike}
          description={weatherData.description}
        />
      )}
    </div>
  );
}

export default WeatherApp;
