import { FC, Suspense } from "react";

import { Container } from "@/src/shared/ui";
import { BookList, BookListSkeleton } from "@/src/widgets/BookList";

const HomePage: FC<{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}> = async ({ searchParams }) => {
  const searchBy = ((await searchParams)?.searchBy as string) || "";
  const sortBy = ((await searchParams)?.sortBy as string) || "";
  const genres = ((await searchParams)?.genres as string) || "";
  const authors = ((await searchParams)?.authors as string) || "";

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
