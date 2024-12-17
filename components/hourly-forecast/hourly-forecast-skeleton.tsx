import { Skeleton } from "@/components/ui/skeleton";

export function HourlyForecastSkeleton() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="flex flex-col items-center space-y-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-8" />
        </div>
      ))}
    </div>
  );
}
