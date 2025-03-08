import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (location, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate mock weather data
      const conditions = [
        "Sunny",
        "Partly Cloudy",
        "Cloudy",
        "Rainy",
        "Thunderstorm",
        "Snowy",
      ];
      const randomCondition =
        conditions[Math.floor(Math.random() * conditions.length)];

      // Generate temperature based on location and condition
      let baseTemp = 20; // Default base temperature

      // Adjust based on location (very simple simulation)
      if (location.toLowerCase().includes("london")) {
        baseTemp = 15;
      } else if (location.toLowerCase().includes("new york")) {
        baseTemp = 18;
      } else if (location.toLowerCase().includes("tokyo")) {
        baseTemp = 22;
      }

      // Adjust based on condition
      let tempAdjustment = 0;
      if (randomCondition === "Sunny") {
        tempAdjustment = 5;
      } else if (randomCondition === "Rainy" || randomCondition === "Cloudy") {
        tempAdjustment = -3;
      } else if (randomCondition === "Thunderstorm") {
        tempAdjustment = -5;
      } else if (randomCondition === "Snowy") {
        tempAdjustment = -10;
      }

      const finalTemp = baseTemp + tempAdjustment;

      const weatherData = {
        temperature: finalTemp,
        condition: randomCondition,
        humidity: Math.floor(Math.random() * 50) + 30, // Random humidity between 30-80%
        windSpeed: Math.floor(Math.random() * 20) + 5, // Random wind speed between 5-25 km/h
      };

      return { location, weather: weatherData };
    } catch (error) {
      return rejectWithValue("Failed to fetch weather data");
    }
  }
);
