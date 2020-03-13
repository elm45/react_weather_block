import React from "react";

export default function WeatherCard({
  icon,
  condition,
  temperature,
  feelsLike,
  description
}) {
  return (
    <div className="weather-card">
      <div className="weather-card__icon">{icon}</div>
      <div className="weather-card__condition">{condition}</div>
      <div className="weather-card__temperature">{temperature}</div>
      <div className="weather-card__feels-like">{feelsLike}</div>
      <div className="weather-card__description">
        <p>{description}</p>
      </div>
    </div>
  );
}
