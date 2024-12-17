"use client";

import { DashboardSkeleton } from "@/app/dashboard-skeleton";
import { HourlyForecast } from "@/components/hourly-forecast/hourly-forecast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WeatherConditions } from "@/components/weather-conditions/weather-conditions";
import { WeatherIcon } from "@/components/weather-icon";
import { WeeklyForecast } from "@/components/weekly-forecast/weekly-forecast";
import { fetcher } from "@/lib/fetcher";
import { getWeatherType } from "@/lib/get-weather-type";
import { WeatherDataResponse } from "@/types/weather";
import { useState } from "react";
import useSWR from "swr";

type DashboardProps = {
  initialWeatherData: WeatherDataResponse;
};

export function Dashboard({ initialWeatherData }: DashboardProps) {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("Aarhus");
  const [error, setError] = useState<string | null>(null);

  // Fetching weather data on the client side using SWR for the entered city.
  // Also having cached data for each unique request to reduce API calls (5 min cache).
  // SWR is helping with caching, error handling and loading states.
  const { data: weatherData, isLoading } = useSWR(
    searchCity !== "Aarhus" && `/api/weather?city=${searchCity}`,
    fetcher,
    {
      fallbackData: initialWeatherData,
      dedupingInterval: 1000 * 60 * 5,
      onError: () => {
        setError("Kunne ikke finde byen. Prøv venligst igen.");
      },
      onSuccess: () => {
        setError(null);
      },
    }
  );

  const weather = weatherData.current;

  // Only fetching weather data when the user presses enter, to reduce API calls
  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setSearchCity(city);
    }
  }

  // Showing a skeleton while the weather data is loading, to make the user experience more smooth.
  // Skeleton could also be handled using Next.js loading.tsx format, or suspense fallback, but SWR is another flexible option.
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const location = {
    name: weather.name,
    country: weather.sys.country,
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Søg efter byer"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
        />
        {/* Showing an error message if the user enters an invalid city, so the user dont feel lost */}
        {error && <div className="text-red-400 text-sm px-1">{error}</div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{location.name}</h1>
              <div className="text-6xl font-bold mt-2">
                {Math.round(weather.main.temp)}°
              </div>
            </div>
            <div className="text-yellow-400">
              <WeatherIcon
                type={getWeatherType(weather.weather[0].main)}
                size={80}
              />
            </div>
          </div>

          <Card className="bg-slate-800 border-slate-700 p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">
              Vejrudsigt
            </h2>
            <HourlyForecast forecast={weatherData.forecast} />
          </Card>

          <Card className="bg-slate-800 border-slate-700 p-4">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">
              Vejr forhold
            </h2>
            <WeatherConditions weather={weatherData.current} />
          </Card>
        </div>

        <Card className="bg-slate-800 border-slate-700 p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">
            Forudsigelse
          </h2>
          <WeeklyForecast forecast={weatherData.forecast} />
        </Card>
      </div>
    </div>
  );
}
