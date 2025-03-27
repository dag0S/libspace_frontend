import { FC } from "react";
import Image from "next/image";

import { cn } from "@/src/shared/lib";
import { AspectRatio } from "@/src/shared/shadcn";

interface Props {
  className?: string;
  title: string;
  bookCoverURL: string | null;
}

export const Book: FC<Props> = ({ className, bookCoverURL, title }) => {
  return (
    <div className={cn("flex flex-col", className)}>
      {bookCoverURL ? (
        <AspectRatio
          ratio={168 / 240}
          className="bg-muted rounded-md overflow-hidden flex items-center"
        >
          <Image
            src={bookCoverURL}
            alt={title}
            width={200}
            height={300}
            className="w-full h-auto max-w-xs"
          />
        </AspectRatio>
      ) : (
        <div>Без обложки</div>
      )}
      <div className="line-clamp-2 text-sm">{title}</div>
    </div>
  );
};
