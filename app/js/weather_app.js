import React, { useEffect, useState } from "react";
import WeatherCard from "./weather_card";

function WeatherApp() {
  const WEATHER_API_ROOT = "http://api.openweathermap.org/data/2.5/forecast";
  // API Arguments
  let zip = "?zip=02109";
  let country = "US";
  let units = "&units=Imperial";
  const appID = "&appid=09225afb1d862095b22f7ea6a7e50471";
  // Arguments String
  let weatherDataSource = `${zip},${country}${units}${appID}`;
  // Concat into API call URL.
  const url = WEATHER_API_ROOT + weatherDataSource;

  const [weatherData, setWeatherData] = useState({});

  async function fetchWeatherData() {
    const res = await fetch(url);
    const { cod, list, city } = await res.json();
    setWeatherData({ cod, list, city });
  }

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div>
      {weatherData.city && <h3>{weatherData.city.name}</h3>}
      {weatherData.list && (
        <WeatherCard temperature={Math.round(weatherData.list[0].main.temp)} />
      )}
    </div>
  );
}

export default WeatherApp;
