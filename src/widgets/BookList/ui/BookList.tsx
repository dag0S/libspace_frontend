import { FC } from "react";

import { cn } from "@/src/shared/lib";
import { Book } from "@/src/entities/Book";

interface Props {
  className?: string;
}

const books = [
  {
    id: 1,
    title:
      "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
    img: "/imgs/books/book-1.webp",
  },
  {
    id: 2,
    title:
      "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
    img: "/imgs/books/book-1.webp",
  },
  {
    id: 3,
    title:
      "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
    img: "/imgs/books/book-1.webp",
  },
  {
    id: 4,
    title:
      "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
    img: "/imgs/books/book-1.webp",
  },
  {
    id: 5,
    title:
      "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
    img: "/imgs/books/book-1.webp",
  },
  {
    id: 6,
    title:
      "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
    img: "/imgs/books/book-1.webp",
  },
  {
    id: 7,
    title:
      "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
    img: "/imgs/books/book-1.webp",
  },
  {
    id: 8,
    title:
      "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
    img: "/imgs/books/book-1.webp",
  },
  {
    id: 9,
    title:
      "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
    img: "/imgs/books/book-1.webp",
  },
  {
    id: 10,
    title:
      "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
    img: "/imgs/books/book-1.webp",
  },
];

export const BookList: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3",
        className
      )}
    >
      {books.map((book) => (
        <Book key={book.id} img={book.img} title={book.title} />
      ))}
    </div>
  );
};
