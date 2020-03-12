import React from "react";

export default function WeatherCard({ temperature }) {
  return (
    <div className="weather-card">
      <div className="weather-card__temperature">{temperature + "\u2109"}</div>
    </div>
  );
}
