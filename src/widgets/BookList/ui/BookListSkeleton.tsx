import { FC } from "react";

import { cn } from "@/src/shared/lib";
import { Skeleton } from "@/src/shared/shadcn";

interface Props {
  className?: string;
}

export const BookListSkeleton: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3",
        className
      )}
    >
      {[
        ...Array(12)
          .fill(1)
          .map((_, i) => (
            <div key={i} className="flex flex-col">
              <Skeleton className="w-full h-[300px] max-h-auto max-w-xs rounded-md mb-0.5" />
              <Skeleton className="w-full h-4 rounded-md" />
            </div>
          )),
      ]}
    </div>
  );
};
