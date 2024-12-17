import {
  ForecastResponse,
  WeatherDataResponse,
  WeatherResponse,
} from "@/types/weather";
import { NextRequest } from "next/server";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");

  if (!city) {
    return Response.json(
      { error: "City parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Get coordinates from city name
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`
    );
    const geoData = await geoResponse.json();
    const locationData = geoData[0];

    if (!locationData) {
      return Response.json({ error: "Byen blev ikke fundet" }, { status: 404 });
    }

    // Get current weather
    const currentWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
    );
    const currentWeather: WeatherResponse = await currentWeatherResponse.json();

    // Get 5-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData.lat}&lon=${locationData.lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
    );
    const forecast: ForecastResponse = await forecastResponse.json();

    const response: WeatherDataResponse = {
      current: currentWeather,
      forecast: forecast,
    };

    return Response.json(response);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Der opstod en fejl" }, { status: 500 });
  }
}
