import { cn } from "@/lib/utils";
import { Cloud, CloudLightning, CloudRain, Sun } from "lucide-react";

export enum WeatherType {
  sunny = "sunny",
  cloudy = "cloudy",
  rainy = "rainy",
  storm = "storm",
}

type WeatherIconProps = {
  type: WeatherType;
  size?: number;
  className?: string;
};

export function WeatherIcon({ type, size = 24, className }: WeatherIconProps) {
  const icons = {
    sunny: <Sun size={size} className={cn("text-yellow-400", className)} />,
    cloudy: <Cloud size={size} className={cn("text-slate-400", className)} />,
    rainy: <CloudRain size={size} className={cn("text-blue-400", className)} />,
    storm: (
      <CloudLightning
        size={size}
        className={cn("text-purple-400", className)}
      />
    ),
  };

  return icons[type] || icons.sunny;
}
