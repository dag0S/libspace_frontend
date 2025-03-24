import Link from "next/link";
import { FC } from "react";

import { Separator } from "@/src/shared/shadcn";
import { Container } from "@/src/shared/ui";
import { LoginForm } from "@/src/widgets/LoginForm";

const LoginPage: FC = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Container className="px-5 flex flex-col gap-6 items-center">
        <Link href="/">
          <h2 className="text-4xl font-medium">LibSpace</h2>
        </Link>
        <Separator />
        <h3 className="text-2xl">Вход</h3>
        <LoginForm />
        <div>
          Нет аккаунта?{" "}
          <Link href="/register" className="font-medium text-primary">
            Регистрация
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
