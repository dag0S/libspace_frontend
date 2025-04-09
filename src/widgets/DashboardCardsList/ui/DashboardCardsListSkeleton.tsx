import { FC } from "react";

import { Skeleton } from "@/src/shared/shadcn";

export const DashboardCardsListSkeleton: FC = () => {
  return (
    <>
      {[
        ...Array(6)
          .fill(1)
          .map((_, i) => (
            <Skeleton className="w-full h-[200px] rounded-xl" key={i} />
          )),
      ]}
    </>
  );
};
