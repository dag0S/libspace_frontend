import { FC } from "react";
import Image from "next/image";

import { fetchBookById } from "../api/api";
import { cn } from "@/src/shared/lib";
import { Badge, Button } from "@/src/shared/shadcn";
import { Container } from "@/src/shared/ui";

interface Props {
  params: Promise<{ bookId: string }>;
}

const BookPage: FC<Props> = async ({ params }) => {
  const bookId = (await params).bookId;
  const book = await fetchBookById(bookId);

  return (
    <div className={cn("pt-12")}>
      <Container className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-muted rounded-md overflow-hidden flex items-center min-w-[150px] max-w-full min-h-[225px] max-h-full">
            {book.bookCoverURL ? (
              <Image
                src={book.bookCoverURL}
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
        <Button size="lg">Взять в аренду</Button>
      </Container>
    </div>
  );
};

export default BookPage;
