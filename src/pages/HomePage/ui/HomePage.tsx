import { Button } from "@/src/shared/shadcn/button";
import { Container } from "@/src/shared/ui";

import { FC } from "react";

const Page: FC = () => {
  return (
    <div>
      <Container>
        <Button>Кнопка</Button>
      </Container>
    </div>
  );
};

export default Page;
