import { Skeleton } from "./skeleton";

interface SkeletonGridProps {
  count?: number;
}

export function SkeletonGrid({ count = 6 }: SkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[4/3] rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-10 w-full rounded-2xl" />
        </div>
      ))}
    </div>
  );
}