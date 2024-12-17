import { WeatherResponse } from "@/types/weather";
import { Droplets, Thermometer, Wind } from "lucide-react";

type WeatherConditionsProps = {
  weather: WeatherResponse;
};

export function WeatherConditions({ weather }: WeatherConditionsProps) {
  const conditions = [
    {
      icon: Thermometer,
      label: "Føles som",
      value: Math.round(weather.main.feels_like),
      unit: "°",
    },
    {
      icon: Wind,
      label: "Vind",
      value: Math.round(weather.wind.speed),
      unit: " m/s",
    },
    {
      icon: Droplets,
      label: "Luftfugtighed",
      value: weather.main.humidity,
      unit: "%",
    },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {conditions.map((condition, index) => (
        <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <condition.icon size={18} />
            <span>{condition.label}</span>
          </div>
          <div className="text-2xl font-semibold text-gray-200">
            {condition.value}
            {condition.unit}
          </div>
        </div>
      ))}
    </div>
  );
}
