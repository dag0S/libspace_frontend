import { FC } from "react";

import { cn } from "@/src/shared/lib";
import { Book, IBook } from "@/src/entities/Book";
import { fetchBooks } from "../api/api";

interface Props {
  className?: string;
  searchBy?: string;
  sortBy?: string;
  genres?: string;
  authors?: string;
}

export const BookList: FC<Props> = async ({
  className,
  searchBy,
  sortBy,
  authors,
  genres,
}) => {
  const books = await fetchBooks({
    searchBy,
    sortBy,
    authors,
    genres,
  });

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3",
        className
      )}
    >
      {books.length > 0 &&
        books.map((book: IBook) => <Book key={book.id} book={book} />)}
    </div>
  );
};
