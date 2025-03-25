import { FC, Suspense } from "react";

import { Container } from "@/src/shared/ui";
import { BookList, BookListSkeleton } from "@/src/widgets/BookList";

const Page: FC = async () => {
  return (
    <div>
      <Container>
        <Suspense fallback={<BookListSkeleton />}>
          <BookList />
        </Suspense>
      </Container>
    </div>
  );
};

export default Page;
