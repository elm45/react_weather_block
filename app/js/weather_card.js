import React from "react";

function WeatherCard({ icon, condition, temperature, feelsLike, description }) {
  return (
    <div className="weather-card">
      <div className="weather-card__icon">
        <img src={icon} alt={`Icon for ${condition}`} />
      </div>
      <div className="weather-card__condition">{condition}</div>
      <div className="weather-card__temperature">{temperature}</div>
      <div className="weather-card__feels-like">{feelsLike}</div>
      <div className="weather-card__description">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default WeatherCard;
