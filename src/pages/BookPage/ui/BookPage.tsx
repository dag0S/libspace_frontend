import { FC } from "react";
import { notFound } from "next/navigation";

import { fetchBookById } from "../api/api";
import { Container } from "@/src/shared/ui";
import { BookContent } from "@/src/widgets/BookContent";

interface Props {
  params: Promise<{ bookId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const bookId = (await params).bookId;
  const book = await fetchBookById(bookId);

  if (!book) {
    notFound();
  }

  return {
    title: `Lib Space | ${book.title}`,
  };
}

const BookPage: FC<Props> = async ({ params }) => {
  const bookId = (await params).bookId;
  const book = await fetchBookById(bookId);

  if (!book) {
    notFound();
  }

  return (
      <Container className="flex flex-col gap-4 pt-14">
        <BookContent book={book} />
      </Container>
  );
};

export default BookPage;
