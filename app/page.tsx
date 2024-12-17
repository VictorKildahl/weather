import { Dashboard } from "@/app/dashboard";
import { WeatherDataResponse } from "@/types/weather";

export default async function Weather() {
  // Fetching initial weather data on the server side to have a fast initial load
  const response = await fetch(
    `http://localhost:3000/api/weather?city=Aarhus`,
    { next: { revalidate: 300 } }
  );

  // Have a reusable type for the weather data across the app
  const weatherData: WeatherDataResponse = await response.json();

  return <Dashboard initialWeatherData={weatherData} />;
}
