import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Droplets, Thermometer, Wind } from "lucide-react";

export function WeatherConditionsSkeleton() {
  const conditions = [
    {
      icon: <Thermometer size={18} />,
      label: "Føles som",
      skeletonWidth: "w-16",
      unit: "°",
    },
    {
      icon: <Wind size={18} />,
      label: "Vind",
      skeletonWidth: "w-16",
      unit: " m/s",
    },
    {
      icon: <Droplets size={18} />,
      label: "Luftfugtighed",
      skeletonWidth: "w-8",
      unit: "%",
    },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {conditions.map((condition, index) => (
        <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            {condition.icon}
            <span>{condition.label}</span>
          </div>
          <div className="text-2xl font-semibold text-gray-200 flex gap-2">
            <Skeleton className={cn(`h-8`, condition.skeletonWidth)} />
            {condition.unit}
          </div>
        </div>
      ))}
    </div>
  );
}
