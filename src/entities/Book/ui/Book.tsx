import { FC } from "react";
import Image from "next/image";

import { cn } from "@/src/shared/lib";
import { AspectRatio } from "@/src/shared/shadcn";
import { IBook } from "../types/IBook";
import Link from "next/link";

interface Props {
  className?: string;
  book: IBook;
}

export const Book: FC<Props> = ({ className, book }) => {
  return (
    <Link href={`/book/${book.id}`} className={cn("flex flex-col", className)}>
      {book.bookCoverURL ? (
        <AspectRatio
          ratio={168 / 240}
          className="bg-muted rounded-md overflow-hidden flex items-center"
        >
          <Image
            src={book.bookCoverURL}
            alt={book.title}
            width={200}
            height={300}
            className="w-full h-auto max-w-xs"
          />
        </AspectRatio>
      ) : (
        <div>Без обложки</div>
      )}
      <div className="line-clamp-2 text-sm">{book.title}</div>
    </Link>
  );
};
