import Link from "next/link";
import { FC } from "react";

import { Button } from "@/src/shared/shadcn";
import { Container } from "@/src/shared/ui";

const NotFoundPage: FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Container className="flex flex-col gap-3 text-center">
        <h2 className="font-semibold text-8xl">404</h2>
        <h3 className="font-bold text-4xl">Такой страницы нe существует</h3>
        <div>Одно из двух: или кто-то её удалил, или в ссылке опечатка.</div>
        <Link href="/" className="self-center">
          <Button className="cursor-pointer">На главную страницу</Button>
        </Link>
      </Container>
    </div>
  );
};

export default NotFoundPage;
