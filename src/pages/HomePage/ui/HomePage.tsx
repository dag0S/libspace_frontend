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
  const sortBy = (await searchParams)?.sortBy || "";
  const genres = (await searchParams)?.genres || "";
  const authors = (await searchParams)?.authors || "";

  return (
    <Container className="mb-2">
      <Suspense fallback={<BookListSkeleton />}>
        <BookList
          searchBy={searchBy}
          sortBy={sortBy}
          authors={authors}
          genres={genres}
        />
      </Suspense>
    </Container>
  );
};

export default HomePage;
