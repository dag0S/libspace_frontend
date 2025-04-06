import { FC, Suspense } from "react";

import { Container } from "@/src/shared/ui";
import {
  BookList,
  BookListSkeleton,
  BooksQueryParams,
} from "@/src/widgets/BookList";

const HomePage: FC<{
  searchParams?: BooksQueryParams;
}> = async ({ searchParams }) => {
  const searchBy = (await searchParams)?.searchBy || "";

  return (
    <Container>
      <Suspense fallback={<BookListSkeleton />}>
        <BookList searchBy={searchBy} />
      </Suspense>
    </Container>
  );
};

export default HomePage;
