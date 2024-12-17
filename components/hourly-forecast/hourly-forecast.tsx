import { WeatherIcon } from "@/components/weather-icon";
import { getWeatherType } from "@/lib/get-weather-type";
import { ForecastResponse } from "@/types/weather";

type HourlyForecastProps = {
  forecast: ForecastResponse | null;
};

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  if (!forecast) return null;

  const hourlyData = forecast.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("da-DK", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(item.main.temp),
    type: getWeatherType(item.weather[0].main),
  }));

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
      {hourlyData.map((hour, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <span className="text-sm text-slate-400">{hour.time}</span>
          <WeatherIcon type={hour.type} />
          <span className="font-semibold text-white">{hour.temp}°</span>
        </div>
      ))}
    </div>
  );
}
