import { HourlyForecastSkeleton } from "@/components/hourly-forecast/hourly-forecast-skeleton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { WeatherConditionsSkeleton } from "@/components/weather-conditions/weather-conditions-skeleton";
import { WeeklyForecastSkeleton } from "@/components/weekly-forecast/weekly-forecast-skeleton";

export function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Søg efter byer"
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
          disabled={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-16 w-24" />
            </div>
            <Skeleton className="h-20 w-20 rounded-full" />
          </div>

          <Card className="bg-slate-800 border-slate-700 p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">
              Vejrudsigt
            </h2>
            <HourlyForecastSkeleton />
          </Card>

          <Card className="bg-slate-800 border-slate-700 p-4">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">
              Vejr forhold
            </h2>
            <WeatherConditionsSkeleton />
          </Card>
        </div>

        <Card className="bg-slate-800 border-slate-700 p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">
            Forudsigelse
          </h2>
          <WeeklyForecastSkeleton />
        </Card>
      </div>
    </div>
  );
}
