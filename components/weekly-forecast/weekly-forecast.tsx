import { WeatherIcon } from "@/components/weather-icon";
import { getWeatherType } from "@/lib/get-weather-type";
import { ForecastResponse } from "@/types/weather";

type WeeklyForecastProps = {
  forecast: ForecastResponse | null;
};

export function WeeklyForecast({ forecast }: WeeklyForecastProps) {
  if (!forecast) return null;

  // Group forecast data by day, collecting temperatures and weather conditions
  const weeklyData = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const day =
      date.getDate() === new Date().getDate()
        ? "I dag"
        : date.toLocaleDateString("da-DK", { weekday: "long" });

    if (!acc[day]) {
      acc[day] = { temps: [], conditions: [], date };
    }

    acc[day].temps.push(item.main.temp);
    acc[day].conditions.push(item.weather[0].main);
    return acc;
  }, {} as Record<string, { temps: number[]; conditions: string[]; date: Date }>);

  // Transform the grouped data into daily summaries:
  // - Calculate average temperature for each day
  // - Find most common weather condition
  // - Sort by date chronologically
  const sortedData = Object.entries(weeklyData)
    .map(([day, data]) => ({
      day,
      temp: Math.round(data.temps.reduce((a, b) => a + b) / data.temps.length),
      type: getWeatherType(
        data.conditions.sort(
          (a, b) =>
            data.conditions.filter((v) => v === b).length -
            data.conditions.filter((v) => v === a).length
        )[0]
      ),
    }))
    .sort(
      (a, b) =>
        weeklyData[a.day].date.getTime() - weeklyData[b.day].date.getTime()
    );

  return (
    <div className="space-y-4">
      {sortedData.map((day, index) => (
        <div key={index} className="flex items-center justify-between py-2">
          <span className="w-20 text-gray-300">
            {day.day.charAt(0).toUpperCase() + day.day.slice(1)}
          </span>
          <WeatherIcon type={day.type} />
          <span className="text-right text-white">{day.temp}°</span>
        </div>
      ))}
    </div>
  );
}
