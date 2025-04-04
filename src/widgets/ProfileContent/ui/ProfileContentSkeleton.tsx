import { FC } from "react";

import { Skeleton } from "@/src/shared/shadcn";

export const ProfileContentSkeleton: FC = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-2 mb-3">
        <Skeleton className="size-[200px] rounded-full" />
        <Skeleton className="w-[250px] h-[40px] rounded-md" />
        <Skeleton className="w-[120px] h-[20px] rounded-md" />
      </div>
      <div>
        <Skeleton className="w-[40px] h-[20px] rounded-md mb-1" />
        <Skeleton className="w-[120px] h-[28px] rounded-md" />
      </div>
      <div>
        <Skeleton className="w-[40px] h-[20px] rounded-md mb-1" />
        <Skeleton className="w-[120px] h-[28px] rounded-md" />
      </div>
      <div>
        <Skeleton className="w-[40px] h-[20px] rounded-md mb-1" />
        <Skeleton className="w-[120px] h-[28px] rounded-md" />
      </div>
    </>
  );
};
