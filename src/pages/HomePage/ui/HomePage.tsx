import { Container } from "@/src/shared/ui";
import { BookList } from "@/src/widgets/BookList";

import { FC } from "react";

const Page: FC = () => {
  return (
    <div>
      <Container>
        <BookList />
      </Container>
    </div>
  );
};

export default Page;
