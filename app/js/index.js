import React from "react";
import ReactDOM from "react-dom";

class WeatherApp extends React.Component {
  render() {
    return <div>Hello, World</div>;
  }
}

ReactDOM.render(
  <WeatherApp nid={document.getElementById("weather-app")} />,
  document.getElementById("weather-app")
);
