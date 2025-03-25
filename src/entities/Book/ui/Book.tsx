import { FC } from "react";
import Image from "next/image";

import { cn } from "@/src/shared/lib";

interface Props {
  className?: string;
  title: string;
  bookCoverURL: string | null;
}

export const Book: FC<Props> = ({ className, bookCoverURL, title }) => {
  return (
    <div className={cn("flex flex-col", className)}>
      {bookCoverURL ? (
        <Image
          src={bookCoverURL}
          alt={title}
          width={200}
          height={300}
          className="w-full h-auto max-w-xs rounded-md"
        />
      ) : (
        <div>Без обложки</div>
      )}
      <div className="line-clamp-2 text-sm">{title}</div>
    </div>
  );
};
