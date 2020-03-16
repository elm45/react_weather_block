import React from "react";

function WeatherCard({ icon, condition, temperature, feelsLike, description }) {
  return (
    <div className="weather-card">
      {icon && (
        <div className="weather-card__icon">
          <img src={icon} alt={`Icon for ${condition}`} />
        </div>
      )}
      {condition && <div className="weather-card__condition">{condition}</div>}
      {temperature && (
        <div className="weather-card__temperature">{temperature}</div>
      )}
      {feelsLike && <div className="weather-card__feels-like">{feelsLike}</div>}
      {description && (
        <div className="weather-card__description">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
