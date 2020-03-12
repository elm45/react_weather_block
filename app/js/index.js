import React from "react";
import { render } from "react-dom";
import WeatherApp from "./weather_app";

render(
  <WeatherApp nid={document.getElementById("weather-app")} />,
  document.getElementById("weather-app")
);
