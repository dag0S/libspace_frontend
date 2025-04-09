import { FC } from "react";

import { cn } from "@/src/shared/lib";
import { Skeleton } from "@/src/shared/shadcn";

interface Props {
  className?: string;
}

export const DashboardUsersListSkeleton: FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {[
        ...Array(8)
          .fill(1)
          .map((_, i) => (
            <Skeleton className="w-full h-[40px] rounded-lg" key={i} />
          )),
      ]}
    </div>
  );
};
