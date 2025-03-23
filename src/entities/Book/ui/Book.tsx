import { FC } from "react";
import Image from "next/image";

import { cn } from "@/src/shared/lib";

interface Props {
  className?: string;
  title: string;
  img: string;
}

export const Book: FC<Props> = ({ className, img, title }) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Image
        src={img}
        alt={title}
        width={200}
        height={300}
        className="w-full h-auto max-w-xs rounded-md"
      />

      <div className="line-clamp-2 text-sm">{title}</div>
    </div>
  );
};
