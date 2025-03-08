import React from "react";

const WeatherInfo = ({ weather, loading, error, location }) => {
  if (loading) {
    return <div className="weather-loading">Loading weather...</div>;
  }

  if (error) {
    return <div className="weather-error">Couldn't load weather</div>;
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="weather-info">
      <div className="weather-icon">{getWeatherIcon(weather.condition)}</div>
      <div className="weather-details">
        <div className="weather-location">{location}</div>
        <div className="weather-temp">{weather.temperature}°C</div>
        <div className="weather-condition">{weather.condition}</div>
      </div>
    </div>
  );
};

// Helper function to get appropriate weather icon
const getWeatherIcon = (condition) => {
  const lowercaseCondition = condition.toLowerCase();

  if (
    lowercaseCondition.includes("sun") ||
    lowercaseCondition.includes("clear")
  ) {
    return "☀️";
  } else if (lowercaseCondition.includes("cloud")) {
    return "☁️";
  } else if (lowercaseCondition.includes("rain")) {
    return "🌧️";
  } else if (lowercaseCondition.includes("snow")) {
    return "❄️";
  } else if (lowercaseCondition.includes("thunder")) {
    return "⚡";
  } else {
    return "🌤️";
  }
};

export default WeatherInfo;
