import { Skeleton } from "@/components/ui/skeleton";

export function WeeklyForecastSkeleton() {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="flex items-center justify-between py-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-8" />
        </div>
      ))}
    </div>
  );
}
