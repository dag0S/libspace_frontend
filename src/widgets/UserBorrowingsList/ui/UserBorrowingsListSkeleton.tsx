import { FC } from "react";

import { cn } from "@/src/shared/lib";
import { Skeleton } from "@/src/shared/shadcn";

interface Props {
  className?: string;
}

export const UserBorrowingsListSkeleton: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4",
        className
      )}
    >
      {[
        ...Array(6)
          .fill(1)
          .map((_, i) => (
            <div key={i} className="flex gap-2">
              <Skeleton className="rounded-lg h-[200px] w-[100px]" />
              <Skeleton className="rounded-lg h-[200px] w-full" />
            </div>
          )),
      ]}
    </div>
  );
};
