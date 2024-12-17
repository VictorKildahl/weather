import { WeatherType } from "@/components/weather-icon";

// Helper function to get the weather type based on the weather condition.
// This has been put into a separate file because it is used in multiple places.
export function getWeatherType(condition: string): WeatherType {
  switch (condition.toLowerCase()) {
    case "clear":
      return WeatherType.sunny;
    case "clouds":
      return WeatherType.cloudy;
    case "rain":
      return WeatherType.rainy;
    case "thunderstorm":
      return WeatherType.storm;
    default:
      return WeatherType.cloudy;
  }
}
