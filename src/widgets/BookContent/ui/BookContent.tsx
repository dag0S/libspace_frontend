import { FC } from "react";
import { Eye } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/src/shared/shadcn";
import { ActionWithABook } from "../../ActionWithABook";
import { IBookWithGenresAndAuthor } from "@/src/entities/Book";

interface Props {
  book: IBookWithGenresAndAuthor;
}

export const BookContent: FC<Props> = ({ book }) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="bg-muted rounded-md overflow-hidden flex items-center min-w-[150px] max-w-full min-h-[225px] max-h-full">
          {book.bookCoverURL ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_API_URL}${book.bookCoverURL}`}
              alt={book.title}
              width={200}
              height={300}
            />
          ) : (
            <div>Без обложки</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-medium">{book.title}</div>
          <div className="text-sm font-medium">{book.author.name}</div>
          <div className="text-sm flex items-center gap-2">
            <Eye className="size-5" />
            <div>{book.views}</div>
          </div>
        </div>
      </div>
      {book.genres.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {book.genres.map((genre) => (
            <Badge key={genre.id} variant="outline">
              {genre.name}
            </Badge>
          ))}
        </div>
      )}
      <div>{book.description}</div>
      <div className="font-bold">
        {book.copies < 1
          ? "Копии закончились"
          : `Осталось копий: ${book.copies}`}
      </div>
      <ActionWithABook bookId={book.id} copies={book.copies} />
    </>
  );
};
