import { FC, Suspense } from "react";

import { Container } from "@/src/shared/ui";
import { BookList, BookListSkeleton } from "@/src/widgets/BookList";

const Page: FC = async () => {
  return (
      <Container>
        <Suspense fallback={<BookListSkeleton />}>
          <BookList />
        </Suspense>
      </Container>
  );
};

export default Page;
